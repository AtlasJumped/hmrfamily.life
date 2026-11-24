(function () {
  "use strict";
  // The HMR family: always free, forever. Each branch lists the sites that grow from it.
  var TREE = [
    { host: "universemodel.ai", note: "Flagship: the Holistic Model of Reality", kids: [
      { host: "hmruniverse.life", note: "The universe" },
      { host: "hmrphysics.life", note: "Physics" },
      { host: "hmrmath.life", note: "Mathematics" },
      { host: "chronomath.ai", note: "Mathematics, in progress" },
      { host: "hmrscience.life", note: "Science" },
      { host: "hmrfascia.life", note: "The body and fascia" },
      { host: "hmrlanguage.life", note: "Language" },
      { host: "universemodel.life", note: "Living by the model", soon: true }
    ] },
    { host: "claudebomb.com", note: "Flagship product: your helping hand into AI", kids: [
      { host: "personaldash.life", note: "The personal dashboard" },
      { host: "workdash.life", note: "The work dashboard" }
    ] },
    { host: "reactionapp.life", note: "Record your reactions and share them with friends" },
    { host: "endgame.life", note: "Our vision of life around 2036" },
    { host: "hmrfunsies.fun", note: "Toys and games, made for joy", kids: [
      { host: "funsies.fun", note: "The short way in" }
    ] },
    { host: "hmrfamily.life", note: "This page: the home of the family" }
  ];
  var GROUPS = [
    ["biz", "Business ideas"], ["build", "Website building"], ["show", "Live shows"],
    ["fun", "Fun and games"], ["mind", "Ideas"], ["hmr", "Holistic Model of Reality"],
    ["charity", "Giving and trust"], ["loan", "Lending education"], ["beer", "Brewing"], ["dogs", "Dogs"]
  ];
  function el(tag, attrs, kids) {
    var e = document.createElement(tag), k;
    for (k in (attrs || {})) { if (k === "text") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); }
    (kids || []).forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }
  function node(s, top) {
    var li = el("li", { "class": top ? "root" : "" });
    var a = el("a", { href: "https://" + s.host + "/", rel: "noopener", "class": "node" });
    a.appendChild(el("span", { "class": "star", "aria-hidden": "true", text: "★" }));
    a.appendChild(el("b", { text: s.host }));
    a.appendChild(el("span", { "class": "nt", text: s.note + (s.soon ? " (coming soon)" : "") }));
    li.appendChild(a);
    if (s.kids) { var ul = el("ul"); s.kids.forEach(function (k) { ul.appendChild(node(k)); }); li.appendChild(ul); }
    return li;
  }
  var tree = document.getElementById("tree");
  if (tree) { var ul = el("ul", { "class": "tree-root" }); TREE.forEach(function (s) { ul.appendChild(node(s, true)); }); tree.appendChild(ul); }

  var u5 = document.getElementById("under5");
  if (u5) u5.textContent = "More than 30 of ours cost under $5 each for the first year.";

  var exp = document.getElementById("exp");
  if (!exp) return;
  var x = new XMLHttpRequest();
  x.open("GET", "x/sites.json");
  x.onload = function () {
    var db; try { db = JSON.parse(x.responseText); } catch (e) { return; }
    var by = {};
    Object.keys(db.sites).sort().forEach(function (h) { var s = db.sites[h]; (by[s.k] = by[s.k] || []).push([h, s]); });
    var count = 0;
    GROUPS.forEach(function (g) {
      var list = by[g[0]]; if (!list) return;
      var det = el("details", { "class": "grp" });
      det.appendChild(el("summary", { text: g[1] + " (" + list.length + ")" }));
      var ul = el("ul", { "class": "chips" });
      list.forEach(function (p) {
        count++;
        var li = el("li");
        li.appendChild(el("a", { href: "https://" + p[0] + "/", rel: "noopener", title: p[1].p, text: p[0] }));
        ul.appendChild(li);
      });
      det.appendChild(ul); exp.appendChild(det);
    });
    exp.insertBefore(el("p", { "class": "small", text: count + " experiment sites. Open a group to see them. New sites go live over the next few days." }), exp.firstChild);
  };
  x.send();
})();
