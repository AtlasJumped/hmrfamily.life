/* HMR card screen module: slides (one screenshot of an HMR family site per step). Loaded on demand by hmr-card.js.
   One screen holds every tour, hidden. A card shows slide "<tour>.s<n>" and hides the previous one. Images load lazily, only when shown. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc, IMG = 'img/tour/';
H.css('hc-scr-slides', [
'.hc-slides{position:absolute;inset:0;display:flex;flex-direction:column;font-size:14px;line-height:1.4;color:@F;background:@S}',
'.hc-slides [hidden]{display:none!important}',
'.hc-slides-f{flex:1;min-height:0;margin:0;display:flex;flex-direction:column;gap:6px;padding:8px 10px}',
'.hc-slides-h{font-weight:700;color:@F}',
'.hc-slides-f img{flex:1;min-height:0;width:100%;object-fit:contain;border:1px solid @L;border-radius:8px;background:@B}',
'.hc-slides-c{display:flex;align-items:center;gap:8px}',
'.hc-slides-b{min-height:36px;padding:0 14px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:13px;font-weight:600;cursor:pointer}',
'.hc-slides-s{color:@M;font-size:12px}'
].join(''));
var D = {"universemodel":[{"img":"universemodel-1","head":"One picture of reality","alt":"Screenshot of universemodel.life: One picture of reality","copy":false},{"img":"universemodel-1","head":"A partial model and a holistic one","alt":"Screenshot of universemodel.life: A partial model and a holistic one","copy":false},{"img":"universemodel-2","head":"Three parts","alt":"Screenshot of universemodel.life: Three parts","copy":false},{"img":"universemodel-3","head":"East and West","alt":"Screenshot of universemodel.life: East and West","copy":false},{"img":"universemodel-3","head":"Tied to tests","alt":"Screenshot of universemodel.life: Tied to tests","copy":false}],"claudebomb":[{"img":"claudebomb-1","head":"Your helping hand into AI","alt":"Screenshot of claudebomb.com: Your helping hand into AI","copy":false},{"img":"claudebomb-2","head":"Two products","alt":"Screenshot of claudebomb.com: Two products","copy":false},{"img":"claudebomb-3","head":"It is a text file","alt":"Screenshot of claudebomb.com: It is a text file","copy":true}],"endgame":[{"img":"endgame-1","head":"One dashboard","alt":"Screenshot of endgame.life: One dashboard","copy":false},{"img":"endgame-2","head":"Life in 2036","alt":"Screenshot of endgame.life: Life in 2036","copy":false},{"img":"endgame-3","head":"A vision, not a promise","alt":"Screenshot of endgame.life: A vision, not a promise","copy":false}],"physics":[{"img":"hmrphysics-1","head":"HMR physics in plain words","alt":"Screenshot of hmrphysics.life: HMR physics in plain words","copy":false},{"img":"hmrphysics-2","head":"What HMR claims","alt":"Screenshot of hmrphysics.life: What HMR claims","copy":false},{"img":"hmrphysics-3","head":"Established and open","alt":"Screenshot of hmrphysics.life: Established and open","copy":false}],"math":[{"img":"hmrmath-1","head":"HMR mathematics","alt":"Screenshot of hmrmath.life: HMR mathematics","copy":false},{"img":"hmrmath-2","head":"An old puzzle","alt":"Screenshot of hmrmath.life: An old puzzle","copy":false},{"img":"hmrmath-3","head":"Where it stands","alt":"Screenshot of hmrmath.life: Where it stands","copy":false}],"science":[{"img":"hmrscience-1","head":"The science bridge","alt":"Screenshot of hmrscience.life: The science bridge","copy":false},{"img":"hmrscience-2","head":"Every claim carries a label","alt":"Screenshot of hmrscience.life: Every claim carries a label","copy":false},{"img":"hmrscience-3","head":"What the chain shows, and what it does not","alt":"Screenshot of hmrscience.life: What the chain shows, and what it does not","copy":false}],"reaction":[{"img":"reactionapp-1","head":"Watch anything","alt":"Screenshot of reactionapp.life: Watch anything","copy":false},{"img":"reactionapp-2","head":"React to yourself","alt":"Screenshot of reactionapp.life: React to yourself","copy":false},{"img":"reactionapp-3","head":"The Reaction Wall","alt":"Screenshot of reactionapp.life: The Reaction Wall","copy":false}],"funsies":[{"img":"funsies-1","head":"Everything here is for fun","alt":"Screenshot of funsies.fun: Everything here is for fun","copy":false},{"img":"funsies-2","head":"Play","alt":"Screenshot of funsies.fun: Play","copy":false},{"img":"funsies-3","head":"Wreck this page","alt":"Screenshot of funsies.fun: Wreck this page","copy":false}]};
function copySetup(ok) {
  var url = 'https://claudebomb.com/setup/claude-setup-guide.md';
  function done() { ok.textContent = 'Copied'; }
  function fail() { W.open('https://claudebomb.com/#get', '_blank', 'noopener'); }
  function legacy(t) {
    var ta = document.createElement('textarea'); ta.value = t; ta.style.cssText = 'position:fixed;left:-999px';
    document.body.appendChild(ta); ta.select();
    var good = false; try { good = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta); if (good) done(); else fail();
  }
  function put(t) {
    if (W.navigator.clipboard && W.navigator.clipboard.writeText) W.navigator.clipboard.writeText(t).then(done, function () { legacy(t); });
    else legacy(t);
  }
  if (!W.fetch) return fail();
  W.fetch(url).then(function (r) { if (!r.ok) throw 0; return r.text(); }).then(put, fail);
}
H.registerScreen('slides', function (root) {
  var h = '', k, j, s;
  for (k in D) for (j = 0; j < D[k].length; j++) {
    s = D[k][j];
    h += '<figure class="hc-slides-f" data-t="' + k + '.s' + (j + 1) + '" hidden><div class="hc-slides-h">' + esc(s.head) + '</div>' +
      '<img src="' + IMG + s.img + '.png" alt="' + esc(s.alt) + '" width="1120" height="630" loading="lazy" draggable="false">' +
      (s.copy ? '<div class="hc-slides-c"><button type="button" class="hc-slides-b" data-t="' + k + '.copy">Copy the setup text</button><span class="hc-slides-s" role="status"></span></div>' : '') +
      '</figure>';
  }
  root.className += ' hc-slides';
  root.innerHTML = h;
  root.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.hc-slides-b');
    if (b) copySetup(b.parentNode.querySelector('.hc-slides-s'));
  });
});
})();
