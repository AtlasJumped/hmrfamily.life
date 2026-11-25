(function () {
  "use strict";
  var IMG = "img/tour/";
  // Captions use only what each site says about itself. HMR claims are labeled as HMR's.
  var TOURS = {
    universemodel: {
      host: "universemodel.life", url: "https://universemodel.ai", title: "universemodel.life, the soul of HMR",
      slides: [
        ["One picture of reality", "universemodel-1", "Physics describes matter, biology describes life, medicine describes illness, psychology describes the mind, and religion describes meaning. Each sees its own part clearly. None describes the whole. The Holistic Model of Reality, or HMR, is our proposal for one picture that does."],
        ["A partial model and a holistic one", "universemodel-1", "A street map shows the roads and nothing of the buildings or the people. A blueprint draws structure, rooms, wiring, and plumbing together, each part fitting the others. HMR tries to be the blueprint for all of reality: the origin of the universe, the laws of physics, life, the mind, health, and how to live."],
        ["Three parts", "universemodel-2", "HMR rests on three parts. Mind: a Universal Intelligence exists. Body: fascia, the body's continuous web, is a tensegrity. The marriage: the physics between them, which is how one intelligence acts through a body."],
        ["East and West", "universemodel-3", "HMR treats Eastern and Western thought as two languages describing one reality, and it aims at the whole, from the origin of physical reality to the human body, including consciousness and health."],
        ["Tied to tests", "universemodel-3", "A model is only worth holding if you can test it. HMR comes with science and practices you can test, and it labels each claim as established science, HMR's view, or open."]
      ]
    },
    claudebomb: {
      host: "claudebomb.com", url: "https://claudebomb.com", title: "claudebomb.com, the flagship",
      slides: [
        ["Your helping hand into AI", "claudebomb-1", "claudebomb is your helping hand into the blossoming world of artificial intelligence. Copy one piece of text into your AI assistant, and within minutes it starts working for you."],
        ["Two products", "claudebomb-2", "The personal dashboard is available now: free text you copy and paste into your AI assistant. The work dashboard is the future, planned for mid to late 2027. It is not built yet, and the personal dashboard paves the way for it."],
        ["It is a text file", "claudebomb-3", "That is all it is. You copy plain text, like a note, and paste it into a chat. There is nothing to download, it contains no code that runs by itself, and it sends nothing anywhere. Try it now: click this button to copy, then paste it into your favorite artificial intelligence system. It will work right away.", "copy"]
      ]
    },
    endgame: {
      host: "endgame.life", url: "https://endgame.life", title: "endgame.life, the vision",
      slides: [
        ["One dashboard", "endgame-1", "One dashboard. Your whole life in view. Imagine everyone has a calm page that runs the day: the plan, the inbox, the people, the trip, the fun."],
        ["Life in 2036", "endgame-2", "Nine moments from invented people. Under each one, a line says what works today with the free dashboard file at claudebomb.com, and another says what we hope will be true in 2036."],
        ["A vision, not a promise", "endgame-3", "It is the picture of where the flagship products are headed, after both are built."]
      ]
    },
    physics: {
      host: "hmrphysics.life", url: "https://hmrphysics.life", title: "hmrphysics.life",
      slides: [
        ["HMR physics in plain words", "hmrphysics-1", "HMR keeps every equation physics has confirmed. What it changes is the framework the equations are read in: Universal Intelligence comes first, and space, time, and matter come after."],
        ["What HMR claims", "hmrphysics-2", "In HMR, space, time, and matter are not the bottom layer of reality. Read that way, the open problems of physics change shape."],
        ["Established and open", "hmrphysics-3", "Established science carries a source. HMR's view is HMR's. Open means nobody has the answer yet, and the page says so in those words."]
      ]
    },
    math: {
      host: "hmrmath.life", url: "https://hmrmath.life", title: "hmrmath.life",
      slides: [
        ["HMR mathematics", "hmrmath-1", "Why does the universe obey equations? In HMR's account, mathematics is the ordered pattern of thought within a Universal Intelligence, and nature is mathematical because it is made of that ordered thought."],
        ["An old puzzle", "hmrmath-2", "The physicist Eugene Wigner called the usefulness of mathematics in physics unreasonable, and said there is no rational explanation for it. HMR offers one, and labels it as HMR's view."],
        ["Where it stands", "hmrmath-3", "The page is marked work in progress, and it shows how far along each of its parts is."]
      ]
    },
    science: {
      host: "hmrscience.life", url: "https://hmrscience.life", title: "hmrscience.life",
      slides: [
        ["The science bridge", "hmrscience-1", "HMR does not say believe this. It lays out a chain you can inspect and labels every claim, so a skeptic only has to find the link that breaks."],
        ["Every claim carries a label", "hmrscience-2", "Each claim is marked once, where it is made, as established science, HMR's view, or open. Established science carries a source link. Open means we do not know yet."],
        ["What the chain shows, and what it does not", "hmrscience-3", "It tells one narrative that never breaks logic, from a non-physical intelligence to the physical universe. It does not prove that Universal Intelligence exists, replace established physics, or yet derive gravity."]
      ]
    },
    reaction: {
      host: "reactionapp.life", url: "https://reactionapp.life", title: "reactionapp.life",
      slides: [
        ["Watch anything", "reactionapp-1", "Watch anything. Keep your best reactions. Reaction videos, made by you and your people."],
        ["React to yourself", "reactionapp-2", "Watch longer content and get a highlight reel of your strongest reactions. The camera records your face and the screen records what you watch. You choose the moments to keep, then post, save, or send them."],
        ["The Reaction Wall", "reactionapp-3", "The heart of the app is a public board of reactions that people choose to share. Every one can be reacted to, and the thread grows. This site is still in progress."]
      ]
    },
    funsies: {
      host: "funsies.fun", url: "https://funsies.fun", title: "funsies.fun",
      slides: [
        ["Everything here is for fun", "funsies-1", "Everything here exists to have fun."],
        ["Play", "funsies-2", "Each game opens right on the page, full screen. Fennsmash, the smash game. A Reaction App test of your reactions. A tensegrity physics sim where you pluck a living structure."],
        ["Wreck this page", "funsies-3", "Press a button and watch the page misbehave. It always puts itself back."]
      ]
    }
  };
  window.hmrTours = TOURS;

  function el(tag, attrs, kids) {
    var e = document.createElement(tag), k;
    for (k in (attrs || {})) {
      if (k === "text") e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { e.appendChild(c); });
    return e;
  }
  function store(get, key, val) {
    try {
      if (get) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, val);
    } catch (e) { return null; }
    return null;
  }

  /* ---------- tour window ---------- */
  var modal = document.getElementById("modal"), win = modal.querySelector(".tour"),
      track = document.getElementById("m-track"), title = document.getElementById("m-title"),
      dots = document.getElementById("m-dots"), bPrev = document.getElementById("m-prev"),
      bNext = document.getElementById("m-next"), bPlay = document.getElementById("m-play"),
      bClose = document.getElementById("m-close"), bGo = document.getElementById("m-go");
  var cur = null, idx = 0, playing = false, opener = null, timer = null, token = 0;
  var N = window.HMRNarrator, canSpeak = !!(N && N.can);
  var bVoice = document.getElementById("m-voice");
  if (canSpeak && bVoice) N.bindSelect(bVoice);
  else if (bVoice) bVoice.hidden = true;
  if (bVoice) bVoice.addEventListener("change", function () { if (playing) narrate(); });

  function stopSpeech() { token++; clearTimeout(timer); if (N) N.cancel(); }
  function bodyText(s) {
    var t = s[2], ti = s[0].replace(/[.!?]+$/, "");
    if (t.toLowerCase().indexOf(ti.toLowerCase()) === 0) t = t.slice(ti.length).replace(/^[\s.,:;!?-]+/, "");
    return t;
  }
  function show(i) {
    idx = Math.max(0, Math.min(cur.slides.length - 1, i));
    track.style.transform = "translateX(" + (-100 * idx) + "%)";
    dots.textContent = "";
    cur.slides.forEach(function (_, k) {
      var d = el("i", { role: "tab", "aria-label": "Slide " + (k + 1) + " of " + cur.slides.length, "aria-selected": String(k === idx) });
      if (k === idx) d.setAttribute("class", "on");
      d.addEventListener("click", function () { go(k); });
      dots.appendChild(d);
    });
    bPrev.disabled = idx === 0; bNext.disabled = idx === cur.slides.length - 1;
    Array.prototype.forEach.call(track.children, function (c, k) { c.setAttribute("aria-hidden", k === idx ? "false" : "true"); });
  }
  function narrate() {
    var my = ++token; clearTimeout(timer); if (N) N.cancel();
    if (!playing) return;
    var text = bodyText(cur.slides[idx]);
    function next() {
      if (my !== token || !playing) return;
      if (idx < cur.slides.length - 1) { show(idx + 1); narrate(); } else setPlay(false);
    }
    var ok = canSpeak && N.speak(text, { rate: 0.98, onend: next, onerror: function () { if (my === token) setPlay(false); } });
    if (!ok) timer = setTimeout(next, Math.max(6000, text.length * 60));
  }
  function setPlay(p) {
    playing = p; bPlay.textContent = p ? "Pause" : "Play";
    bPlay.setAttribute("aria-pressed", String(p));
    if (p) narrate(); else stopSpeech();
  }
  function go(i) { show(i); if (playing) narrate(); }
  function copySetup(btn, ok) {
    var url = "https://claudebomb.com/setup/claude-setup-guide.md";
    function done() { ok.textContent = "Copied"; setTimeout(function () { ok.textContent = ""; }, 3000); }
    function fail() { window.open("https://claudebomb.com/#get", "_blank", "noopener"); }
    function put(t) {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, function () { legacy(t); });
      else legacy(t);
    }
    function legacy(t) {
      var ta = el("textarea", { "aria-hidden": "true" }); ta.value = t; ta.style.cssText = "position:fixed;left:-999px";
      document.body.appendChild(ta); ta.select();
      var good = false; try { good = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta); if (good) done(); else fail();
    }
    fetch(url).then(function (r) { if (!r.ok) throw 0; return r.text(); }).then(put, fail);
  }
  function openTour(key, from) {
    var t = TOURS[key]; if (!t) return;
    cur = t; opener = from; title.textContent = t.title;
    track.textContent = "";
    t.slides.forEach(function (s, k) {
      var fig = el("figure", { "class": "slide" });
      var img = el("img", { src: IMG + s[1] + ".png", alt: "Screenshot of " + t.host + ": " + s[0], width: "1120", height: "630", draggable: "false" });
      if (k > 0) img.setAttribute("loading", "lazy");
      fig.appendChild(img);
      var cap = el("figcaption", {}, [el("b", { text: s[0] }), el("span", { text: s[2] })]);
      if (s[3] === "copy") {
        var cb = el("button", { type: "button", "class": "btn primary copybtn", text: "Copy" });
        var ok = el("span", { "class": "copyok", role: "status" });
        cb.addEventListener("click", function () { copySetup(cb, ok); });
        cap.insertBefore(el("div", {}, [cb, ok]), cap.lastChild);
      }
      fig.appendChild(cap); track.appendChild(fig);
    });
    bGo.setAttribute("href", t.url);
    modal.hidden = false; document.body.classList.add("tour-open");
    show(0); win.focus();
    setPlay(true);
  }
  function closeTour() {
    stopSpeech(); playing = false; bPlay.textContent = "Pause"; modal.hidden = true; document.body.classList.remove("tour-open");
    if (opener) opener.focus();
  }
  window.hmrOpenTour = openTour;
  bPrev.addEventListener("click", function () { go(idx - 1); });
  bNext.addEventListener("click", function () { go(idx + 1); });
  bPlay.addEventListener("click", function () { setPlay(!playing); });
  bClose.addEventListener("click", closeTour);
  var view = modal.querySelector(".tour-view"), tx = null, ty = 0, wheelAt = 0;
  view.addEventListener("touchstart", function (e) { var t = e.touches[0]; tx = t.clientX; ty = t.clientY; }, { passive: true });
  view.addEventListener("touchend", function (e) {
    if (tx === null) return;
    var t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty; tx = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) go(idx + (dx < 0 ? 1 : -1));
  }, { passive: true });
  view.addEventListener("wheel", function (e) {
    if (Math.abs(e.deltaX) < 8 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
    e.preventDefault();
    var now = Date.now(); if (now - wheelAt < 600) return;
    wheelAt = now; go(idx + (e.deltaX > 0 ? 1 : -1));
  }, { passive: false });
  modal.addEventListener("click", function (e) { if (e.target === modal) closeTour(); });
  window.addEventListener("pagehide", stopSpeech);
  modal.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { e.preventDefault(); closeTour(); return; }
    if (e.key === "ArrowRight") go(idx + 1);
    if (e.key === "ArrowLeft") go(idx - 1);
    if (e.key === "Tab") {
      var f = Array.prototype.slice.call(win.querySelectorAll("button:not([disabled]),a[href]")), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === win)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- design picker ---------- */
  var DESIGNS = ["Sunrise", "Meadow", "Citrus", "Sky"];
  var LEVELS = [["strong like", "Strong like"], ["like", "Like"], ["dislike", "Dislike"], ["strong dislike", "Strong dislike"]];
  var KEY = "hmrfamily.ratings.v1";
  var ratings = {};
  try { ratings = JSON.parse(store(true, KEY) || "{}") || {}; } catch (e) { ratings = {}; }
  var design = parseInt(new URLSearchParams(location.search).get("design"), 10);
  if (!(design >= 1 && design <= 4)) design = parseInt(store(true, "hmrfamily.design"), 10);
  if (!(design >= 1 && design <= 4)) design = 1;

  var pk = document.getElementById("picker");
  var openBtn = el("button", { type: "button", "class": "pk-open", "aria-expanded": "false", "aria-controls": "pk-panel", text: "Design" });
  var panel = el("div", { "class": "pk-panel", id: "pk-panel", role: "region", "aria-label": "Design picker", hidden: "" });
  pk.appendChild(panel); pk.appendChild(openBtn);

  function save() { store(false, KEY, JSON.stringify(ratings)); }
  function render() {
    document.documentElement.setAttribute("data-design", String(design));
    store(false, "hmrfamily.design", String(design));
    panel.textContent = "";
    var top = el("div", { "class": "pk-top" }, [el("b", { text: "Pick a design" }), el("button", { type: "button", "class": "btn", id: "pk-close", text: "Close" })]);
    panel.appendChild(top);
    top.lastChild.addEventListener("click", closePanel);
    var row = el("div", { "class": "pk-designs", role: "group", "aria-label": "Designs" });
    DESIGNS.forEach(function (n, i) {
      var b = el("button", { type: "button", "aria-pressed": String(design === i + 1), text: (i + 1) + " " + n });
      b.addEventListener("click", function () {
        design = i + 1;
        try { history.replaceState(null, "", "?design=" + design); } catch (e) {}
        render(); panel.querySelector(".pk-designs button[aria-pressed=true]").focus();
      });
      row.appendChild(b);
    });
    panel.appendChild(row);
    var r = ratings[design] || {};
    var fs = el("fieldset"); fs.appendChild(el("legend", { text: "Your rating of design " + design }));
    LEVELS.forEach(function (l) {
      var inp = el("input", { type: "radio", name: "rate", value: l[0] });
      if (r.level === l[0]) inp.checked = true;
      inp.addEventListener("change", function () {
        ratings[design] = ratings[design] || {}; ratings[design].level = l[0]; save(); msg("Saved.");
      });
      fs.appendChild(el("label", {}, [inp, document.createTextNode(" " + l[1])]));
    });
    panel.appendChild(fs);
    var tl = el("label", { "for": "pk-note", text: "Note (optional)" });
    var ta = el("textarea", { id: "pk-note", maxlength: "500" }); ta.value = r.note || "";
    ta.addEventListener("input", function () { ratings[design] = ratings[design] || {}; ratings[design].note = ta.value; save(); });
    panel.appendChild(tl); panel.appendChild(ta);
    var cp = el("button", { type: "button", "class": "btn primary", text: "Copy all ratings" });
    cp.addEventListener("click", copyAll);
    panel.appendChild(el("p", {}, [cp]));
    panel.appendChild(el("p", { "class": "pk-msg", id: "pk-msg", role: "status" }));
  }
  function msg(t) { var m = document.getElementById("pk-msg"); if (m) m.textContent = t; }
  function summary() {
    var out = ["hmrfamily.life design ratings"];
    DESIGNS.forEach(function (n, i) {
      var r = ratings[i + 1] || {};
      out.push((i + 1) + " " + n + ": " + (r.level || "not rated") + (r.note ? " | note: " + r.note : ""));
    });
    return out.join("\n");
  }
  function copyAll() {
    var t = summary();
    function fallback() {
      var ta = el("textarea", { "aria-hidden": "true" }); ta.value = t; ta.style.cssText = "position:fixed;left:-999px";
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta); msg(ok ? "Copied." : "Could not copy. Select the text in the note box instead.");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(function () { msg("Copied."); }, fallback);
    } else fallback();
  }
  function closePanel() { panel.setAttribute("hidden", ""); openBtn.setAttribute("aria-expanded", "false"); openBtn.focus(); }
  openBtn.addEventListener("click", function () {
    var open = panel.hasAttribute("hidden");
    if (open) { panel.removeAttribute("hidden"); openBtn.setAttribute("aria-expanded", "true"); panel.querySelector("button").focus(); }
    else closePanel();
  });
  panel.addEventListener("keydown", function (e) { if (e.key === "Escape") closePanel(); });
  render();
})();
