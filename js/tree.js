(function () {
  "use strict";
  function el(tag, attrs, kids) {
    var e = document.createElement(tag), k;
    for (k in (attrs || {})) { if (k === "text") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); }
    (kids || []).forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }
  function ext(href, text, cls) { return el("a", { href: href, target: "_blank", rel: "noopener", "class": cls || "", text: text }); }

  /* ---------- voice box: feedback, a different vision, support, or help building one site ---------- */
  var KINDS = [["feedback", "Feedback on the plan"], ["vision", "A different vision"], ["support", "Offer support"], ["build", "Help build it"]];
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var vbN = 0;
  function voiceBox(host) {
    var id = "vb" + (++vbN);
    var box = el("div", { "class": "vb", id: id, role: "group", "aria-label": "Your voice on " + host });
    box.appendChild(el("p", { "class": "vb-h", text: "Your voice on " + host }));
    var kinds = el("div", { "class": "vb-kinds", role: "radiogroup", "aria-label": "What kind" });
    var kind = "feedback";
    KINDS.forEach(function (k, i) {
      var inp = el("input", { type: "radio", name: id + "-k", value: k[0], id: id + "-" + k[0] });
      if (!i) inp.checked = true;
      inp.addEventListener("change", function () { kind = k[0]; });
      kinds.appendChild(el("label", { "for": id + "-" + k[0] }, [inp, document.createTextNode(" " + k[1])]));
    });
    box.appendChild(kinds);
    var ta = el("textarea", { id: id + "-t", rows: "4", maxlength: "4000", placeholder: "Say what you think. Press the mic and talk, or type." });
    box.appendChild(el("label", { "class": "vb-l", "for": id + "-t", text: "Your words" }));
    var row = el("div", { "class": "vb-row" });
    row.appendChild(ta);
    var mic = null, rec = null, on = false, base = "";
    if (SR) {
      mic = el("button", { type: "button", "class": "vb-mic", "aria-pressed": "false", "aria-label": "Start recording", text: "🎙" });
      mic.addEventListener("click", function () {
        if (on) { try { rec.stop(); } catch (e) {} return; }
        try {
          rec = new SR(); rec.continuous = true; rec.interimResults = true; rec.lang = document.documentElement.lang || "en-US";
          base = ta.value ? ta.value.replace(/\s*$/, " ") : "";
          rec.onresult = function (e) { var t = "", i; for (i = 0; i < e.results.length; i++) t += e.results[i][0].transcript; ta.value = base + t; };
          rec.onend = function () { on = false; mic.setAttribute("aria-pressed", "false"); mic.setAttribute("aria-label", "Start recording"); mic.classList.remove("rec"); say("Stopped. Edit the words if you like, then send."); };
          rec.onerror = function (e) { say(e && e.error === "not-allowed" ? "Your browser blocked the microphone. Allow it for this site, or type instead." : "The mic stopped. You can type instead."); };
          rec.start(); on = true; mic.setAttribute("aria-pressed", "true"); mic.setAttribute("aria-label", "Stop recording"); mic.classList.add("rec"); say("Listening. Talk as long as you like, then press the mic again.");
        } catch (e) { say("The mic could not start here. You can type instead."); }
      });
      row.appendChild(mic);
    }
    box.appendChild(row);
    var em = el("input", { type: "email", id: id + "-e", autocomplete: "email", placeholder: "Your email, if you want a reply (optional)" });
    box.appendChild(el("label", { "class": "vb-l", "for": id + "-e", text: "Email (optional)" }));
    box.appendChild(em);
    var send = el("button", { type: "button", "class": "btn primary", text: "Send" });
    var out = el("p", { "class": "vb-out", role: "status", "aria-live": "polite" });
    function say(t) { out.textContent = t; }
    send.addEventListener("click", function () {
      var msg = ta.value.trim();
      if (!msg) { say("Add a few words first."); ta.focus(); return; }
      if (on) { try { rec.stop(); } catch (e) {} }
      var label = KINDS.filter(function (k) { return k[0] === kind; })[0][1];
      if (!window.HMRDock || !window.HMRDock.send) { say("Sending isn't ready yet. Use the Speak button at the bottom of the page, and mention " + host + "."); return; }
      send.disabled = true; say("Sending...");
      window.HMRDock.send({ kind: "future site", subject: "hmrfamily.life, " + label + ": " + host, message: label + " for " + host + ":\n\n" + msg, email: em.value.trim() || undefined, details: { site: host, type: kind } })
        .then(function (r) {
          send.disabled = false;
          if (r && r.ok) { ta.value = ""; say("Sent. Thank you. Every message is read."); }
          else say("Your email app should have opened with your message. Your words are still here.");
        }, function () { send.disabled = false; say("That didn't send. Your words are still here; try again."); });
    });
    box.appendChild(el("div", { "class": "vb-act" }, [send]));
    box.appendChild(out);
    return box;
  }
  function voiceToggle(host, holder) {
    var b = el("button", { type: "button", "class": "vb-open", "aria-expanded": "false", text: "Add your voice" });
    b.setAttribute("aria-label", "Add your voice on " + host);
    var box = null;
    b.addEventListener("click", function () {
      if (!box) { box = voiceBox(host); holder.appendChild(box); b.setAttribute("aria-controls", box.id); }
      var open = b.getAttribute("aria-expanded") !== "true";
      box.hidden = !open; b.setAttribute("aria-expanded", String(open));
      if (open) { var r = box.querySelector("input[type=radio]:checked"); if (r) r.focus(); }
    });
    return b;
  }

  /* ---------- the family, as cards ---------- */
  // url: null means shown without a link until the site is secure.
  var PERSONALDASH = { host: "personaldash.life", url: "https://personaldash.life", status: "Live", tag: "Flagship",
    text: "Your helping hand into the blossoming world of AI. A free personal dashboard and AI introduction kit in one piece of text." };
  var CLAUDEBOMB = { host: "claudebomb.com", url: "https://claudebomb.com", tour: "claudebomb", status: "Live", tag: "Flagship",
    text: "The prompt bank for every AI model, not just Claude. Free forever, with no ads. Your free-forever login lives here." };
  var PRODUCTS = [
    { name: "Personal dash", state: "Available now", text: "Free forever. Copy it, paste it into your AI assistant, and start today.", on: true },
    { name: "Work dash", state: "The future, V2", text: "Planned for mid to late 2027. The personal dash paves the way. Not built yet.", on: false }
  ];
  var ENDGAME = { host: "endgame.life", url: "https://endgame.life", tour: "endgame", status: "In progress", tag: "The vision",
    text: "Where the dashboards lead once both exist: a picture of life around 2036, with personal AI that works for you." };
  // Done: built and live.
  var DONE = [
    { host: "ilovedogs.dog", url: "https://ilovedogs.dog", status: "Live", tag: "Dogs", text: "Free signal bands so every dog lover knows whether a dog wants to say hello, and a plan to get them into enough hands to work." },
    { host: "hmrphysics.life", url: "https://hmrphysics.life", tour: "physics", status: "Live", tag: "Physics", text: "HMR keeps every equation physics has confirmed and reads them in a new framework. Every claim is labeled as established, HMR's view, or open." },
    { host: "hmrscience.life", url: "https://hmrscience.life", tour: "science", status: "Live", tag: "Science", text: "The sciences beyond math and physics: where HMR hooks into them, and a chain of claims you can inspect." },
    { host: "funsies.fun", url: "https://funsies.fun", tour: "funsies", status: "Live", tag: "Joy", text: "Toys and games, made for joy. Everything here exists to have fun." }
  ];
  // Being built now: family sites that are started but not finished.
  var BUILDING = [
    { host: "reactionapp.life", url: "https://reactionapp.life", tour: "reaction", status: "In progress", tag: "Reactions", text: "Record your reactions while you watch, keep the best moments, and share them with friends." },
    { host: "hmrmath.life", url: "https://hmrmath.life", tour: "math", status: "In progress", tag: "Mathematics", text: "Why the universe obeys equations, in HMR's account." },
    { host: "hmrfascia.life", url: null, status: "In progress", tag: "The body", text: "The body as a biotensegrity, with connective tissue first." },
    { host: "hmrlanguage.life", url: null, status: "In progress", tag: "Language", text: "Language, seen from the whole." }
  ];
  var MEMBERS = DONE.concat(BUILDING);
  function pill(s) { return el("span", { "class": "pill " + (s === "In progress" ? "wip" : "live"), text: s }); }
  function card(s, cls, kids, voice) {
    var c = el("article", { "class": "fc " + (cls || "") });
    var top = el("div", { "class": "fc-top" }, [el("span", { "class": "fc-tag", text: s.tag }), pill(s.status)]);
    c.appendChild(top);
    var h = el("h3", { "class": "fc-host" });
    if (s.url) h.appendChild(ext(s.url, s.host)); else h.textContent = s.host;
    c.appendChild(h);
    c.appendChild(el("p", { "class": "fc-text", text: s.text }));
    (kids || []).forEach(function (k) { c.appendChild(k); });
    var act = el("div", { "class": "fc-act" });
    if (s.tour) {
      var b = el("button", { type: "button", "class": "btn primary", text: "Take the tour" });
      b.setAttribute("aria-label", "Take the tour of " + s.host);
      b.setAttribute("data-hmr-card", "tour-" + s.tour);
      act.appendChild(b);
    }
    if (s.url) { var v = ext(s.url, "Visit", "btn"); v.setAttribute("aria-label", "Visit " + s.host + " (opens in a new tab)"); act.appendChild(v); }
    else act.appendChild(el("span", { "class": "fc-soon", text: "Not linked yet" }));
    if (voice) act.appendChild(voiceToggle(s.host, c));
    c.appendChild(act);
    return c;
  }
  var flagsBox = document.getElementById("flags");
  if (flagsBox) {
    var prods = el("div", { "class": "prods" });
    PRODUCTS.forEach(function (p) {
      prods.appendChild(el("div", { "class": "prod" + (p.on ? " on" : "") }, [
        el("span", { "class": "pill " + (p.on ? "live" : "wip"), text: p.state }),
        el("h4", { text: p.name }), el("p", { text: p.text })
      ]));
    });
    flagsBox.appendChild(el("div", { "class": "flags" }, [card(PERSONALDASH, "flag", [prods]), card(CLAUDEBOMB, "flag")]));
    flagsBox.appendChild(el("p", { "class": "then", "aria-hidden": "true", text: "after both, the vision" }));
    flagsBox.appendChild(card(ENDGAME, "vision", null, true));
  }
  function grid(id, list, voice) {
    var box = document.getElementById(id); if (!box) return;
    var g = el("div", { "class": "fgrid" });
    list.forEach(function (m) { g.appendChild(card(m, "", null, voice)); });
    box.appendChild(g);
  }
  grid("done", DONE, false);
  grid("building", BUILDING, true);

  /* footer links: every linked family site */
  var foot = document.getElementById("footlinks");
  if (foot) {
    [{ host: "hmrfamily.life", url: "https://hmrfamily.life/" }, PERSONALDASH, CLAUDEBOMB, ENDGAME].concat(MEMBERS).forEach(function (s) {
      if (!s.url) return;
      var li = el("li"); li.appendChild(s.host === "hmrfamily.life" ? el("a", { href: s.url, text: s.host }) : ext(s.url, s.host)); foot.appendChild(li);
    });
  }

  /* ---------- the domain list (data: x/domains.json, every name we own) ---------- */
  var STAGE = { "HMR family": "Family site", "Live": "Starter page", "Parked": "Plan only" };
  var HELD = ["hmruniverse.life", "hmrfunsies.fun"];
  var TOP = ["underthebed.monster", "overreact.ing", "dragonrid.ing", "elevat.ing", "fennsma.sh", "cosmicjoke.lol", "delulu.monster", "doomscroll.monster", "cosmicru.sh", "createjoy.art", "ilovedogs.dog"];
  var AI = ["aihir.ing", "aiautomat.ing", "aiintern.tech", "aiplann.ing", "aiphotoedit.ing", "aiquot.ing", "aitranslat.ing", "aivideoedit.ing", "aivoiceact.ing"];
  var liveSet = {};
  function ending(h) { return "." + h.split(".").pop(); }
  function cmp(a, b) { return a < b ? -1 : a > b ? 1 : 0; }
  var SALE = [["feat", "Featured for sale"], ["sale", "For sale"], ["maybe", "Probably not for sale"], ["keep", "Not for sale"], ["free", "Free for the right person"]];
  var SALEN = {}; SALE.forEach(function (x) { SALEN[x[0]] = x[1]; });
  var all = [], st = { sort: "cool", q: "", cat: "", end: "", mark: "", sale: {} };
  var saleBox = null;
  var box = document.getElementById("dlist");
  var ctl = document.getElementById("dfilters");

  function option(sel, v, t) { sel.appendChild(el("option", { value: v, text: t })); }
  function counted(key) {
    var c = {}; all.forEach(function (r) { c[r[key]] = (c[r[key]] || 0) + 1; }); return c;
  }
  function buildControls() {
    if (!ctl) return;
    ctl.textContent = "";
    /* sale-status buttons: stack them; each one adds its names to what shows */
    if (!saleBox) { saleBox = el("div", { "class": "dsale", role: "group", "aria-label": "Show names by sale status" }); ctl.parentNode.insertBefore(saleBox, ctl); }
    saleBox.textContent = "";
    saleBox.appendChild(el("p", { "class": "dsale-h", text: "For sale? Tap one or more:" }));
    var sc = counted("sale"), row = el("div", { "class": "dsale-row" });
    SALE.forEach(function (x) {
      var b = el("button", { type: "button", "class": "sb s-" + x[0], "aria-pressed": "false", "data-sale": x[0], text: x[1] + " (" + (sc[x[0]] || 0) + ")" });
      b.addEventListener("click", function () {
        if (st.sale[x[0]]) delete st.sale[x[0]]; else st.sale[x[0]] = 1;
        b.setAttribute("aria-pressed", String(!!st.sale[x[0]])); render();
      });
      row.appendChild(b);
    });
    saleBox.appendChild(row);
    var ask = el("p", { "class": "small dsale-note" });
    ask.appendChild(document.createTextNode("Want a name, or have a good use for a free one? "));
    ask.appendChild(ext("https://discord.gg/gEnC8TpNc", "Tell us on Discord"));
    ask.appendChild(document.createTextNode("."));
    saleBox.appendChild(ask);
    var q = el("input", { type: "search", id: "dq", placeholder: "Search names and ideas", "aria-label": "Search names and ideas", autocomplete: "off" });
    /* Read the box on every kind of change: typing, the mic (which fires change), the clear x, and Enter.
       Dictation adds capitals and punctuation ("Grandma."), so the query is cleaned before matching. */
    var qt = 0;
    function readQ() { var v = q.value.toLowerCase().replace(/[^a-z0-9.\s-]+/g, " ").replace(/\.(\s|$)/g, " ").replace(/\s+/g, " ").trim(); if (v !== st.q) { st.q = v; render(); } }
    ["input", "change", "search", "keyup"].forEach(function (ev) { q.addEventListener(ev, function () { clearTimeout(qt); qt = setTimeout(readQ, 60); }); });
    setInterval(function () { if (document.activeElement === q || q.value) readQ(); }, 700);   // the mic can write without any event
    q.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); readQ(); q.blur(); var t = document.getElementById("list-sum") || box; if (t) try { t.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (x) { t.scrollIntoView(); } } });
    ctl.appendChild(el("label", { "class": "df-q", "for": "dq" }, [el("span", { text: "Search" }), q]));
    function pick(id, label, key, opts) {
      var s = el("select", { id: id });
      opts.forEach(function (o) { option(s, o[0], o[1]); });
      s.addEventListener("change", function () { st[key] = s.value; render(); });
      ctl.appendChild(el("label", { "for": id }, [el("span", { text: label }), s]));
    }
    pick("dsort", "Order", "sort", [["cool", "By coolness"], ["az", "Alphabetical"], ["end", "By domain ending"], ["sale", "By sale status"], ["cat", "By category"]]);
    var cc = counted("c"), cats = Object.keys(cc).sort(function (a, b) { return cc[b] - cc[a] || cmp(a, b); });
    pick("dcat", "Category", "cat", [["", "All categories (" + all.length + ")"]].concat(cats.map(function (k) { return [k, k + " (" + cc[k] + ")"]; })));
    var ec = counted("e"), ends = Object.keys(ec).sort(function (a, b) { return ec[b] - ec[a] || cmp(a, b); });
    pick("dend", "Ending", "end", [["", "All endings"]].concat(ends.map(function (k) { return [k, k + " (" + ec[k] + ")"]; })));
    var mc = counted("m");
    pick("dmark", "Where it stands", "mark", [["", "Any stage"]].concat(["HMR family", "Live", "Parked"].filter(function (k) { return mc[k]; }).map(function (k) { return [k, STAGE[k] + " (" + mc[k] + ")"]; })));
    var reset = el("button", { type: "button", "class": "sbtn", text: "Clear" });
    reset.addEventListener("click", function () {
      st = { sort: "cool", q: "", cat: "", end: "", mark: "", sale: {} };
      var bs = saleBox ? saleBox.querySelectorAll("button") : [], i; for (i = 0; i < bs.length; i++) bs[i].setAttribute("aria-pressed", "false");
      q.value = ""; ["dsort", "dcat", "dend", "dmark"].forEach(function (id) { var s = document.getElementById(id); s.selectedIndex = 0; });
      render();
    });
    ctl.appendChild(reset);
  }
  function pass(r) {
    if (st.cat && r.c !== st.cat) return false;
    if (st.end && r.e !== st.end) return false;
    if (st.mark && r.m !== st.mark) return false;
    if (Object.keys(st.sale).length && !st.sale[r.sale]) return false;
    if (st.q) {
      var hay = (r.h + " " + r.p + " " + r.c).toLowerCase(), flat = hay.replace(/[^a-z0-9]+/g, "");
      var whole = st.q.replace(/[^a-z0-9]+/g, "");
      var words = st.q.split(" ").filter(function (w) { return w && !/^(a|an|the|and|or|of|to|on|in|dot|com)$/.test(w); });
      var hit = (whole && flat.indexOf(whole) >= 0) || (words.length > 0 && words.every(function (w) { return hay.indexOf(w) >= 0 || flat.indexOf(w.replace(/[^a-z0-9]+/g, "")) >= 0; }));
      if (!hit) return false;
    }
    return true;
  }
  /* bundle the ilovedogs names into one row wherever two or more show */
  function bundleDogs(list) {
    var isDog = function (r) { return /^ilovedogs\./.test(r.h) && r.h !== "ilovedogs.dog"; };
    var dogs = list.filter(isDog);
    if (dogs.length < 2) return list;
    var first = list.indexOf(dogs[0]);
    var rest = list.filter(function (r) { return !isDog(r); });
    rest.splice(Math.min(first, rest.length), 0, { h: "ilovedogs (" + dogs.length + " more names)", dogs: dogs, c: "Dogs", e: "." + dogs[0].h.split(".").pop(), s: dogs[0].s, n: dogs[0].n, sale: "free",
      m: dogs.some(function (d) { return d.m === "Live"; }) ? "Live" : "Parked",
      p: "Free signal bands so every dog lover knows whether a dog wants to say hello. We will not let these names go to waste." });
    return rest;
  }
  function groups() {
    var r = all.filter(pass);
    if (st.sort === "cool") return [{ rows: bundleDogs(r) }];
    if (st.sort === "az") return [{ rows: bundleDogs(r.slice().sort(function (a, b) { return cmp(a.h, b.h); })) }];
    var key = st.sort === "end" ? "e" : st.sort === "sale" ? "sale" : "c", g = {}, order = [];
    r.forEach(function (x) { var k = x[key]; if (!g[k]) { g[k] = []; order.push(k); } g[k].push(x); });
    if (key === "sale") order.sort(function (a, b) { return SALE.map(function (x) { return x[0]; }).indexOf(a) - SALE.map(function (x) { return x[0]; }).indexOf(b); });
    else order.sort(function (a, b) { return g[b].length - g[a].length || cmp(a, b); });
    return order.map(function (k) { return { head: (key === "sale" ? SALEN[k] : k) + " (" + g[k].length + ")", rows: bundleDogs(g[k]) }; });
  }
  function render() {
    if (!box) return;
    box.textContent = "";
    var shown = 0;
    groups().forEach(function (g) {
      if (!g.rows.length) return;
      if (g.head) box.appendChild(el("h4", { "class": "dl-head", text: g.head }));
      var ul = el("ul", { "class": "dl" });
      g.rows.forEach(function (r) {
        shown += r.dogs ? r.dogs.length : 1;
        var li = el("li", { "class": "dl-row" });
        li.appendChild(el("span", { "class": "dl-n", title: "Rank by coolness", text: "#" + r.n }));
        var d = el("span", { "class": "dl-d" });
        if (r.dogs) {
          var det = el("details", { "class": "dogs" }); det.appendChild(el("summary", { text: r.h }));
          var dl = el("ul", { "class": "dogl" });
          r.dogs.forEach(function (x) { var i2 = el("li"); if (x.u) i2.appendChild(ext(x.u, x.h)); else i2.textContent = x.h; dl.appendChild(i2); });
          det.appendChild(dl);
          det.appendChild(el("p", { "class": "dognote", text: "Want to make a case for owning one of these? We love dogs, and we are happy to partner with people who do too." }));
          d.appendChild(det);
        } else if (r.u) d.appendChild(ext(r.u, r.h)); else d.textContent = r.h;
        li.appendChild(d);
        li.appendChild(el("span", { "class": "dl-m " + (r.m === "Live" ? "live" : r.m === "HMR family" ? "fam" : "wip"), text: STAGE[r.m] || r.m }));
        if (r.sale) li.appendChild(el("span", { "class": "dl-s s-" + r.sale, text: SALEN[r.sale] }));
        var meta = r.c + (r.s ? " · cool score " + r.s : "");
        li.appendChild(el("span", { "class": "dl-p" }, [el("span", { "class": "dl-c", text: meta + ". " }), el("b", { "class": "dl-plan", text: "The plan: " }), document.createTextNode(r.p)]));
        var vh = el("div", { "class": "dl-v" });
        vh.appendChild(voiceToggle(r.dogs ? "ilovedogs.dog" : r.h, vh));
        li.appendChild(vh);
        ul.appendChild(li);
      });
      box.appendChild(ul);
    });
    if (!shown) box.appendChild(el("p", { "class": "small", text: st.q ? "No names match \u201c" + st.q + "\u201d. Try one word, like grandma, dogs or ai, or press Clear." : "No names match. Try fewer filters." }));
    var sum = document.getElementById("list-sum");
    if (sum) {
      var rated = all.filter(function (r) { return r.s; }).length, live = all.filter(function (r) { return r.u; }).length;
      sum.textContent = "Showing " + shown + " of " + all.length + " names we own. " + live + " have a page you can open now. Coolest first puts the " + rated + " names we have scored at the top (10 is the coolest); the rest follow, best ideas first.";
    }
  }
  function buildList(data) {
    var n = 0, dogN = 0;
    // Every name we own, flagships included, so the sale-status buttons cover all of them.
    all = (data.domains || []).map(function (r) {
      r.e = ending(r.h);
      if (/^ilovedogs\./.test(r.h) && r.h !== "ilovedogs.dog") { if (!dogN) dogN = ++n; r.n = dogN; } else r.n = ++n;
      return r;
    });
    buildControls();
    render();
  }
  var held = document.getElementById("held");
  if (held) held.textContent = "Held for now, on the back burner: " + HELD.join(", ") + ".";
  function setSort(k) {
    st.sort = k; var s = document.getElementById("dsort"); if (s) s.value = k; render();
  }
  /* ---------- favorites ---------- */
  var fav = document.getElementById("fav");
  function chips(list, db) {
    var ul = el("ul", { "class": "chips" });
    list.forEach(function (h) {
      var li = el("li"), live = liveSet[h];
      if (live) li.appendChild(ext("https://" + h + "/", h)); else { li.appendChild(el("span", { text: h })); li.appendChild(el("small", { text: " in progress" })); }
      ul.appendChild(li);
    });
    return ul;
  }
  function favorites(db) {
    if (!fav) return;
    fav.appendChild(el("h3", { text: "Our favorites" }));
    fav.appendChild(chips(TOP, db));
    fav.appendChild(el("h4", { "class": "fav-h", text: "AI at work" }));
    fav.appendChild(chips(AI, db));
    var more = el("p", { "class": "small" });
    var all = el("button", { type: "button", "class": "linkbtn", text: "See every .ing name" });
    all.addEventListener("click", function () {
      setSort("end");
      var hs = box.querySelectorAll(".dl-head"), i;
      for (i = 0; i < hs.length; i++) if (hs[i].textContent.indexOf(".ing (") === 0) { hs[i].scrollIntoView(); break; }
    });
    more.appendChild(all);
    more.appendChild(document.createTextNode(". Our website-building names double as niche agent sites, for example aiplumber.tech."));
    fav.appendChild(more);
    var cd = el("div", { "class": "charity" });
    cd.appendChild(el("h4", { "class": "fav-h", text: "The .charity names" }));
    cd.appendChild(el("p", { text: "Have a real need for one of these? Tell us what you would use it for, and we will consider giving it to you free." }));
    var sel = el("select", { id: "ch-sel" });
    sel.appendChild(el("option", { value: "", text: "Choose a .charity name" }));
    var chs = Object.keys(db.sites).filter(function (h) { return /\.charity$/.test(h); }).sort();
    chs.forEach(function (h) { sel.appendChild(el("option", { value: h, text: h })); });
    var out = el("p", { "class": "ch-out", "aria-live": "polite" });
    sel.addEventListener("change", function () {
      out.textContent = "";
      var h = sel.value; if (!h) return;
      out.appendChild(el("b", { text: db.sites[h].t + ": " }));
      out.appendChild(document.createTextNode(db.sites[h].p + " "));
      if (liveSet[h]) out.appendChild(ext("https://" + h + "/", "Visit " + h));
    });
    cd.appendChild(el("label", { "for": "ch-sel", text: "Every .charity name" }));
    cd.appendChild(sel);
    cd.appendChild(out);
    cd.appendChild(el("p", {}, [ext("https://discord.gg/gEnC8TpNc", "Tell us on Discord", "btn")]));
    cd.appendChild(el("p", { "class": "ch-give", text: "Consider donating to us, or to the site that inspires us:" }));
    cd.appendChild(el("p", {}, [el("button", { type: "button", "class": "btn", "data-wiki": "1", text: "Have you heard of Wikipedia?" })]));
    fav.appendChild(cd);
  }


  /* "Have you heard of Wikipedia?": the same message as claudebomb.com/wikipedia/, shown in place each time it is pressed. */
  function wikiDialog() {
    var dg = document.getElementById("wiki-dlg");
    if (!dg) {
      dg = el("dialog", { id: "wiki-dlg", "class": "wiki-dlg", "aria-labelledby": "wiki-h" });
      dg.appendChild(el("h3", { id: "wiki-h", text: "Have you heard of Wikipedia?" }));
      dg.appendChild(el("p", { text: "We think Wikipedia is a better version of us. It inspires us. Its work has added a huge amount to humanity's productivity, and it has kept all of it free. We have never had to pay to read it, never had to hand anything over, and never seen an ad on it. It's great, and we have been taking part." }));
      var tb = el("table", { "class": "wiki-t" }), rows = [["Year", "Gifts", "Total"], ["2021", "5 gifts of $4.50 (August to December)", "$22.50"], ["2022", "10 gifts of $4.50", "$45.00"], ["2023", "12 gifts of $4.50", "$54.00"], ["2024", "12 gifts of $4.50", "$54.00"], ["2025", "12 gifts of $4.50", "$54.00"], ["Since 2021", "51 monthly gifts", "$229.50"]];
      rows.forEach(function (r, i) { var tr = el("tr"); r.forEach(function (c) { tr.appendChild(el(i ? "td" : "th", { text: c })); }); tb.appendChild(tr); });
      dg.appendChild(tb);
      dg.appendChild(el("p", { "class": "small", text: "From the yearly donation records the Wikimedia Foundation sent us for 2021 to 2025. Amounts in US dollars." }));
      dg.appendChild(el("h4", { text: "Our ask" }));
      dg.appendChild(el("p", { text: "If you're not already donating to Wikipedia, please donate to one of us." }));
      dg.appendChild(el("p", { "class": "wiki-b" }, [ext("https://donate.wikimedia.org/", "Donate to Wikipedia", "btn"), document.createTextNode(" "), ext("https://claudebomb.com/donate/", "Donate to us", "btn")]));
      dg.appendChild(el("p", { "class": "small", text: "Giving to us is not open yet. Until it is, Wikipedia is a great choice." }));
      var cl = el("button", { type: "button", "class": "btn", text: "Close" }); cl.addEventListener("click", function () { dg.close(); });
      dg.appendChild(el("p", {}, [cl]));
      dg.addEventListener("click", function (e) { if (e.target === dg) dg.close(); });
      var cs = el("style", { text: ".wiki-dlg{max-width:min(36rem,calc(100vw - 2rem));width:100%;border:2px solid currentColor;border-radius:14px;padding:1.1rem 1.1rem .6rem;max-height:85vh;overflow:auto}.wiki-dlg::backdrop{background:rgba(0,0,0,.45)}.wiki-t{width:100%;border-collapse:collapse;font-size:.92rem;margin:.4rem 0}.wiki-t th,.wiki-t td{text-align:left;padding:.3rem .4rem;border-bottom:1px solid rgba(0,0,0,.15)}.wiki-t tr:last-child td{font-weight:800}.wiki-b .btn{margin:.2rem .3rem .2rem 0}" });
      document.head.appendChild(cs);
      document.body.appendChild(dg);
    }
    if (dg.showModal) dg.showModal(); else location.href = "https://claudebomb.com/wikipedia/";
  }
  document.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest("[data-wiki]"); if (b) { e.preventDefault(); wikiDialog(); } });
  var x = new XMLHttpRequest();
  x.open("GET", "x/sites.json");
  x.onload = function () {
    var db; try { db = JSON.parse(x.responseText); } catch (e) { return; }
    (db.live || []).forEach(function (h) { liveSet[h] = 1; });
    favorites(db);
  };
  x.send();
  var y = new XMLHttpRequest();
  y.open("GET", "x/domains.json?v=20261126w");
  y.onload = function () { var d; try { d = JSON.parse(y.responseText); } catch (e) { return; } buildList(d); };
  y.send();
})();
