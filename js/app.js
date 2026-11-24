(function () {
  "use strict";
  var SITES = [
    {
      host: "universemodel.ai", url: "https://universemodel.ai", status: "Flagship",
      short: "The flagship: the Holistic Model of Reality.",
      what: "The Holistic Model of Reality (HMR): one picture of reality joining Eastern and Western thought, the body as a tensegrity with fascia, values, and claims tied to tests.",
      slides: [
        ["One picture of reality", "The Holistic Model of Reality, or HMR, is one picture of reality.", "orbs"],
        ["East and West", "It joins Eastern and Western thought.", "rings"],
        ["The body", "It sees the body as a tensegrity with fascia.", "bars"],
        ["Values", "It includes a set of values.", "orbs"],
        ["Tied to tests", "Its claims are tied to tests.", "rings"]
      ],
      faq: [
        ["What is HMR?", "The Holistic Model of Reality: one picture of reality joining Eastern and Western thought."],
        ["What does it say about the body?", "It describes the body as a tensegrity with fascia."],
        ["How are its claims handled?", "Claims are tied to tests."]
      ]
    },
    {
      host: "claudebomb.com", url: "https://claudebomb.com", status: "Available",
      short: "A free AI dashboard that helps you set up and use your AI assistant.",
      what: "A free AI dashboard: a text file you give your AI assistant that sets it up and helps you use AI well.",
      slides: [
        ["A free AI dashboard", "claudebomb.com is a free AI dashboard.", "orbs"],
        ["A text file", "It is a text file you give your AI assistant.", "bars"],
        ["Set up", "The file sets your assistant up.", "rings"],
        ["Use AI well", "It also helps you use AI well.", "orbs"],
        ["Personal now, work next", "A personal dashboard is ready now. A work dashboard is planned.", "bars"]
      ],
      faq: [
        ["What is it?", "A text file you give your AI assistant. It sets the assistant up and helps you use AI well."],
        ["Does it cost anything?", "No. It is free, like everything in the HMR family."],
        ["Is there a work version?", "A personal dashboard is available now. A work dashboard is planned."]
      ]
    },
    {
      host: "reactionapp.life", url: "https://reactionapp.life", status: "In progress",
      short: "Record your face while you watch and get a highlight reel of your reactions.",
      what: "The Reaction App: record your face while you watch, get a highlight reel of your reactions, share with friends.",
      slides: [
        ["The Reaction App", "Watch something. The Reaction App records your face while you watch.", "rings"],
        ["Your highlights", "You get a highlight reel of your reactions.", "orbs"],
        ["Share the joy", "Share the reel with friends.", "bars"],
        ["In progress", "We are still building it.", "rings"]
      ],
      faq: [
        ["What does it do?", "It records your face while you watch, then gives you a highlight reel of your reactions."],
        ["Can I share the result?", "Yes. You can share it with friends."],
        ["Is it ready?", "Not yet. It is in progress."]
      ]
    },
    {
      host: "endgame.life", url: "https://endgame.life", status: "In progress",
      short: "Our vision of life around 2036, with personal AI that works for you.",
      what: "The vision of where this goes: a picture of life around 2036 with personal AI that works for you.",
      slides: [
        ["The vision", "endgame.life shows where this all goes.", "rings"],
        ["Around 2036", "It is a picture of life around 2036.", "bars"],
        ["AI that works for you", "In that picture, personal AI works for you.", "orbs"],
        ["In progress", "We are still building it.", "rings"]
      ],
      faq: [
        ["What is it?", "The vision of where this goes: a picture of life around 2036 with personal AI that works for you."],
        ["Is it ready?", "Not yet. It is in progress."]
      ]
    },
    {
      host: "chronomath.ai", url: "https://chronomath.ai", status: "In progress",
      short: "HMR's mathematics site.",
      what: "HMR's mathematics site.",
      slides: [
        ["Chronomath", "chronomath.ai is HMR's mathematics site.", "bars"],
        ["In progress", "We are still building it.", "orbs"],
        ["Free, like the rest", "Like every site in the family, it will be free.", "rings"]
      ],
      faq: [
        ["What is it?", "HMR's mathematics site."],
        ["Is it ready?", "Not yet. It is in progress."]
      ]
    }
  ];
  var SOON = ["universemodel.life", "hmrfascia.life", "hmrlanguage.life", "personaldash.life", "workdash.life"];

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

  /* ---------- page content ---------- */
  var map = document.getElementById("sitemap"), sites = document.getElementById("sites"),
      foot = document.getElementById("footlinks");
  SITES.forEach(function (s, i) {
    var a = el("a", { "class": "card", href: "#site-" + i });
    a.appendChild(el("b", { text: s.host }));
    a.appendChild(el("span", { text: s.short }));
    map.appendChild(a);

    var sec = el("section", { "class": "wrap", "aria-labelledby": "h-" + i, id: "site-" + i });
    var box = el("div", { "class": "site" });
    var h = el("h2", { id: "h-" + i, text: s.host });
    h.appendChild(el("span", { "class": "status", text: s.status }));
    box.appendChild(h);
    box.appendChild(el("p", { text: s.what }));
    var act = el("div", { "class": "actions" });
    var tour = el("button", { type: "button", "class": "btn primary", text: "Play the tour" });
    tour.addEventListener("click", function () { openTour(s, tour); });
    var go = el("a", { "class": "btn", href: s.url, rel: "noopener", text: "Go to the site" });
    var q = el("button", { type: "button", "class": "btn", "aria-expanded": "false", "aria-controls": "faq-" + i, text: "Questions" });
    act.appendChild(tour); act.appendChild(go); act.appendChild(q);
    box.appendChild(act);
    var faq = el("div", { "class": "faq", id: "faq-" + i, hidden: "" });
    s.faq.forEach(function (f) {
      faq.appendChild(el("h3", { text: f[0] }));
      faq.appendChild(el("p", { text: f[1] }));
    });
    q.addEventListener("click", function () {
      var open = faq.hasAttribute("hidden");
      if (open) faq.removeAttribute("hidden"); else faq.setAttribute("hidden", "");
      q.setAttribute("aria-expanded", String(open));
    });
    box.appendChild(faq);
    sec.appendChild(box);
    sites.appendChild(sec);

    var li = el("li");
    li.appendChild(el("a", { href: s.url, rel: "noopener", text: s.host }));
    foot.appendChild(li);
  });
  var soon = document.getElementById("soon");
  SOON.forEach(function (h) {
    var li = el("li", { text: h + " " });
    li.appendChild(el("small", { text: "coming soon" }));
    soon.appendChild(li);
    foot.appendChild(el("li", { "class": "small", text: h + " (coming soon)" }));
  });

  /* ---------- tour modal ---------- */
  var modal = document.getElementById("modal"), dlg = modal.querySelector(".dlg"),
      stage = document.getElementById("m-stage"), cap = document.getElementById("m-cap"),
      title = document.getElementById("m-title"), dots = document.getElementById("m-dots"),
      bPrev = document.getElementById("m-prev"), bNext = document.getElementById("m-next"),
      bPlay = document.getElementById("m-play"), bClose = document.getElementById("m-close");
  var cur = null, idx = 0, timer = null, playing = true, opener = null;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function scene(kind, n) {
    stage.textContent = "";
    var big = el("div", { "class": "big", text: String(n + 1) + " / " + cur.slides.length });
    function put(cls, css) { var d = el("div", { "class": cls }); d.style.cssText = css; stage.appendChild(d); }
    if (kind === "rings") {
      put("ring", "width:160px;height:160px"); put("ring r2", "width:160px;height:160px");
    } else if (kind === "bars") {
      put("bar", "width:120px;top:50px;left:calc(50% - 60px)"); put("bar b", "width:90px;top:90px;left:calc(50% - 45px)");
      put("bar", "width:140px;top:130px;left:calc(50% - 70px)");
    } else {
      put("orb", "width:60px;height:60px;left:18%;top:60px"); put("orb b", "width:44px;height:44px;left:70%;top:80px");
      put("orb c", "width:90px;height:90px;left:44%;top:70px");
    }
    stage.appendChild(big);
  }
  function show(i) {
    idx = (i + cur.slides.length) % cur.slides.length;
    var s = cur.slides[idx];
    scene(s[2], idx);
    cap.textContent = s[0] + ". " + s[1];
    dots.textContent = "";
    cur.slides.forEach(function (_, k) { dots.appendChild(el("i", k === idx ? { "class": "on" } : {})); });
  }
  function tick() {
    clearTimeout(timer);
    if (playing && !modal.hidden) timer = setTimeout(function () { show(idx + 1); tick(); }, 5000);
  }
  function setPlay(p) { playing = p; bPlay.textContent = p ? "Pause" : "Play"; tick(); }
  function openTour(s, from) {
    cur = s; opener = from; title.textContent = s.host + " tour";
    modal.hidden = false; show(0); setPlay(!reduce);
    dlg.focus();
  }
  function closeTour() {
    modal.hidden = true; clearTimeout(timer);
    if (opener) opener.focus();
  }
  bPrev.addEventListener("click", function () { show(idx - 1); tick(); });
  bNext.addEventListener("click", function () { show(idx + 1); tick(); });
  bPlay.addEventListener("click", function () { setPlay(!playing); });
  bClose.addEventListener("click", closeTour);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeTour(); });
  modal.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { e.preventDefault(); closeTour(); return; }
    if (e.key === "ArrowRight") { show(idx + 1); tick(); }
    if (e.key === "ArrowLeft") { show(idx - 1); tick(); }
    if (e.key === "Tab") {
      var f = Array.prototype.slice.call(dlg.querySelectorAll("button")), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dlg)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- design picker ---------- */
  var DESIGNS = ["Sunrise", "Meadow", "Citrus", "Sky"];
  var LEVELS = [["strong dislike", "Strong dislike"], ["dislike", "Dislike"], ["like", "Like"], ["strong like", "Strong like"]];
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
