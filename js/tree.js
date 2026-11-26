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
  var PERSONALDASH = { host: "personaldash.life", url: "https://personaldash.life", status: "Live", tag: "Flagship",
    text: "Your helping hand into the blossoming world of AI. A free personal dashboard and AI introduction kit in one piece of text." };
  var CLAUDEBOMB = { host: "claudebomb.com", url: "https://claudebomb.com", tour: "claudebomb", status: "Live", tag: "Flagship",
    text: "The prompt bank for every AI model, not just Claude. Free forever, with no ads." };
  var PRODUCTS = [
    { name: "Personal dash", state: "Available now", text: "Free forever. Copy it, paste it into your AI assistant, and start today.", on: true },
    { name: "Work dash", state: "The future, V2", text: "Planned for mid to late 2027. The personal dash paves the way. Not built yet.", on: false }
  ];
  var ENDGAME = { host: "endgame.life", url: "https://endgame.life", tour: "endgame", status: "In progress", tag: "The vision",
    text: "Where the dashboards lead once both exist: a picture of life around 2036, with personal AI that works for you." };
  var MEMBERS = [
    { host: "hmrphysics.life", url: "https://hmrphysics.life", tour: "physics", status: "Live", tag: "Physics", text: "HMR keeps every equation physics has confirmed and reads them in a new framework. Every claim is labeled as established, HMR's view, or open." },
    { host: "hmrmath.life", url: "https://hmrmath.life", tour: "math", status: "In progress", tag: "Mathematics", text: "Why the universe obeys equations, in HMR's account." },
    { host: "hmrscience.life", url: "https://hmrscience.life", tour: "science", status: "Live", tag: "Science", text: "The sciences beyond math and physics: where HMR hooks into them, and a chain of claims you can inspect." },
    { host: "hmrfascia.life", url: null, status: "In progress", tag: "The body", text: "The body as a biotensegrity, with connective tissue first." },
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
      b.setAttribute("data-hmr-card", "tour-" + s.tour);
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
    fam.appendChild(el("p", { "class": "lvl", text: "The two flagships" }));
    var prods = el("div", { "class": "prods" });
    PRODUCTS.forEach(function (p) {
      prods.appendChild(el("div", { "class": "prod" + (p.on ? " on" : "") }, [
        el("span", { "class": "pill " + (p.on ? "live" : "wip"), text: p.state }),
        el("h4", { text: p.name }), el("p", { text: p.text })
      ]));
    });
    fam.appendChild(el("div", { "class": "flags" }, [card(PERSONALDASH, "flag", [prods]), card(CLAUDEBOMB, "flag")]));
    fam.appendChild(el("p", { "class": "then", "aria-hidden": "true", text: "after both, the vision" }));
    fam.appendChild(card(ENDGAME, "vision"));
    fam.appendChild(el("p", { "class": "lvl", text: "The family" }));
    var g = el("div", { "class": "fgrid" });
    MEMBERS.forEach(function (m) { g.appendChild(card(m)); });
    fam.appendChild(g);
  }

  /* footer links: every linked family site */
  var foot = document.getElementById("footlinks");
  if (foot) {
    [{ host: "hmrfamily.life", url: "https://hmrfamily.life/" }, PERSONALDASH, CLAUDEBOMB, ENDGAME].concat(MEMBERS).forEach(function (s) {
      if (!s.url) return;
      var li = el("li"); li.appendChild(s.host === "hmrfamily.life" ? el("a", { href: s.url, text: s.host }) : ext(s.url, s.host)); foot.appendChild(li);
    });
  }

  /* ---------- the domain list (data: x/domains.json, every name we own) ---------- */
  var HELD = ["hmruniverse.life", "hmrfunsies.fun"];
  var TOP = ["underthebed.monster", "overreact.ing", "dragonrid.ing", "elevat.ing", "fennsma.sh", "cosmicjoke.lol", "delulu.monster", "doomscroll.monster", "cosmicru.sh", "createjoy.art", "ilovedogs.dog"];
  var AI = ["aihir.ing", "aiautomat.ing", "aiintern.tech", "aiplann.ing", "aiphotoedit.ing", "aiquot.ing", "aitranslat.ing", "aivideoedit.ing", "aivoiceact.ing"];
  var liveSet = {};
  function ending(h) { return "." + h.split(".").pop(); }
  function cmp(a, b) { return a < b ? -1 : a > b ? 1 : 0; }
  var all = [], st = { sort: "cool", q: "", cat: "", end: "", mark: "" };
  var box = document.getElementById("dlist");
  var ctl = document.getElementById("dfilters");

  function option(sel, v, t) { sel.appendChild(el("option", { value: v, text: t })); }
  function counted(key) {
    var c = {}; all.forEach(function (r) { c[r[key]] = (c[r[key]] || 0) + 1; }); return c;
  }
  function buildControls() {
    if (!ctl) return;
    ctl.textContent = "";
    var q = el("input", { type: "search", id: "dq", placeholder: "Search names and ideas", "aria-label": "Search names and ideas", autocomplete: "off" });
    q.addEventListener("input", function () { st.q = q.value.trim().toLowerCase(); render(); });
    ctl.appendChild(el("label", { "class": "df-q", "for": "dq" }, [el("span", { text: "Search" }), q]));
    function pick(id, label, key, opts) {
      var s = el("select", { id: id });
      opts.forEach(function (o) { option(s, o[0], o[1]); });
      s.addEventListener("change", function () { st[key] = s.value; render(); });
      ctl.appendChild(el("label", { "for": id }, [el("span", { text: label }), s]));
    }
    pick("dsort", "Order", "sort", [["cool", "Coolest first"], ["az", "A to Z"], ["cat", "Grouped by category"], ["end", "Grouped by ending"]]);
    var cc = counted("c"), cats = Object.keys(cc).sort(function (a, b) { return cc[b] - cc[a] || cmp(a, b); });
    pick("dcat", "Category", "cat", [["", "All categories (" + all.length + ")"]].concat(cats.map(function (k) { return [k, k + " (" + cc[k] + ")"]; })));
    var ec = counted("e"), ends = Object.keys(ec).sort(function (a, b) { return ec[b] - ec[a] || cmp(a, b); });
    pick("dend", "Ending", "end", [["", "All endings"]].concat(ends.map(function (k) { return [k, k + " (" + ec[k] + ")"]; })));
    var mc = counted("m");
    pick("dmark", "Status", "mark", [["", "Any status"]].concat(["HMR family", "Live", "Parked"].filter(function (k) { return mc[k]; }).map(function (k) { return [k, k + " (" + mc[k] + ")"]; })));
    var reset = el("button", { type: "button", "class": "sbtn", text: "Clear" });
    reset.addEventListener("click", function () {
      st = { sort: "cool", q: "", cat: "", end: "", mark: "" };
      q.value = ""; ["dsort", "dcat", "dend", "dmark"].forEach(function (id) { var s = document.getElementById(id); s.selectedIndex = 0; });
      render();
    });
    ctl.appendChild(reset);
  }
  function pass(r) {
    if (st.cat && r.c !== st.cat) return false;
    if (st.end && r.e !== st.end) return false;
    if (st.mark && r.m !== st.mark) return false;
    if (st.q && (r.h + " " + r.p + " " + r.c).toLowerCase().indexOf(st.q) < 0) return false;
    return true;
  }
  /* bundle the ilovedogs names into one row wherever two or more show */
  function bundleDogs(list) {
    var dogs = list.filter(function (r) { return /^ilovedogs\./.test(r.h); });
    if (dogs.length < 2) return list;
    var first = list.indexOf(dogs[0]);
    var rest = list.filter(function (r) { return !/^ilovedogs\./.test(r.h); });
    rest.splice(Math.min(first, rest.length), 0, { h: "ilovedogs (" + dogs.length + " names)", dogs: dogs, c: "Dogs", e: ".dog", s: dogs[0].s, n: dogs[0].n,
      m: dogs.some(function (d) { return d.m === "Live"; }) ? "Live" : "Parked",
      p: "Free signal bands so every dog lover knows whether a dog wants to say hello. We will not let these names go to waste." });
    return rest;
  }
  function groups() {
    var r = all.filter(pass);
    if (st.sort === "cool") return [{ rows: bundleDogs(r) }];
    if (st.sort === "az") return [{ rows: bundleDogs(r.slice().sort(function (a, b) { return cmp(a.h, b.h); })) }];
    var key = st.sort === "end" ? "e" : "c", g = {}, order = [];
    r.forEach(function (x) { var k = x[key]; if (!g[k]) { g[k] = []; order.push(k); } g[k].push(x); });
    order.sort(function (a, b) { return g[b].length - g[a].length || cmp(a, b); });
    return order.map(function (k) { return { head: k + " (" + g[k].length + ")", rows: bundleDogs(g[k]) }; });
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
        li.appendChild(el("span", { "class": "dl-m " + (r.m === "Live" ? "live" : r.m === "HMR family" ? "fam" : "wip"), text: r.m }));
        var meta = r.c + (r.s ? " · cool score " + r.s : "");
        li.appendChild(el("span", { "class": "dl-p" }, [el("span", { "class": "dl-c", text: meta + ". " }), document.createTextNode(r.p)]));
        ul.appendChild(li);
      });
      box.appendChild(ul);
    });
    if (!shown) box.appendChild(el("p", { "class": "small", text: "No names match. Try fewer filters." }));
    var sum = document.getElementById("list-sum");
    if (sum) {
      var rated = all.filter(function (r) { return r.s; }).length, live = all.filter(function (r) { return r.u; }).length;
      sum.textContent = "Showing " + shown + " of " + all.length + " names. " + live + " have a site you can open now. Coolest first puts the " + rated + " names we have scored at the top (10 is the coolest); the rest follow, best ideas first.";
    }
  }
  function buildList(data) {
    var n = 0, dogN = 0;
    all = (data.domains || []).map(function (r) {
      r.e = ending(r.h);
      if (/^ilovedogs\./.test(r.h)) { if (!dogN) dogN = ++n; r.n = dogN; } else r.n = ++n;
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
    fav.appendChild(cd);
  }

  var x = new XMLHttpRequest();
  x.open("GET", "x/sites.json");
  x.onload = function () {
    var db; try { db = JSON.parse(x.responseText); } catch (e) { return; }
    (db.live || []).forEach(function (h) { liveSet[h] = 1; });
    favorites(db);
  };
  x.send();
  var y = new XMLHttpRequest();
  y.open("GET", "x/domains.json?v=20261126");
  y.onload = function () { var d; try { d = JSON.parse(y.responseText); } catch (e) { return; } buildList(d); };
  y.send();
})();
