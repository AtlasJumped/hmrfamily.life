/* HMR family audience paths, v1 (2026-11-25).
   One shared file, loaded by every HMR family site.
   1. A visitor who arrives through an entry link (?aud=seniors and so on) keeps that
      view on every HMR family site they move to: the choice is stored on this device
      only and carried in links between our sites. Nothing is sent anywhere.
   2. Every page that does not already link claudebomb.com gets a key-partner line. */
(function () {
  "use strict";
  if (window.__hmrAud) return; window.__hmrAud = 1;
  var AUDS = {
    academics:   { label: "Research view",       home: "https://hmrfamily.life/academics/" },
    seniors:     { label: "Easy reading view",   home: "https://hmrfamily.life/seniors/" },
    teens:       { label: "Teen view",           home: "https://hmrfamily.life/teens/" },
    millennials: { label: "Everyday view",       home: "https://hmrfamily.life/millennials/" }
  };
  var FAMILY = ["hmrfamily.life", "hmr.family", "claudebomb.com", "endgame.life",
    "reactionapp.life", "chronomath.ai", "hmrfascia.life", "hmrmath.life", "hmrphysics.life",
    "hmrscience.life", "hmrlanguage.life", "hmrfunsies.fun", "hmruniverse.life", "funsies.fun",
    "personaldash.life", "workdash.life", "whatisreality.wtf"];
  var KEY = "hmr.aud";
  var host = location.hostname.replace(/^www\./, "");
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { if (v) localStorage.setItem(KEY, v); else localStorage.removeItem(KEY); } catch (e) {} }
  var q = null;
  try { q = new URLSearchParams(location.search).get("aud"); } catch (e) {}
  if (q === "none") { set(null); q = null; }
  else if (q && AUDS[q]) set(q);
  var aud = (q && AUDS[q]) ? q : get();
  if (!AUDS[aud]) aud = null;

  function isFamily(h) {
    h = (h || "").replace(/^www\./, "");
    for (var i = 0; i < FAMILY.length; i++) if (h === FAMILY[i]) return true;
    return false;
  }

  var css = "" +
    ".hmr-aud-bar{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;justify-content:center;padding:10px 16px;font:600 16px/1.4 system-ui,-apple-system,'Segoe UI',sans-serif;background:#1f2937;color:#fff;position:relative;z-index:50}" +
    ".hmr-aud-bar a,.hmr-aud-bar button{color:#fff;font:inherit;min-height:44px;display:inline-flex;align-items:center}" +
    ".hmr-aud-bar button{background:transparent;border:1px solid rgba(255,255,255,.6);border-radius:999px;padding:0 14px;cursor:pointer}" +
    ".hmr-partner{max-width:1040px;margin:16px auto 0;padding:0 20px;font-size:.95rem}" +
    "html[data-hmr-aud=seniors] body{font-size:20px!important;line-height:1.7!important}" +
    "html[data-hmr-aud=seniors] p,html[data-hmr-aud=seniors] li,html[data-hmr-aud=seniors] td,html[data-hmr-aud=seniors] label,html[data-hmr-aud=seniors] input,html[data-hmr-aud=seniors] select,html[data-hmr-aud=seniors] textarea,html[data-hmr-aud=seniors] button{font-size:max(1em,19px)!important;line-height:1.7!important}" +
    "html[data-hmr-aud=seniors] main a,html[data-hmr-aud=seniors] footer a{text-decoration:underline!important;text-underline-offset:3px}" +
    "html[data-hmr-aud=seniors] .hmr-aud-bar{font-size:20px}" +
    "html[data-hmr-aud=seniors] *{animation-duration:0s!important;transition-duration:0s!important}";

  function addStyle() {
    var s = document.createElement("style"); s.id = "hmr-aud-css"; s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }

  function addBar() {
    if (!aud || !document.body || document.querySelector(".hmr-aud-bar")) return;
    var a = AUDS[aud];
    var bar = document.createElement("div"); bar.className = "hmr-aud-bar"; bar.setAttribute("role", "region"); bar.setAttribute("aria-label", a.label);
    var t = document.createElement("span"); t.textContent = a.label + " is on.";
    var home = document.createElement("a"); home.href = a.home; home.textContent = "Back to your start page";
    var off = document.createElement("button"); off.type = "button"; off.textContent = "Turn off";
    off.addEventListener("click", function () {
      set(null); aud = null; document.documentElement.removeAttribute("data-hmr-aud"); bar.remove();
      try { var u = new URL(location.href); u.searchParams.delete("aud"); history.replaceState(null, "", u.toString()); } catch (e) {}
    });
    bar.appendChild(t);
    if (location.href.split(/[?#]/)[0].replace(/\/index\.html$/, "/") !== a.home) bar.appendChild(home);
    bar.appendChild(off);
    document.body.insertBefore(bar, document.body.firstChild);
  }

  function addPartner() {
    if (host === "claudebomb.com" || host === "personaldash.life") return;
    if (document.querySelector('a[href*="claudebomb.com"]')) return;
    var p = document.createElement("p"); p.className = "hmr-partner";
    p.appendChild(document.createTextNode("Key partner: "));
    var l = document.createElement("a"); l.href = "https://claudebomb.com/"; l.textContent = "claudebomb.com";
    p.appendChild(l);
    p.appendChild(document.createTextNode(", the free, open prompt bank anyone can use and improve."));
    var f = document.querySelector("footer .wrap") || document.querySelector("footer");
    if (f) f.appendChild(p); else document.body.appendChild(p);
  }

  // Carry the path to other HMR family sites when a visitor follows a link.
  document.addEventListener("click", function (e) {
    if (!aud) return;
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    try {
      var u = new URL(a.href, location.href);
      if (!/^https?:$/.test(u.protocol) || !isFamily(u.hostname)) return;
      if (u.hostname.replace(/^www\./, "") === host) return;
      if (!u.searchParams.get("aud")) { u.searchParams.set("aud", aud); a.href = u.toString(); }
    } catch (err) {}
  }, true);

  if (aud) document.documentElement.setAttribute("data-hmr-aud", aud);
  addStyle();
  function ready() { addBar(); addPartner(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready); else ready();
})();
