/* After about 30 minutes on hmrfamily.life (added up across visits), ask once whether the visitor would consider being a collaborator.
   Yes goes to the Collaborators page; No closes it for good. Time is kept only in this browser (localStorage); nothing is sent. */
(function () {
  "use strict";
  var LIMIT = 30 * 60, KT = "hmrfamily.time", KA = "hmrfamily.nudge";
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function put(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  if (get(KA) || /\/collaborators\//.test(location.pathname)) return;
  var spent = parseInt(get(KT), 10) || 0, box = null;
  function show() {
    if (box || get(KA)) return;
    box = document.createElement("div");
    box.className = "nudge"; box.setAttribute("role", "dialog"); box.setAttribute("aria-labelledby", "nudge-q");
    box.innerHTML = '<p id="nudge-q">You have spent 30 minutes with us. Have we gotten your attention enough for you to consider being a collaborator?</p>' +
      '<div class="row"><a class="btn primary" href="collaborators/">Yes, show me</a><button type="button" class="btn">No, thank you</button></div>';
    box.querySelector("a").addEventListener("click", function () { put(KA, "yes"); });
    box.querySelector("button").addEventListener("click", function () { put(KA, "no"); box.parentNode.removeChild(box); });
    document.body.appendChild(box);
    box.querySelector("a").focus({ preventScroll: true });
  }
  if (spent >= LIMIT) { show(); return; }
  var t = setInterval(function () {
    if (document.hidden) return;
    spent += 15; put(KT, String(spent));
    if (spent >= LIMIT) { clearInterval(t); show(); }
  }, 15000);
})();
