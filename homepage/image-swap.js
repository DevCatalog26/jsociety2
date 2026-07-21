/* j. society — site-wide photo swap engine (framework-agnostic, DOM-level).
   Intercepts every <img> whose source lives under images/ and lets it be
   replaced with a user-uploaded photo. Overrides are keyed by the ORIGINAL
   relative path (e.g. "images/p-crew.jpg") and stored in localStorage, so a
   swap made on one page shows everywhere that photo appears — across the whole
   site. Loads as a plain <script> BEFORE the Babel app scripts so the
   MutationObserver is watching before React paints its first <img>. */
(function () {
  'use strict';

  var LS_KEY = 'js_photo_overrides_v1';
  var DIM_KEY = 'js_photo_dims_v1';
  var KEY_ATTR = 'data-js-key';
  var MANAGED = /(^|\/)images\//; // only photos under images/ are swappable (logos etc. stay fixed)

  var overrides = {};
  try { overrides = JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch (e) { overrides = {}; }

  var dims = {}; // key → dim percent (0–80); darkens the photo via brightness()
  try { dims = JSON.parse(localStorage.getItem(DIM_KEY)) || {}; } catch (e) { dims = {}; }

  var persistError = false;

  function persist() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(overrides));
      localStorage.setItem(DIM_KEY, JSON.stringify(dims));
      persistError = false;
    } catch (e) {
      // Quota exceeded — keep working for this session, flag it for the UI.
      persistError = true;
    }
    api.persistError = persistError;
  }

  // Resolve the intended src for an <img>, remembering its original path once.
  function keyFor(el) {
    var k = el.getAttribute(KEY_ATTR);
    if (k) return k;
    var raw = el.getAttribute('src');
    if (raw && raw.indexOf('data:') !== 0 && MANAGED.test(raw)) {
      el.setAttribute(KEY_ATTR, raw);
      return raw;
    }
    return null;
  }

  function apply(el) {
    var key = keyFor(el);
    if (!key) return;
    var desired = overrides[key] || key;
    if (el.getAttribute('src') !== desired) {
      // setAttribute keeps a relative path relative when we reset an override.
      el.setAttribute('src', desired);
    }
    // Per-photo dim: darken toward black. filter isn't set by any component,
    // so React never overwrites it on re-render.
    var dim = dims[key] || 0;
    var f = dim > 0 ? 'brightness(' + ((100 - dim) / 100).toFixed(3) + ')' : '';
    if (el.style.filter !== f) el.style.filter = f;
  }

  function scan(root) {
    if (!root) return;
    if (root.tagName === 'IMG') { apply(root); return; }
    if (root.querySelectorAll) {
      var imgs = root.querySelectorAll('img');
      for (var i = 0; i < imgs.length; i++) apply(imgs[i]);
    }
  }

  // Watch for React (re)painting images and for src changes it may make.
  var observer = new MutationObserver(function (muts) {
    for (var i = 0; i < muts.length; i++) {
      var m = muts[i];
      if (m.type === 'attributes' && m.target && m.target.tagName === 'IMG') {
        apply(m.target);
      } else if (m.type === 'childList') {
        for (var j = 0; j < m.addedNodes.length; j++) {
          var n = m.addedNodes[j];
          if (n.nodeType === 1) scan(n);
        }
      }
    }
  });

  function startObserving() {
    var target = document.body || document.documentElement;
    observer.observe(target, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src'],
    });
    scan(target);
  }

  if (document.body) startObserving();
  else document.addEventListener('DOMContentLoaded', startObserving);

  // ── Uploaded-file → downscaled data URL ────────────────────────────────────
  function fileToDataURL(file, maxEdge, quality) {
    maxEdge = maxEdge || 1600;
    quality = quality || 0.85;
    return new Promise(function (resolve, reject) {
      if (!file || !/^image\//.test(file.type)) { reject(new Error('not an image')); return; }
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        URL.revokeObjectURL(url);
        var w = img.naturalWidth || img.width;
        var h = img.naturalHeight || img.height;
        var scale = Math.min(1, maxEdge / Math.max(w, h));
        w = Math.max(1, Math.round(w * scale));
        h = Math.max(1, Math.round(h * scale));
        var c = document.createElement('canvas');
        c.width = w; c.height = h;
        c.getContext('2d').drawImage(img, 0, 0, w, h);
        try {
          resolve(c.toDataURL('image/jpeg', quality));
        } catch (e) { reject(e); }
      };
      img.onerror = function (e) { URL.revokeObjectURL(url); reject(e); };
      img.src = url;
    });
  }

  function notify() {
    window.dispatchEvent(new CustomEvent('js-photos-change'));
  }

  // Prettify a path into a short label: "images/lb/du02a.jpg" → "lb / du02a"
  function labelFor(key) {
    var p = key.replace(/^\.?\//, '').replace(/^images\//, '');
    return p.replace(/\.[a-z0-9]+$/i, '').replace(/\//g, ' / ');
  }

  var api = {
    get: function (key) { return overrides[key] || null; },
    set: function (key, dataUrl) {
      overrides[key] = dataUrl;
      persist();
      scan(document.body);
      notify();
    },
    clear: function (key) {
      delete overrides[key];
      persist();
      scan(document.body);
      notify();
    },
    clearAll: function () {
      overrides = {};
      dims = {};
      persist();
      scan(document.body);
      notify();
    },
    getDim: function (key) { return dims[key] || 0; },
    setDim: function (key, val) {
      val = Math.max(0, Math.min(80, Math.round(val)));
      if (val > 0) dims[key] = val; else delete dims[key];
      persist();
      scan(document.body);
      notify();
    },
    count: function () { return Object.keys(overrides).length; },
    // Number of photos changed in any way (swapped or dimmed).
    changed: function () {
      var s = {};
      Object.keys(overrides).forEach(function (k) { s[k] = 1; });
      Object.keys(dims).forEach(function (k) { s[k] = 1; });
      return Object.keys(s).length;
    },
    // Managed images currently in the DOM, de-duplicated, in document order.
    list: function () {
      var seen = {};
      var out = [];
      var imgs = document.querySelectorAll('img[' + KEY_ATTR + ']');
      for (var i = 0; i < imgs.length; i++) {
        var key = imgs[i].getAttribute(KEY_ATTR);
        if (!key || seen[key]) continue;
        seen[key] = 1;
        out.push({
          key: key,
          label: labelFor(key),
          src: overrides[key] || key,
          overridden: !!overrides[key],
          dim: dims[key] || 0,
        });
      }
      return out;
    },
    fileToDataURL: fileToDataURL,
    persistError: persistError,
  };

  window.JS_PHOTOS = api;
})();
