/* After 30 real minutes on hmrfamily.life (added up across visits), ask once whether the visitor would consider being a collaborator.
   Only time with the page in front of the visitor counts: the tab visible and the window focused, and someone active
   (a scroll, tap, key or mouse move) in the last two minutes. Several open tabs count as one clock, not several.
   Yes goes to the Collaborators page; No closes it for good. Time is kept only in this browser (localStorage); nothing is sent. */
(function () {
  "use strict";
  var LIMIT = 30 * 60, TICK = 15, KT = "hmrfamily.time.v2", KL = "hmrfamily.time.last", KA = "hmrfamily.nudge";
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function put(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  if (get(KA) || /\/collaborators\//.test(location.pathname)) return;
  var box = null, active = Date.now();
  ["pointermove", "pointerdown", "keydown", "scroll", "wheel", "touchstart"].forEach(function (ev) {
    addEventListener(ev, function () { active = Date.now(); }, { passive: true });
  });
  function show() {
    if (box || get(KA)) return;
    box = document.createElement("div");
    box.className = "nudge"; box.setAttribute("role", "dialog"); box.setAttribute("aria-labelledby", "nudge-q");
    box.innerHTML = '<p id="nudge-q">You have spent 30 minutes with us. Have we gotten your attention enough for you to consider being a collaborator?</p>' +
      '<div class="row"><a class="btn primary" href="collaborators/">Yes, show me</a><button type="button" class="btn">No, thank you</button></div>';
    box.querySelector("a").addEventListener("click", function () { put(KA, "yes"); });
    box.querySelector("button").addEventListener("click", function () { put(KA, "no"); box.parentNode.removeChild(box); });
    document.body.appendChild(box);
  }
  var t = setInterval(function () {
    if (get(KA)) { clearInterval(t); return; }
    var now = Date.now();
    if (document.hidden || (document.hasFocus && !document.hasFocus()) || now - active > 120000) return;
    var last = parseInt(get(KL), 10) || 0;
    if (now - last < (TICK - 1) * 1000) return; /* another open tab already counted this stretch */
    put(KL, String(now));
    var spent = (parseInt(get(KT), 10) || 0) + TICK; put(KT, String(spent));
    if (spent >= LIMIT) { clearInterval(t); show(); }
  }, TICK * 1000);
})();
