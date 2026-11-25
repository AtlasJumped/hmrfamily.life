/* hmr-card.js v1: HMR Card player. No dependencies, one global (HMRCard). See README.md. */
(function () {
'use strict';
var W = window, D = document;
if (W.HMRCard) return;
var SRC = (D.currentScript && D.currentScript.src) || '';
var BASE = (SRC || D.baseURI || '').replace(/[?#].*$/, '').replace(/[^\/]*$/, '');
var BAN = 'Demo only. Nothing is sent.';
var T = { fast: 120, base: 240, slow: 480, cur: 600 };
var SYN = !!(W.speechSynthesis && W.SpeechSynthesisUtterance);
var SCREENS = {}, S = null, timers = [], rid = 0, cssDone = false;

var CSS = [
'.hc-ov{--hc-bg:#0a0a0a;--hc-surface:#1c1c1c;--hc-line:#3a3a3a;--hc-fg:#f5f5f5;--hc-mut:#c8c8c8;--hc-accent:#ff6a1a;--hc-on:#0a0a0a;--hc-fast:120ms;--hc-base:240ms;--hc-slow:480ms;--hc-cursor:600ms;--hc-ease:cubic-bezier(.2,.8,.2,1);position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:16px;background:rgba(0,0,0,.72);font:400 16px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:@F;animation:hc-fade var(--hc-base) var(--hc-ease)}',
'@media(prefers-color-scheme:light){.hc-ov{--hc-bg:#fff;--hc-surface:#f2f2f2;--hc-line:#8f8f8f;--hc-fg:#111;--hc-mut:#454545;--hc-accent:#b83c00;--hc-on:#fff}}',
'.hc-ov *{box-sizing:border-box;font-family:inherit;letter-spacing:0;text-transform:none}',
'.hc-ov [hidden]{display:none!important}',
'.hc-dlg{width:min(960px,calc(100vw - 32px));max-height:calc(100vh - 32px);max-height:calc(100dvh - 32px);overflow:auto;background:@B;border:1px solid @L;border-radius:12px;padding:16px;box-shadow:0 24px 80px rgba(0,0,0,.5)}',
'.hc-dlg:focus{outline:none}',
'.hc-hd{display:flex;gap:12px;align-items:flex-start;justify-content:space-between;margin-bottom:12px}',
'.hc-h{margin:0;font-size:20px;line-height:1.25;font-weight:700}',
'.hc-meta{margin:6px 0 0;display:flex;flex-wrap:wrap;gap:4px 12px;align-items:center;font-size:14px;color:@M}',
'.hc-ban{display:inline-block;padding:2px 10px;border:1px solid @A;border-radius:99px;color:@F;font-weight:600;font-size:13px}',
'.hc-b{min-height:44px;min-width:44px;padding:0 14px;display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid @L;border-radius:8px;background:@S;color:@F;font-size:14px;font-weight:600;cursor:pointer}',
'.hc-b:focus-visible{outline:3px solid @A;outline-offset:2px}',
'.hc-b[aria-pressed=true]{border-color:@A}',
'.hc-b:disabled{opacity:.45;cursor:default}',
'.hc-pri{background:@A;border-color:@A;color:@O}',
'.hc-x{font-size:24px;line-height:1;flex:none}',
'.hc-stage{position:relative;overflow:hidden;width:100%;aspect-ratio:16/9;background:@S;border:1px solid @L;border-radius:8px}',
'.hc-stage[data-f="4:5"]{aspect-ratio:4/5;max-width:520px;margin:0 auto}',
'.hc-stage[data-f="1:1"]{aspect-ratio:1;max-width:640px;margin:0 auto}',
'.hc-host{position:absolute;inset:0}',
'.hc-begin{position:absolute;inset:0;z-index:9;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;text-align:center;background:@B}',
'.hc-intro{margin:0;max-width:34em;font-size:17px}',
'.hc-err{margin:16px 0;padding:12px;border:1px solid @A;border-radius:8px}',
'.hc-cap{margin:12px 0 0;min-height:3em;font-size:17px;font-weight:600;line-height:1.5}',
'.hc-fd{animation:hc-fade var(--hc-base) var(--hc-ease)}',
'.hc-off{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}',
'.hc-ctl{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}',
'@keyframes hc-fade{from{opacity:0}}',
'@keyframes hc-ring{0%{opacity:1;transform:scale(.4)}100%{opacity:0;transform:scale(1.8)}}',
'.hc-cur{position:absolute;left:0;top:0;width:24px;height:24px;z-index:8;pointer-events:none;transition:transform var(--hc-cursor) var(--hc-ease);filter:drop-shadow(0 2px 2px rgba(0,0,0,.4))}',
'.hc-cur::after{content:"";position:absolute;left:-7px;top:-8px;width:20px;height:20px;border-radius:50%;border:3px solid @A;opacity:0}',
'.hc-pulse::after{animation:hc-ring var(--hc-slow) var(--hc-ease)}',
/* house screen: dashboard */
'.hc-scr{position:absolute;inset:0;display:flex;flex-direction:column;font-size:13px;line-height:1.4;color:@F;background:@S}',
'.hc-scr :focus-visible{outline:3px solid @F;outline-offset:2px}',
'.hc-mt{display:flex;flex-wrap:wrap;justify-content:space-between;gap:2px 10px;padding:8px 12px;border-bottom:1px solid @L;background:@B;color:@M}',
'.hc-mt b{color:@F}',
'.hc-demo{margin-left:6px;padding:0 8px;border:1px solid @A;border-radius:99px;font-size:11px;font-weight:700;color:@F}',
'.hc-tabs{display:flex;flex-wrap:wrap;gap:4px;padding:6px 10px;border-bottom:1px solid @L}',
'.hc-tab{min-height:32px;padding:0 12px;border-radius:99px;border:1px solid @L;background:@B;color:@F;font-size:12px;font-weight:600;cursor:pointer}',
'.hc-tab[aria-selected=true]{background:@A;border-color:@A;color:@O}',
'.hc-pane{flex:1;overflow:auto;padding:10px 14px}',
'.hc-pane h4{margin:0 0 8px;font-size:15px;line-height:1.2}',
'.hc-pane p{margin:0 0 8px;color:@M}',
'.hc-row{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:6px 0;border-top:1px solid @L}',
'.hc-row small{display:block;color:@M;font-size:12px}',
'.hc-mb{min-height:32px;padding:0 12px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:12px;font-weight:600;cursor:pointer}',
'.hc-mb.hc-g{background:transparent;color:@F}',
'.hc-hl{outline:3px solid @A;outline-offset:2px}',
'.hc-comp{margin-top:8px;padding:8px;border:1px solid @L;border-radius:10px;background:@B}',
'.hc-lab{margin:0 0 4px!important;font-weight:700;color:@F!important}',
'.hc-ta{display:block;width:100%;min-height:60px;border:1px solid @L;border-radius:8px;padding:6px 8px;background:@S;color:@F;font-size:13px;line-height:1.4;resize:none}',
'.hc-acts{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:6px}',
'.hc-send{margin-left:auto}',
'.hc-mic{display:inline-flex;align-items:center;gap:4px}',
'.hc-mic.on{background:#d92d3d;border-color:#d92d3d;color:#fff}',
'.hc-live{font-size:12px;color:@M;min-height:1.2em}',
'.hc-metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:6px;margin-bottom:8px}',
'.hc-metrics div{border:1px solid @L;border-radius:8px;padding:6px 8px;font-size:12px;color:@M}',
'.hc-metrics b{display:block;font-size:20px;line-height:1.1;color:@F}',
'.hc-cal{display:grid;gap:4px;margin:6px 0}',
'.hc-cal div{display:grid;grid-template-columns:64px repeat(4,1fr);gap:4px;align-items:center;font-size:12px;color:@M}',
'.hc-cal i{height:18px;border-radius:5px;background:@L;display:block}',
'.hc-cal i.f{background:@A}',
'.hc-cal i.b{background:repeating-linear-gradient(45deg,@L,@L 4px,@B 4px,@B 8px)}',
'.hc-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:10px;margin:6px 0}',
'.hc-cols ul{margin:4px 0 0 16px;padding:0;color:@M}',
'.hc-sel{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:6px 0}',
'.hc-sel select{min-height:32px;max-width:100%;padding:0 8px;border:1px solid @L;border-radius:8px;background:@B;color:@F;font-size:13px}',
'.hc-out{padding:8px 10px;border-left:4px solid @A;background:@B;border-radius:6px;margin:6px 0}',
'.hc-out ol{margin:4px 0 0 18px;padding:0}',
'.hc-kid{padding:8px 10px;border:1px solid @L;border-radius:10px;margin:6px 0;background:@B}',
'.hc-kid small{display:block;color:@M}',
'.hc-kid em{display:block;color:@M;margin:2px 0}',
'.hc-opts{display:flex;flex-direction:column;align-items:flex-start;gap:6px;margin-bottom:6px}',
'.hc-note{position:absolute;left:50%;bottom:10px;transform:translateX(-50%);z-index:7;max-width:calc(100% - 20px);padding:6px 14px;border-radius:99px;background:@F;color:@B;font-size:13px;font-weight:600;text-align:center;opacity:0;transition:opacity var(--hc-base);pointer-events:none}',
'.hc-note.on{opacity:1}',
'@media(max-width:480px){.hc-ov{padding:0;place-items:end center}.hc-dlg{width:100%;max-height:100vh;max-height:100dvh;border-radius:12px 12px 0 0}.hc-stage,.hc-stage[data-f]{aspect-ratio:4/5;max-width:none;margin:0}.hc-ctl{flex-wrap:nowrap;justify-content:space-between}.hc-ctl .hc-b{flex:1 1 0;padding:0}.hc-lb{display:none}.hc-h{font-size:18px}.hc-cap{font-size:16px}}',
'@media(prefers-reduced-motion:reduce){.hc-cur{transition:none}.hc-pulse::after{animation:none}}'
].join('').replace(/@([LAFBSMO])/g, function (x, c) { return 'var(--hc-' + { L: 'line', A: 'accent', F: 'fg', B: 'bg', S: 'surface', M: 'mut', O: 'on' }[c] + ')'; });

function el(tag, cls, txt) { var e = D.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function later(fn, ms) {
  var id = setTimeout(function () { timers = timers.filter(function (x) { return x !== id; }); fn(); }, ms);
  timers.push(id); return id;
}
function sleep(ms) { return new Promise(function (r) { later(r, ms); }); }
function cancel() {
  timers.forEach(clearTimeout); timers = []; rid++;
  if (SYN) try { W.speechSynthesis.cancel(); } catch (e) {}
  if (S && S.cur) try { /* freeze a cursor glide where it is */
    var m = W.getComputedStyle(S.cur).transform;
    if (m && m !== 'none') { S.cur.style.transition = 'none'; S.cur.style.transform = m; }
  } catch (e2) {}
}
function reduced() { return !!(W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches); }

/* ---------- screen module: dashboard (six tabs, made-up data) ---------- */
var MAILS = [
  ['Aunt Rosa', 'Reunion dates this summer', 'Hi Rosa, thank you for the reunion dates. The second weekend works for us, and I can bring a side dish.', 'I will bring a salad.'],
  ['Cousin Dev', 'Grandma birthday card idea', 'Hi Dev, great idea. My favorite memory for Grandma is the summer we baked her recipe together. Please add it to the card.', 'Please mail it on Monday.'],
  ['Mom', 'Holiday plans', 'Hi Mom, thanks for asking about the holidays. I would love to come, and the guest room sounds perfect. I will send my travel dates soon.', 'I land on the twentieth.']
];
var PROFILES = [
  ['Grandparent new to AI', 'Example result: you connect more than a grandparent new to AI, who usually only chats. Next step: try one connector, such as your calendar.'],
  ['Medium user', 'Example result: you match a medium user. You prompt well and use a few connectors. Next step: add files, so your assistant can find your documents.'],
  ['Expert home user', 'Example result: an expert home user also keeps reusable instructions and picks models on purpose. Next step: save your favorite prompt as a reusable instruction.'],
  ['Power home user with local GPUs', 'Example result: a power home user also runs jobs on their own machines and schedules them. Next step: let your assistant run one task on a schedule.'],
  ['Software engineer', 'Example result: a software engineer works in code and tests what the AI writes. You do not need that to benefit. Next step: ask for a tutorial on the one task you repeat most.']
];
var REPLIES = ['Ha. That is exactly you. Calmest one in the tub.', 'I love this. Who are the ducks?', 'This made my afternoon. Send me more of these.'];
var MIC = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0M12 17v4M9 21h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function dashHTML() {
  function comp(n, lab, init, dict, send, msg, hid) {
    return '<div class="hc-comp" data-comp' + (hid ? ' hidden' : '') + '><p class="hc-lab" data-lab>' + lab + '</p><textarea class="hc-ta" data-mic="none" data-t="' + n + '.draft" aria-label="Message text">' + esc(init) + '</textarea><div class="hc-acts"><button class="hc-mb hc-g hc-mic" data-a="mic" data-t="' + n + '.mic" data-dict="' + esc(dict) + '" aria-pressed="false" aria-label="Microphone, demo only">' + MIC + ' Mic</button><span class="hc-live" data-live aria-live="polite"></span><button class="hc-mb hc-send" data-a="send" data-t="' + n + '.send" data-msg="' + esc(msg) + '">' + send + '</button></div></div>';
  }
  var rows = MAILS.map(function (m, i) { return '<div class="hc-row"><span><b>' + esc(m[0]) + '</b><small>' + esc(m[1]) + '</small></span><button class="hc-mb hc-g" data-a="reply" data-v="' + i + '" data-t="inbox.reply' + i + '" aria-label="Reply to ' + esc(m[0]) + '">Reply</button></div>'; }).join('');
  var opts = '<option value="">Pick a profile</option>' + PROFILES.map(function (p, i) { return '<option value="' + i + '">' + esc(p[0]) + '</option>'; }).join('');
  var tabs = [['today', 'Today'], ['inbox', 'Inbox'], ['work', 'Work'], ['agenda', 'Agenda'], ['journey', 'My AI Journey'], ['closer', 'Closer']].map(function (t) { return '<button class="hc-tab" role="tab" data-a="tab" data-v="' + t[0] + '" data-t="tab:' + t[0] + '" aria-selected="false">' + t[1] + '</button>'; }).join('');
  function pane(n, hid, body) { return '<div class="hc-pane" role="tabpanel" data-pane="' + n + '"' + (hid ? ' hidden' : '') + '>' + body + '</div>'; }
  return ('<div class="hc-mt"><span><b>My dashboard</b><span class="hc-demo">Demo data</span></span><span>Last refreshed: just now</span></div>' +
  '<div class="hc-tabs" role="tablist" aria-label="Dashboard tabs">' + tabs + '</div>' +
  pane('today', 0, '<h4>Today: your top three</h4><div data-t="today.list"><div class="hc-row"><span>Reply to Mom about the holidays<small>Waiting since Monday</small></span><button class="hc-mb hc-g" data-a="tab" data-v="inbox">Open inbox</button></div><div class="hc-row"><span>Send the weekly recruiting recap<small>Due today</small></span><button class="hc-mb hc-g" data-a="tab" data-v="work">Open work</button></div><div class="hc-row"><span>Pick a week for the trip<small>Friends are free in week 3</small></span><button class="hc-mb hc-g" data-a="tab" data-v="agenda">Open agenda</button></div></div>') +
  pane('inbox', 1, '<h4>Inbox: needs a reply</h4>' + rows + comp('inbox', 'Reply', '', '', 'Send', 'Demo only. Nothing was sent.', 1)) +
  pane('work', 1, '<h4>Work: weekly recruiting recap</h4><div class="hc-metrics" data-t="work.metrics"><div><b>12</b>Open roles</div><div><b>31</b>Interviews</div><div><b>4</b>Offers out</div><div><b>2</b>Accepted</div></div><p>In the real dashboard, these numbers come from the systems you connect.</p>' + comp('work', 'Post to #hiring-managers', 'Weekly recruiting recap: 12 open roles, 31 interviews, 4 offers out, 2 accepted.', 'Please add your interview availability by Friday.', 'Send to team chat', 'Demo only. Nothing was sent to the team chat.', 0)) +
  pane('agenda', 1, '<h4>Agenda: find a week</h4><div class="hc-cal" data-t="agenda.cal" role="img" aria-label="Calendars: you and two friends are all free in week 3"><div><b>You</b><i></i><i></i><i class="f"></i><i></i></div><div><b>Friend A</b><i class="b"></i><i></i><i class="f"></i><i></i></div><div><b>Friend B</b><i></i><i class="b"></i><i class="f"></i><i class="b"></i></div><div><span></span><span>Wk 1</span><span>Wk 2</span><span>Wk 3</span><span>Wk 4</span></div></div><button class="hc-mb" data-a="trip" data-t="agenda.trip">Suggest a trip</button>' + comp('agenda', 'Suggested group message', '', 'I can drive if we pick somewhere close.', 'Start the group chat', 'Demo only. No group chat was started.', 1)) +
  pane('journey', 1, '<h4>My AI Journey</h4><p>Example data. In your real dashboard, this comes from what your assistant can see.</p><div class="hc-cols" data-t="journey.cols"><div><b>Accounts and connectors</b><ul><li>Assistant, chat</li><li>Email connector</li><li>Calendar connector</li><li>Not connected: files, team chat</li></ul></div><div><b>What you do most</b><ul><li>Drafting replies</li><li>Planning trips</li><li>Summarizing long emails</li></ul></div></div><div class="hc-sel"><label for="hc-cmp">Compare me to</label><select id="hc-cmp" data-t="journey.compare">' + opts + '</select><button class="hc-mb hc-g" data-a="cmp" data-t="journey.go">How do I compare?</button></div><div class="hc-out" data-cmpout hidden aria-live="polite"></div><button class="hc-mb" data-a="tut" data-t="journey.tut">Give me a tutorial based on my usage</button><div class="hc-out" data-tutout hidden><b>Tutorial: summarize a long email thread</b><ol><li>Open the thread and copy it into your assistant.</li><li>Say: "Summarize this in five lines and list what I owe."</li><li>Read the list and fix anything wrong.</li><li>Say: "Draft my reply from that list."</li><li>Edit the draft, then send it yourself.</li></ol></div>') +
  pane('closer', 1, '<h4>Bringing humans closer</h4><p><i>Made-up family. Made-up message. This shows what it would look like.</i></p><div class="hc-kid" data-t="closer.kid"><small>From Milo, 4:12 pm</small><em>[picture: a capybara sitting calmly in a hot tub while a dozen ducks flap around it]</em>this is lowkey me 💀</div><div class="hc-cols"><div data-t="closer.bare"><b>Bare chatbot</b><p><i>What it knows:</i> Nothing about you. Nothing about Milo.</p><p>"Lowkey" means "somewhat" and the skull emoji often means something is very funny. You could reply with a laughing emoji, or ask your child what they meant.</p><p><i>Not wrong. Not much help either.</i></p></div><div><b>Your assistant with your dashboard</b><p><i>What it knows (demo data):</i></p><ul><li>You: Dana, born 1984. Millennial.</li><li>Milo: your son, 13, born 2013. Generation Alpha.</li><li>Milo likes skateboarding, drawing, and capybaras.</li><li>From your notes: Milo started at a new school in September, and you said it is loud.</li><li>Your last three texts to Milo were reminders about chores.</li></ul></div></div><button class="hc-mb" data-a="signal" data-t="closer.signal">Read the signal</button><div class="hc-out" data-t="closer.read" data-signalout hidden aria-live="polite"><p><b>What it means:</b> "Lowkey me" means "this is a bit like me." The skull means he is laughing. He is saying he is the calm one while everything around him is noisy.</p><p><b>What kind of signal:</b> Sharing a laugh, and telling you a little about how school feels. He is not asking for advice.</p><p><b>How sure:</b> Fairly sure about the joke. Less sure about the school part. That is a guess from your notes, so do not push on it.</p><p><b>What to do:</b> Laugh with him first. He sent you his favorite animal, which means he wanted you to see it.</p><p><b>Reply options</b></p><div class="hc-opts">' + REPLIES.map(function (r, i) { return '<button class="hc-mb hc-g" data-a="opt" data-v="' + i + '" data-t="closer.opt' + i + '">' + (i + 1) + '. ' + esc(r) + '</button>'; }).join('') + '</div><p>These are drafts. Nothing is sent until you say yes.</p></div>' + comp('closer', 'Reply to Milo', '', 'Love you, see you at dinner.', 'Send to Milo', 'Demo only. Nothing was sent.', 1)) +
  '<div class="hc-note" role="status"></div>').replace(/<button /g, '<button type="button" ');
}

function dashboard(r, api) {
  r.innerHTML = dashHTML();
  var q = function (s) { return r.querySelector(s); }, noteT = 0;
  function pane(n) {
    [].forEach.call(r.querySelectorAll('.hc-pane'), function (p) { p.hidden = p.getAttribute('data-pane') !== n; p.scrollTop = 0; });
    [].forEach.call(r.querySelectorAll('.hc-tab'), function (b) { b.setAttribute('aria-selected', b.getAttribute('data-v') === n ? 'true' : 'false'); });
  }
  function note(m) { var x = q('.hc-note'); x.textContent = m; x.classList.add('on'); clearTimeout(noteT); noteT = api.later(function () { x.classList.remove('on'); }, 2400); }
  function comp(sel) { var c = q('[data-pane=' + sel + '] [data-comp]'); c.hidden = false; return c; }
  r.addEventListener('click', function (e) {
    var b = e.target.closest('[data-a]'); if (!b || !r.contains(b)) return;
    var a = b.getAttribute('data-a'), v = b.getAttribute('data-v'), c, auto = r.hasAttribute('data-auto');
    if (a === 'tab') pane(v);
    else if (a === 'reply') { var m = MAILS[+v]; c = comp('inbox'); c.querySelector('[data-lab]').innerHTML = 'Reply to <b>' + esc(m[0]) + '</b>'; c.querySelector('textarea').value = m[2]; c.querySelector('[data-a=mic]').setAttribute('data-dict', m[3]); }
    else if (a === 'trip') { c = comp('agenda'); c.querySelector('textarea').value = 'Hey all, I noticed our calendars are all free in week 3. Want me to set up a group chat to plan a trip?'; }
    else if (a === 'opt') { c = comp('closer'); c.querySelector('textarea').value = REPLIES[+v]; }
    else if (a === 'mic') {
      c = b.closest('[data-comp]');
      var on = !b.classList.contains('on');
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
      c.querySelector('[data-live]').textContent = on ? 'Listening (demo, nothing is recorded)' : '';
      if (on && !auto) api.later(function () { /* free play: the demo "hears" the stored words */
        b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); c.querySelector('[data-live]').textContent = '';
        var ta = c.querySelector('textarea'); ta.value = (ta.value.trim() + ' ' + (b.getAttribute('data-dict') || '')).trim();
      }, 1800);
    }
    else if (a === 'send') note(b.getAttribute('data-msg') || BAN);
    else if (a === 'cmp') { var sv = q('[data-t="journey.compare"]').value, o = q('[data-cmpout]'); o.hidden = false; o.textContent = sv === '' ? 'Pick a profile first.' : PROFILES[+sv][1]; }
    else if (a === 'tut') q('[data-tutout]').hidden = false;
    else if (a === 'signal') q('[data-signalout]').hidden = false;
  });
  r.addEventListener('hc-typed', function (e) { /* scripted dictation arrived: mic switches off */
    var c = e.target.closest('[data-comp]'); if (!c) return;
    var b = c.querySelector('[data-a=mic]'); b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); c.querySelector('[data-live]').textContent = '';
  });
  pane('today');
}
SCREENS.dashboard = dashboard;

/* ---------- player ---------- */
function cursorTo(el, jump) {
  var c = S.cur, p = el.closest('.hc-pane'), r0 = el.getBoundingClientRect();
  c.hidden = false;
  if (p) { var pr = p.getBoundingClientRect(); if (r0.bottom > pr.bottom) p.scrollTop += r0.bottom - pr.bottom + 8; else if (r0.top < pr.top) p.scrollTop -= pr.top - r0.top + 8; }
  var a = S.stage.getBoundingClientRect(), r = el.getBoundingClientRect();
  var x = Math.max(0, r.left - a.left + Math.min(r.width * .55, r.width - 6)), y = Math.max(0, r.top - a.top + Math.min(r.height * .6, r.height - 4));
  c.style.transition = jump ? 'none' : '';
  c.style.transform = 'translate(' + x.toFixed(0) + 'px,' + y.toFixed(0) + 'px)';
}
function pulse() { S.cur.classList.remove('hc-pulse'); void S.cur.offsetWidth; S.cur.classList.add('hc-pulse'); }
function tgt(n) { return S.root.querySelector('[data-t="' + String(n).replace(/"/g, '') + '"]'); }
function fire(el) {
  S.root.setAttribute('data-auto', '1');
  el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: W }));
  S.root.removeAttribute('data-auto');
}
function effect(a, el) {
  var v = a[0];
  if (v === 'click') fire(el);
  else if (v === 'pick') { el.value = a[2]; el.dispatchEvent(new Event('change', { bubbles: true })); }
  else if (v === 'type') { el.value = (el.value.trim() + ' ' + a[2]).trim(); el.dispatchEvent(new Event('hc-typed', { bubbles: true })); }
}
/* silent: apply the result of an act with no waiting (used to rebuild state, and in manual mode) */
function quick(a, withCursor) {
  var v = a[0]; if (v === 'wait') return;
  var el = tgt(a[1]); if (!el) return;
  if (v === 'show' || v === 'hide') { el.hidden = v === 'hide'; return; }
  if (el.closest('[hidden]')) return;
  effect(a, el);
  if (withCursor) cursorTo(el, true);
}
async function animate(a, my) {
  var v = a[0];
  if (v === 'wait') { await sleep(a[1]); return; }
  var el = tgt(a[1]); if (!el) return;
  if (v === 'show' || v === 'hide') { el.hidden = v === 'hide'; return; }
  if (el.closest('[hidden]')) return;
  cursorTo(el, false); await sleep(T.cur); if (my !== rid) return;
  if (v === 'click') { el.classList.add('hc-hl'); await sleep(T.base); if (my !== rid) return; pulse(); effect(a, el); await sleep(T.base); el.classList.remove('hc-hl'); }
  else if (v !== 'move') { effect(a, el); await sleep(T.base); }
}
function holdFor(st) { return typeof st.hold === 'number' ? st.hold : Math.max(1800, 60 * st.say.length); }
function speak(t) {
  return new Promise(function (res) {
    if (!S.narr || !SYN) return res();
    try {
      var u = new W.SpeechSynthesisUtterance(t); u.lang = 'en-US'; u.rate = .98; u.onend = u.onerror = function () { res(); };
      W.speechSynthesis.cancel(); W.speechSynthesis.speak(u);
    } catch (e) { return res(); }
    later(res, t.length * 90 + 2000);
  });
}
async function play(i) {
  var my = rid, st = S.sc.steps[i];
  S.i = i; show(i);
  if (i === 0) { await sleep(T.slow); if (my !== rid) return; }
  var acts = (async function () { for (var k = 0; k < (st.act || []).length; k++) { await animate(st.act[k], my); if (my !== rid) return; } })();
  await Promise.all([acts, sleep(holdFor(st)), speak(st.say)]);
  if (my !== rid) return;
  await sleep(T.base); if (my !== rid) return;
  if (i + 1 < S.sc.steps.length) play(i + 1); else { S.mode = 'done'; S.cur.hidden = true; ui(); }
}
function show(i) {
  var st = S.sc.steps[i];
  S.cap.textContent = st.say; S.cap.classList.remove('hc-fd'); void S.cap.offsetWidth; S.cap.classList.add('hc-fd');
  ui();
}
function goto(i, auto) {
  cancel();
  S.host.textContent = ''; S.root = el('div', 'hc-scr'); S.host.appendChild(S.root);
  SCREENS[S.sc.screen || 'dashboard'](S.root, { later: later });
  S.cur.hidden = true; S.cur.style.transform = ''; S.cur.style.transition = '';
  var steps = S.sc.steps, k, j;
  for (k = 0; k < i; k++) for (j = 0; j < (steps[k].act || []).length; j++) quick(steps[k].act[j], false);
  S.i = i;
  if (auto && !S.manual) { S.mode = 'play'; play(i); }
  else {
    S.mode = S.manual ? 'manual' : (i === steps.length - 1 ? 'done' : 'pause');
    for (j = 0; j < (steps[i].act || []).length; j++) quick(steps[i].act[j], true);
    show(i);
  }
}
function ui() {
  var n = S.sc.steps.length, st = S.sc.steps[S.i], b = S.btn, pl = S.mode === 'play';
  S.st.textContent = S.begun ? 'Step ' + (S.i + 1) + ' of ' + n : '';
  ['prev', 'pause', 'next', 'replay'].forEach(function (k) { b[k].disabled = !S.begun; });
  b.prev.disabled = !S.begun || S.i === 0;
  b.next.disabled = !S.begun || S.i >= n - 1;
  b.pause.hidden = S.manual;
  b.pause.disabled = !S.begun || S.mode === 'done';
  var paused = S.mode === 'pause', lab = paused ? 'Resume' : 'Pause';
  b.pause.setAttribute('aria-label', lab); b.pause.title = lab;
  b.pause.firstChild.textContent = paused ? '▶' : '❚❚'; b.pause.lastChild.textContent = lab;
  b.caps.setAttribute('aria-pressed', S.caps ? 'true' : 'false');
  b.narr.setAttribute('aria-pressed', S.narr ? 'true' : 'false');
  S.cap.setAttribute('aria-live', S.narr ? 'off' : 'polite');
  S.cap.classList.toggle('hc-off', !S.caps);
  if (S.begun) { var free = st.free && !pl; if (free) S.stage.removeAttribute('inert'); else S.stage.setAttribute('inert', ''); }
}
function onBtn(k) {
  if (!S || !S.sc) return;
  var n = S.sc.steps.length, auto = S.mode === 'play' || S.mode === 'done';
  if (k === 'close') close();
  else if (k === 'begin') { S.begun = true; S.begin.hidden = true; goto(0, true); (S.manual ? S.btn.next : S.btn.pause).focus(); }
  else if (k === 'prev' && S.i > 0) goto(S.i - 1, auto);
  else if (k === 'next' && S.i < n - 1) goto(S.i + 1, auto);
  else if (k === 'pause') { if (S.mode === 'play') { cancel(); S.mode = 'pause'; ui(); } else if (S.mode === 'pause') goto(S.i, true); }
  else if (k === 'replay') goto(0, true);
  else if (k === 'caps') { S.caps = !S.caps; ui(); }
  else if (k === 'narr') { S.narr = !S.narr; if (!S.narr && SYN) try { W.speechSynthesis.cancel(); } catch (e) {} ui(); }
  if (S && S.begun) ui();
}

/* ---------- dialog ---------- */
function btnHTML(k, glyph, label, extra) { return '<button type="button" class="hc-b' + (extra || '') + '" data-k="' + k + '" aria-label="' + label + '" title="' + label + '"><span aria-hidden="true">' + glyph + '</span><span class="hc-lb">' + label + '</span></button>'; }
function open(id, opener) {
  if (S) close(true);
  if (!cssDone) { var s = el('style'); s.setAttribute('data-hc', ''); s.textContent = CSS; D.head.appendChild(s); cssDone = true; }
  var ov = el('div', 'hc-ov');
  ov.innerHTML = '<div class="hc-dlg" role="dialog" aria-modal="true" aria-labelledby="hc-t" tabindex="-1">' +
    '<div class="hc-hd"><div><h2 class="hc-h" id="hc-t">Loading</h2><p class="hc-meta"><span class="hc-ban">' + BAN + '</span><span class="hc-st" aria-hidden="true"></span></p></div><button type="button" class="hc-b hc-x" data-k="close" aria-label="Close">×</button></div>' +
    '<div class="hc-body"><div class="hc-stage" data-f="16:9"><div class="hc-host"></div><div class="hc-cur" hidden><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M3 2l7.5 19 2.6-7.9L21 10.5z" style="fill:var(--hc-fg);stroke:var(--hc-bg)" stroke-width="1.5" stroke-linejoin="round"/></svg></div><div class="hc-begin"><p class="hc-intro">Loading the card.</p><button type="button" class="hc-b hc-pri" data-k="begin" disabled>Begin</button></div></div></div>' +
    '<p class="hc-cap" aria-live="polite" aria-atomic="true"></p>' +
    '<div class="hc-ctl">' + btnHTML('prev', '‹', 'Previous step') + btnHTML('pause', '❚❚', 'Pause') + btnHTML('next', '›', 'Next step') + btnHTML('replay', '↻', 'Replay') + btnHTML('caps', 'CC', 'Captions') + (SYN ? btnHTML('narr', '♪', 'Narration') : btnHTML('narr', '', 'Narration', '" hidden="hidden')) + '</div></div>';
  var d = ov.firstChild, q = function (s) { return ov.querySelector(s); };
  S = { id: id, ov: ov, dlg: d, opener: opener || D.activeElement, stage: q('.hc-stage'), host: q('.hc-host'), cur: q('.hc-cur'), cap: q('.hc-cap'), st: q('.hc-st'), begin: q('.hc-begin'), btn: {}, caps: true, narr: false, begun: false, mode: 'idle', i: 0, manual: reduced(), sc: null, ovx: D.documentElement.style.overflow };
  ['prev', 'pause', 'next', 'replay', 'caps', 'narr'].forEach(function (k) { S.btn[k] = q('[data-k=' + k + ']'); });
  ['prev', 'pause', 'next', 'replay'].forEach(function (k) { S.btn[k].disabled = true; });
  ov.addEventListener('click', function (e) { var b = e.target.closest('[data-k]'); if (b && !b.disabled) onBtn(b.getAttribute('data-k')); });
  ov.addEventListener('mousedown', function (e) { if (e.target === ov) close(); });
  D.documentElement.style.overflow = 'hidden';
  D.body.appendChild(ov); d.focus({ preventScroll: true });
  var me = S;
  load(id).then(function (sc) {
    if (S !== me) return;
    check(sc); me.sc = sc;
    q('#hc-t').textContent = sc.title || id;
    me.stage.setAttribute('data-f', sc.frame || '16:9');
    q('.hc-intro').textContent = sc.intro || 'This is a short demo with made-up data. Nothing is sent.';
    me.btn.pause.hidden = me.manual;
    var bg = q('[data-k=begin]'); bg.disabled = false; bg.focus(); ui();
  }).catch(function (err) {
    if (S !== me) return;
    q('#hc-t').textContent = 'Card not available';
    q('.hc-body').innerHTML = '<p class="hc-err" role="alert">This card could not be loaded' + (err && err.message ? ' (' + esc(err.message) + ')' : '') + '. Close this window and try again later.</p>';
    q('.hc-ctl').hidden = true; q('.hc-cap').hidden = true; q('[data-k=close]').focus();
  });
}
function load(id) {
  var all = D.querySelectorAll('script[type="application/json"][data-hmr-scenario]');
  for (var i = 0; i < all.length; i++) if (all[i].getAttribute('data-hmr-scenario') === id) { var t = all[i].textContent; return Promise.resolve().then(function () { return JSON.parse(t); }); }
  if (!W.fetch) return Promise.reject(new Error('no fetch'));
  return W.fetch(BASE + 'cards/' + encodeURIComponent(id) + '.json').then(function (r) { if (!r.ok) throw new Error('not found'); return r.json(); });
}
function check(sc) {
  if (!sc || sc.schema !== 'hmr-card/1') throw new Error('unknown schema');
  if (!Array.isArray(sc.steps) || !sc.steps.length || sc.steps.some(function (s) { return typeof s.say !== 'string'; })) throw new Error('no steps');
  if (!SCREENS[sc.screen || 'dashboard']) throw new Error('unknown screen');
}
function close(quiet) {
  if (!S) return;
  var s = S; cancel(); S = null;
  s.ov.remove(); D.documentElement.style.overflow = s.ovx;
  if (!quiet && s.opener && s.opener.focus) try { s.opener.focus({ preventScroll: true }); } catch (e) {}
}
function focusables() {
  return [].filter.call(S.dlg.querySelectorAll('button,input,select,textarea,a[href],[tabindex]'), function (e) {
    return !e.disabled && e.tabIndex >= 0 && !e.closest('[hidden],[inert]');
  });
}
D.addEventListener('keydown', function (e) {
  if (!S) return;
  if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
  if (e.key !== 'Tab') return;
  var f = focusables(); if (!f.length) { e.preventDefault(); return; }
  var a = D.activeElement, i = f.indexOf(a);
  if (!S.dlg.contains(a) || i < 0 && !e.shiftKey) { e.preventDefault(); f[0].focus(); }
  else if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); }
  else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
}, true);
D.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-hmr-card]');
  if (b) { e.preventDefault(); open(b.getAttribute('data-hmr-card'), b); }
});

W.HMRCard = { open: open, close: close, registerScreen: function (name, mod) { if (typeof mod === 'function') SCREENS[name] = mod; } };
})();
