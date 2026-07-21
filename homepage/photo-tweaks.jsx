/* global React */
// j. society — Photos tweak section.
// PhotoSwaps: a scrollable list of every managed photo currently on the page,
// each replaceable by an uploaded image. Swaps are applied by JS_PHOTOS (see
// image-swap.js) at the DOM level and persist site-wide in localStorage.
// PhotoTweaks: a ready-made TweaksPanel wrapper for pages that don't already
// have one.

const __PHOTO_CSS = `
  .jsp-intro{color:rgba(41,38,27,.62);line-height:1.45;margin:-2px 0 2px}
  .jsp-list{display:flex;flex-direction:column;gap:11px}
  .jsp-row{display:flex;align-items:center;gap:10px}
  .jsp-thumb{position:relative;flex-shrink:0;width:40px;height:50px;border-radius:5px;
    overflow:hidden;border:0;padding:0;cursor:pointer;background:#e7e1d8;
    box-shadow:0 0 0 .5px rgba(0,0,0,.14);transition:box-shadow .12s,transform .12s}
  .jsp-thumb:hover{transform:translateY(-1px);box-shadow:0 0 0 .5px rgba(0,0,0,.2),0 4px 10px rgba(0,0,0,.14)}
  .jsp-thumb img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .jsp-thumb .jsp-over{position:absolute;inset:0;display:flex;align-items:center;
    justify-content:center;background:rgba(23,19,15,0);opacity:0;transition:opacity .12s;
    color:#fff}
  .jsp-thumb:hover .jsp-over{opacity:1;background:rgba(23,19,15,.34)}
  .jsp-dot{position:absolute;top:3px;right:3px;width:7px;height:7px;border-radius:50%;
    background:#34c759;box-shadow:0 0 0 1.5px #fff}
  .jsp-meta{flex:1;min-width:0;display:flex;flex-direction:column;gap:5px}
  .jsp-meta-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
  .jsp-name{font-weight:500;color:rgba(41,38,27,.82);white-space:nowrap;overflow:hidden;
    text-overflow:ellipsis}
  .jsp-dim{display:flex;align-items:center;gap:8px}
  .jsp-dim-lbl{color:rgba(41,38,27,.5);flex-shrink:0}
  .jsp-dim .twk-slider{flex:1;margin:2px 0}
  .jsp-dim-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums;
    flex-shrink:0;width:30px;text-align:right}
  .jsp-reset{flex-shrink:0;appearance:none;border:0;background:rgba(0,0,0,.06);
    color:rgba(41,38,27,.7);width:22px;height:22px;border-radius:6px;cursor:pointer;
    font-size:12px;line-height:1;display:flex;align-items:center;justify-content:center}
  .jsp-reset:hover{background:rgba(0,0,0,.12);color:#29261b}
  .jsp-warn{color:#9a3412;line-height:1.4;margin-top:2px}
  .jsp-empty{color:rgba(41,38,27,.5);line-height:1.45}
`;

function PhotoSwaps() {
  const P = window.JS_PHOTOS;
  const [items, setItems] = React.useState(() => (P ? P.list() : []));
  const [warn, setWarn] = React.useState(null);

  const rescan = React.useCallback(() => { if (P) setItems(P.list()); }, [P]);

  React.useEffect(() => {
    rescan();
    // Images may paint a beat after the panel mounts — catch late arrivals.
    const t = setTimeout(rescan, 350);
    window.addEventListener('js-photos-change', rescan);
    return () => { clearTimeout(t); window.removeEventListener('js-photos-change', rescan); };
  }, [rescan]);

  const pick = (key) => (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file || !P) return;
    P.fileToDataURL(file).then((url) => {
      P.set(key, url);
      setWarn(P.persistError
        ? 'Saved for now, but too large to keep on reload — swap fewer/smaller photos to persist.'
        : null);
    }).catch(() => setWarn('Could not read that image file.'));
  };

  if (!P) return null;
  const changed = items.filter((it) => it.overridden || it.dim > 0).length;

  return (
    <>
      <style>{__PHOTO_CSS}</style>
      <div className="jsp-intro">
        Click a photo to replace it, or dim it with the slider. Changes apply
        everywhere that image appears across the site.
      </div>

      {items.length === 0 ? (
        <div className="jsp-empty">No swappable photos found on this page.</div>
      ) : (
        <div className="jsp-list">
          {items.map((it) => (
            <div className="jsp-row" key={it.key}>
              <label className="jsp-thumb" title={'Replace ' + it.key}>
                <img src={it.src} alt="" />
                <span className="jsp-over">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                       strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
                {it.overridden && <span className="jsp-dot" />}
                <input type="file" accept="image/*" style={{ display: 'none' }}
                       onChange={pick(it.key)} />
              </label>
              <div className="jsp-meta">
                <div className="jsp-meta-top">
                  <span className="jsp-name">{it.label}</span>
                  {it.overridden && (
                    <button type="button" className="jsp-reset" title="Reset to original photo"
                            onClick={() => P.clear(it.key)}>↺</button>
                  )}
                </div>
                <div className="jsp-dim">
                  <span className="jsp-dim-lbl">Dim</span>
                  <input type="range" className="twk-slider" min={0} max={80} step={1}
                         value={it.dim}
                         onChange={(e) => P.setDim(it.key, Number(e.target.value))} />
                  <span className="jsp-dim-val">{it.dim}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {warn && <div className="jsp-warn">{warn}</div>}

      {changed > 0 && (
        <TweakButton label={'Reset all photos (' + changed + ')'} secondary
                     onClick={() => { P.clearAll(); setWarn(null); }} />
      )}
    </>
  );
}

// Convenience: a standalone panel for pages that have no Tweaks panel yet.
function PhotoTweaks({ title = 'Tweaks' }) {
  return (
    <TweaksPanel title={title}>
      <TweakSection label="Photos" />
      <PhotoSwaps />
    </TweaksPanel>
  );
}

Object.assign(window, { PhotoSwaps, PhotoTweaks });
