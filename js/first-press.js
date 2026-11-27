/* hmrfamily.life: the first time each button along the bottom is pressed, it opens as usual and a short note says what it is and why it's here.
   Each note shows once per button (remembered in this browser). Nothing is sent. Works with whatever the bar looks like: it only listens for clicks. */
(function () {
  "use strict";
  var KEY = "hmrfamily.firstpress.v1";
  var TIPS = {
    center: ["The ELV8 button", "This opens your dashboard: quick actions, Funsies, a studio for colors, type and layout, and ways to improve this site. It's here because to design for perfection is to empower users with customization. The future of websites is engineers building a competent framework, and you changing your interface easily."],
    arrows: ["The arrows", "They move you around the page. Up and down jump to the top or the bottom. Left and right step through the sections. Hold one to keep going."],
    mic: ["The mic", "This is how you give us signal. Press record and talk about what you like, what you don't, and what could be better. Every message is read."],
    react: ["React", "This is for expressing yourself. Pick a feeling, then point at the exact spot on the page that caused it."],
    funsies: ["Funsies", "A button for joy. It's fun for us to make, and fun for you to play. If every site had a fun button, people would always know where to go."],
    back: ["Back", "Goes back a page, like your browser's button."],
    fwd: ["Forward", "Goes forward a page, like your browser's button."]
  };
  var seen = {};
  try { seen = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { seen = {}; }
  function which(t) {
    if (!t || !t.closest) return null;
    if (t.closest("#hmr-hmr")) return "center";
    if (t.closest(".hmr-pa")) return "arrows";
    if (t.closest("#hmr-speak")) return "mic";
    if (t.closest(".hmr-rxbtn")) return "react";
    if (t.closest(".hmr-fzbtn") || t.closest("[aria-label='Funsies']")) return "funsies";
    if (t.closest("#hmr-back")) return "back";
    if (t.closest("#hmr-fwd")) return "fwd";
    return null;
  }
  var box = null, timer = 0;
  function close() { clearTimeout(timer); if (box && box.parentNode) box.parentNode.removeChild(box); box = null; }
  function show(k) {
    close();
    var tip = TIPS[k];
    box = document.createElement("div");
    box.className = "fp-tip"; box.setAttribute("role", "status");
    var h = document.createElement("h3"); h.textContent = tip[0];
    var p = document.createElement("p"); p.textContent = tip[1];
    var row = document.createElement("div"); row.className = "row";
    var x = document.createElement("button"); x.type = "button"; x.className = "btn small"; x.textContent = "Close";
    x.addEventListener("click", close);
    row.appendChild(x); box.appendChild(h); box.appendChild(p); box.appendChild(row);
    document.body.appendChild(box);
    timer = setTimeout(close, 15000);
  }
  document.addEventListener("click", function (e) {
    var k = which(e.target);
    if (!k || seen[k]) return;
    seen[k] = 1;
    try { localStorage.setItem(KEY, JSON.stringify(seen)); } catch (err) {}
    show(k);
  }, true);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && box) close(); });
})();
