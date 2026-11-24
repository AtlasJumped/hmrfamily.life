(function () {
  "use strict";
  function el(tag, attrs, kids) {
    var e = document.createElement(tag), k;
    for (k in (attrs || {})) { if (k === "text") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); }
    (kids || []).forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }
  function ext(href, text, cls) { return el("a", { href: href, target: "_blank", rel: "noopener", "class": cls || "", text: text }); }

  /* ---------- the family, as cards ---------- */
  // url: null means shown without a link until the site is secure.
  var CLAUDEBOMB = { host: "claudebomb.com", url: "https://claudebomb.com", tour: "claudebomb", status: "Live", tag: "Flagship",
    text: "Your helping hand into the blossoming world of artificial intelligence. A dashboard and an AI introduction kit in one piece of free text." };
  var PRODUCTS = [
    { name: "Personal dash", state: "Available now", text: "Free forever. Copy it, paste it into your AI assistant, and start today.", on: true },
    { name: "Work dash", state: "The future, V2", text: "Planned for early 2027. The personal dash paves the way. Not built yet.", on: false }
  ];
  var ENDGAME = { host: "endgame.life", url: "https://endgame.life", tour: "endgame", status: "In progress", tag: "The vision",
    text: "Where claudebomb leads once both dashboards exist: a picture of life around 2036, with personal AI that works for you." };
  var SOUL = { host: "universemodel.life", url: "https://universemodel.ai", tour: "universemodel", status: "Live", tag: "The soul of HMR",
    text: "The Holistic Model of Reality: one picture of reality that joins Eastern and Western thought, sees the body as a tensegrity with fascia, includes a set of values, and ties its claims to tests." };
  var MEMBERS = [
    { host: "hmrphysics.life", url: "https://hmrphysics.life", tour: "physics", status: "Live", tag: "Physics", text: "HMR keeps every equation physics has confirmed and reads them in a new framework. Every claim is labeled as established, HMR's view, or open." },
    { host: "hmrmath.life", url: "https://hmrmath.life", tour: "math", status: "In progress", tag: "Mathematics", text: "Why the universe obeys equations, in HMR's account." },
    { host: "hmrscience.life", url: "https://hmrscience.life", tour: "science", status: "Live", tag: "Science", text: "The sciences beyond math and physics: where HMR hooks into them, and a chain of claims you can inspect." },
    { host: "hmrfascia.life", url: null, status: "In progress", tag: "The body", text: "The body as a tensegrity, with fascia first." },
    { host: "hmrlanguage.life", url: null, status: "In progress", tag: "Language", text: "Language, seen from the whole." },
    { host: "reactionapp.life", url: "https://reactionapp.life", tour: "reaction", status: "In progress", tag: "Reactions", text: "Record your reactions while you watch, keep the best moments, and share them with friends." },
    { host: "funsies.fun", url: "https://funsies.fun", tour: "funsies", status: "Live", tag: "Joy", text: "Toys and games, made for joy. Everything here exists to have fun." }
  ];
  function pill(s) { return el("span", { "class": "pill " + (s === "In progress" ? "wip" : "live"), text: s }); }
  function card(s, cls, kids) {
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
      b.addEventListener("click", function () { window.hmrOpenTour(s.tour, b); });
      act.appendChild(b);
    }
    if (s.url) { var v = ext(s.url, "Visit", "btn"); v.setAttribute("aria-label", "Visit " + s.host + " (opens in a new tab)"); act.appendChild(v); }
    else act.appendChild(el("span", { "class": "fc-soon", text: "Not linked yet" }));
    c.appendChild(act);
    return c;
  }
  var fam = document.getElementById("fam");
  if (fam) {
    fam.appendChild(el("div", { "class": "hub" }, [
      el("span", { "class": "star", "aria-hidden": "true", text: "★" }),
      el("b", { text: "hmrfamily.life" }),
      el("span", { text: "The hub. You are here." })
    ]));
    fam.appendChild(el("p", { "class": "lvl", text: "The flagship" }));
    var prods = el("div", { "class": "prods" });
    PRODUCTS.forEach(function (p) {
      prods.appendChild(el("div", { "class": "prod" + (p.on ? " on" : "") }, [
        el("span", { "class": "pill " + (p.on ? "live" : "wip"), text: p.state }),
        el("h4", { text: p.name }), el("p", { text: p.text })
      ]));
    });
    fam.appendChild(card(CLAUDEBOMB, "flag", [prods]));
    fam.appendChild(el("p", { "class": "then", "aria-hidden": "true", text: "after both, the vision" }));
    fam.appendChild(card(ENDGAME, "vision"));
    fam.appendChild(el("p", { "class": "lvl", text: "The soul of HMR" }));
    fam.appendChild(card(SOUL, "soul"));
    fam.appendChild(el("p", { "class": "lvl", text: "The family" }));
    var g = el("div", { "class": "fgrid" });
    MEMBERS.forEach(function (m) { g.appendChild(card(m)); });
    fam.appendChild(g);
  }

  /* footer links: every linked family site */
  var foot = document.getElementById("footlinks");
  if (foot) {
    [{ host: "hmrfamily.life", url: "https://hmrfamily.life/" }, CLAUDEBOMB, ENDGAME, SOUL].concat(MEMBERS).forEach(function (s) {
      if (!s.url) return;
      var li = el("li"); li.appendChild(s.host === "hmrfamily.life" ? el("a", { href: s.url, text: s.host }) : ext(s.url, s.host)); foot.appendChild(li);
    });
  }

  /* ---------- the domain list ---------- */
  var FAMILY_ROWS = [
    ["hmrfamily.life", "https://hmrfamily.life/", "The hub of the HMR family of websites."],
    ["claudebomb.com", CLAUDEBOMB.url, "The flagship: personal dash now, work dash next."],
    ["endgame.life", ENDGAME.url, "The vision, after both dashboards."],
    ["universemodel.life", SOUL.url, "The soul of HMR."],
    ["hmrphysics.life", "https://hmrphysics.life/", "HMR physics."],
    ["hmrmath.life", "https://hmrmath.life/", "HMR mathematics."],
    ["hmrscience.life", "https://hmrscience.life/", "The sciences beyond math and physics."],
    ["hmrfascia.life", null, "The body and fascia."],
    ["hmrlanguage.life", null, "Language."],
    ["reactionapp.life", "https://reactionapp.life/", "Record and share your reactions."],
    ["funsies.fun", "https://funsies.fun/", "Toys and games, made for joy."],
    ["personaldash.life", null, "The personal dash, a claudebomb product."],
    ["workdash.life", null, "The work dash, the future V2 of claudebomb."]
  ];
  var HELD = ["hmruniverse.life", "chronomath.ai", "hmrfunsies.fun", "universemodel.ai"];
  var TOP = ["underthebed.monster", "overreact.ing", "dragonrid.ing", "elevat.ing", "fennsma.sh", "cosmicjoke.lol", "delulu.monster", "doomscroll.monster", "cosmicru.sh", "createjoy.art", "ilovedogs.dog"];
  var AI = ["aihir.ing", "aiautomat.ing", "aiintern.tech", "aiplann.ing", "aiphotoedit.ing", "aiquot.ing", "aitranslat.ing", "aivideoedit.ing", "aivoiceact.ing"];
  var CHARITY = ["honorable", "virtuous", "holy", "wonderful", "philanthropic", "goodguys", "crowdsource", "certified", "renegade", "corrupt", "notascam", "totallylegit", "definitelyreal", "trustme"].map(function (n) { return n + ".charity"; });
  var KIND_ORDER = ["fun", "mind", "hmr", "dogs", "show", "beer", "build", "biz", "loan"];
  var CATS = [
    ["fun", "Fun and games"], ["mind", "Ideas"], ["ing", "Ideas ending in .ing"], ["dogs", "Dogs"], ["charity", "Giving and trust"],
    ["biz", "Business ideas"], ["build", "Website building"], ["show", "Live shows"], ["beer", "Brewing"], ["hmr", "Holistic Model of Reality"], ["loan", "Lending education"], ["family", "The HMR family"]
  ];
  var CATNAME = {}; CATS.forEach(function (c) { CATNAME[c[0]] = c[1]; });
  function ending(h) { return "." + h.split(".").pop(); }
  function cmp(a, b) { return a < b ? -1 : a > b ? 1 : 0; }

  var rows = [], liveSet = {}, sortKey = "cool";
  function build(db) {
    (db.live || []).forEach(function (h) { liveSet[h] = 1; });
    rows = FAMILY_ROWS.map(function (f, i) {
      return { host: f[0], url: f[1], pitch: f[2], title: f[0], cat: "family", end: ending(f[0]), mark: "HMR family", rank: i, tier: -1 };
    });
    Object.keys(db.sites).forEach(function (h) {
      var s = db.sites[h];
      if (s.k === "hmr" && h === "universemodel.life") return;
      var isIng = /\.ing$/.test(h), cat = s.k;
      if (isIng && s.k === "biz" && h !== "aiautomat.ing") cat = "ing";
      var tier, sub;
      if (TOP.indexOf(h) > -1) { tier = 0; sub = TOP.indexOf(h); }
      else if (isIng && AI.indexOf(h) < 0) { tier = 1; sub = KIND_ORDER.indexOf(s.k) * 1000; }
      else if (/\.charity$/.test(h)) { tier = 2; sub = CHARITY.indexOf(h); }
      else if (AI.indexOf(h) > -1) { tier = 3; sub = AI.indexOf(h); }
      else { tier = 4; sub = KIND_ORDER.indexOf(s.k) * 1000; }
      var live = !!liveSet[h];
      rows.push({ host: h, url: live ? "https://" + h + "/" : null, pitch: s.p, title: s.t, cat: cat, end: ending(h),
        mark: live ? "Live" : "In progress", tier: tier, sub: sub });
    });
    var fam = rows.slice(0, FAMILY_ROWS.length), rest = rows.slice(FAMILY_ROWS.length);
    rest.sort(function (a, b) { return a.tier - b.tier || a.sub - b.sub || cmp(a.host, b.host); });
    rows = fam.concat(rest);
    rows.forEach(function (r, i) { r.n = i + 1; });
    render();
  }

  function sorted() {
    var r = rows.slice();
    if (sortKey === "cool") return [{ rows: r }];
    var key = sortKey === "end" ? "end" : "cat", groups = {}, order = [];
    r.forEach(function (x) { var k = x[key]; if (!groups[k]) { groups[k] = []; order.push(k); } groups[k].push(x); });
    if (sortKey === "end") order.sort(function (a, b) { return groups[b].length - groups[a].length || cmp(a, b); });
    else order.sort(function (a, b) { return CATS.map(function (c) { return c[0]; }).indexOf(a) - CATS.map(function (c) { return c[0]; }).indexOf(b); });
    return order.map(function (k) {
      groups[k].sort(function (a, b) { return cmp(a.host, b.host); });
      return { head: (sortKey === "end" ? k : CATNAME[k]) + " (" + groups[k].length + ")", rows: groups[k] };
    });
  }
  var box = document.getElementById("dlist");
  function render() {
    if (!box) return;
    box.textContent = "";
    sorted().forEach(function (g) {
      if (g.head) box.appendChild(el("h4", { "class": "dl-head", text: g.head }));
      var ul = el("ul", { "class": "dl" });
      g.rows.forEach(function (r) {
        var li = el("li", { "class": "dl-row" });
        li.appendChild(el("span", { "class": "dl-n", text: sortKey === "cool" ? String(r.n) : "" }));
        var d = el("span", { "class": "dl-d" });
        if (r.url) d.appendChild(ext(r.url, r.host)); else d.textContent = r.host;
        li.appendChild(d);
        li.appendChild(el("span", { "class": "dl-m " + (r.mark === "Live" ? "live" : r.mark === "HMR family" ? "fam" : "wip"), text: r.mark }));
        li.appendChild(el("span", { "class": "dl-p", text: r.pitch }));
        ul.appendChild(li);
      });
      box.appendChild(ul);
    });
    var sum = document.getElementById("list-sum");
    if (sum) {
      var live = rows.filter(function (r) { return r.mark === "Live"; }).length;
      sum.textContent = (rows.length - FAMILY_ROWS.length) + " names beyond the family. " + live + " are live and linked. The rest are in progress, with new sites going live over the next few days.";
    }
  }
  var SORTS = [["cool", "Coolness"], ["end", "By ending"], ["cat", "By category"]];
  var sb = document.getElementById("sortbtns");
  function setSort(k) {
    sortKey = k; render();
    Array.prototype.forEach.call(sb.children, function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-k") === k)); });
  }
  if (sb) SORTS.forEach(function (s) {
    var b = el("button", { type: "button", "class": "sbtn", "data-k": s[0], "aria-pressed": String(s[0] === sortKey), text: s[1] });
    b.addEventListener("click", function () { setSort(s[0]); });
    sb.appendChild(b);
  });
  var held = document.getElementById("held");
  if (held) held.textContent = "Held for now, on the back burner: " + HELD.join(", ") + ".";

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
    fav.appendChild(cd);
  }

  var x = new XMLHttpRequest();
  x.open("GET", "x/sites.json");
  x.onload = function () {
    var db; try { db = JSON.parse(x.responseText); } catch (e) { return; }
    build(db); favorites(db);
  };
  x.send();
})();
