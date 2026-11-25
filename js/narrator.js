/* Shared narrator: picks the best English voice, chunks text, remembers the choice. */
(function (root) {
  "use strict";
  var synth = root.speechSynthesis, can = !!(synth && root.SpeechSynthesisUtterance);
  var KEY = "hmrNarratorVoice";
  var PREFS = [/natural/i, /neural/i, /online/i, /google us english/i, /google uk english female/i, /samantha/i, /^ava\b/i, /allison/i, /serena/i, /karen/i, /daniel/i, /moira/i];
  var BAD = /compact|espeak|albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|kathy|ralph|princess/i;
  var cbs = [], list = [], chosen = null, token = 0, keep = null;
  function ls(get, v) {
    try { if (get) return root.localStorage.getItem(KEY); root.localStorage.setItem(KEY, v); } catch (e) {}
    return null;
  }
  function score(v) {
    for (var i = 0; i < PREFS.length; i++) if (PREFS[i].test(v.name)) return i;
    return 99;
  }
  function refresh() {
    if (!can) return;
    var all = [];
    try { all = synth.getVoices() || []; } catch (e) {}
    var en = all.filter(function (v) { return /^en([-_]|$)/i.test(v.lang || "") && !BAD.test(v.name); });
    var good = en.filter(function (v) { return score(v) < 99; });
    good.sort(function (a, b) { return score(a) - score(b); });
    var out = good.slice(0, 6);
    if (!out.length) out = en.filter(function (v) { return /^en[-_]US/i.test(v.lang); }).concat(en).slice(0, 3);
    list = out;
    var saved = ls(true), pick = null;
    list.forEach(function (v) { if (v.name === saved) pick = v; });
    chosen = pick || list[0] || null;
    cbs.forEach(function (f) { try { f(list, chosen); } catch (e) {} });
  }
  function onChange(f) { cbs.push(f); if (list.length) f(list, chosen); }
  if (can) {
    refresh();
    try { synth.addEventListener("voiceschanged", refresh); } catch (e) { synth.onvoiceschanged = refresh; }
  }
  function setVoice(name) {
    list.forEach(function (v) { if (v.name === name) chosen = v; });
    ls(false, name);
  }
  function chunks(text) {
    var parts = String(text).replace(/\s+/g, " ").trim().match(/[^.!?]+[.!?]*\s*/g) || [text], out = [], cur = "";
    parts.forEach(function (p) {
      if ((cur + p).length > 160 && cur) { out.push(cur.trim()); cur = p; } else cur += p;
    });
    if (cur.trim()) out.push(cur.trim());
    return out;
  }
  function stopKeep() { clearInterval(keep); keep = null; }
  function cancel() { token++; stopKeep(); if (can) try { synth.cancel(); } catch (e) {} }
  /* speak(text, {rate, onend, onerror}); returns false when speech is unavailable */
  function speak(text, o) {
    o = o || {};
    if (!can) return false;
    cancel();
    var my = token, parts = chunks(text), i = 0;
    keep = setInterval(function () { try { if (synth.speaking) synth.resume(); } catch (e) {} }, 8000);
    function next() {
      if (my !== token) return;
      if (i >= parts.length) { stopKeep(); if (o.onend) o.onend(); return; }
      var u = new root.SpeechSynthesisUtterance(parts[i++]);
      if (chosen) { u.voice = chosen; u.lang = chosen.lang; } else u.lang = "en-US";
      u.rate = o.rate || 0.98; u.pitch = 1;
      u.onend = next;
      u.onerror = function (e) {
        if (my !== token) return;
        if (e && (e.error === "canceled" || e.error === "interrupted")) return;
        stopKeep(); if (o.onerror) o.onerror(e);
      };
      try { synth.speak(u); } catch (e2) { stopKeep(); if (o.onerror) o.onerror(e2); }
    }
    next();
    return true;
  }
  /* fill a <select> with "Voice: name" options and wire it up */
  function bindSelect(sel) {
    onChange(function (vs, cur) {
      sel.textContent = "";
      vs.forEach(function (v) {
        var op = root.document.createElement("option");
        op.value = v.name; op.textContent = "Voice: " + v.name.replace(/^(Microsoft|Google)\s+/i, "$1 ");
        if (cur && cur.name === v.name) op.selected = true;
        sel.appendChild(op);
      });
      sel.hidden = vs.length < 2;
    });
    sel.addEventListener("change", function () { setVoice(sel.value); });
  }
  root.HMRNarrator = { can: can, speak: speak, cancel: cancel, bindSelect: bindSelect, setVoice: setVoice, onChange: onChange, chunks: chunks };
})(window);
