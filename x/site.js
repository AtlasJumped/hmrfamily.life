(function(){
  var host=location.hostname.replace(/^www\./,'');
  var x=new XMLHttpRequest(); x.open('GET','https://hmrfamily.life/x/sites.json',false); try{x.send();}catch(e){}
  var db={sites:{},kinds:{}}; try{db=JSON.parse(x.responseText);}catch(e){}
  var s=db.sites[host]||{t:host,p:'A new site in the elevat.ing family of websites.',k:'fun'};
  var k=db.kinds[s.k]||db.kinds.fun||{sub:'',b:[]};
  document.title=s.t+' | '+host;
  var md=document.createElement('meta'); md.name='description'; md.content=s.p; document.head.appendChild(md);
  document.getElementById('f-d').textContent=host;
  document.getElementById('f-t').textContent=s.t;
  document.getElementById('f-p').textContent=s.p;
  document.getElementById('f-sub').textContent=k.sub+'.';
  var ul=document.getElementById('f-b'); (k.b||[]).forEach(function(b){var li=document.createElement('li'); li.textContent=b; ul.appendChild(li);});
  [].forEach.call(document.querySelectorAll('.f-d2'),function(e){e.textContent=host;});
  var ds=document.querySelector('script[src*="hmr-dock.js"]'); if(ds) ds.setAttribute('data-site',host);
})();
(function(){if(document.querySelector('script[src*="hmr-aud.js"]'))return;var a=document.createElement('script');a.src='https://hmrfamily.life/x/hmr-aud.js?v=1';a.defer=true;document.head.appendChild(a);})();

/* elevat.ing family: the ownership caption at the top (with the Thanksgiving welcome), and the "who we are" text without HMR or any sale wording. */
(function(){
  var d=document,b=d.body; if(!b) return;
  var host=location.hostname.replace(/^www\./,'');
  if(!d.querySelector('[data-elv8-cap]') && b.textContent.indexOf('owned by the person who owns this website')<0){
    var c=d.createElement('div'); c.className='elv8-cap'; c.setAttribute('data-elv8-cap',''); c.setAttribute('role','note');
    c.style.cssText="font:13px/1.45 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;text-align:center;padding:6px 12px;background:#fffdf8;color:#4a4760;border-bottom:1px solid #e8e3d6;position:relative;z-index:30";
    c.appendChild(d.createTextNode('This website is owned by the person who owns this website. '));
    var a=d.createElement('a'); a.href='https://elevat.ing/'; a.textContent='elevat.ing'; a.style.cssText='color:inherit;font-weight:700'; c.appendChild(a);
    var t=d.createElement('span'); t.style.cssText='display:block;margin-top:2px';
    var tb=d.createElement('b'); tb.textContent='Happy Thanksgiving 2026.'; t.appendChild(tb);
    t.appendChild(d.createTextNode(' Our goal is to take all of the best content from across the internet and consolidate it into one always free, ad-free hub of human innovation.'));
    c.appendChild(t);
    var sk=d.querySelector('a.skip'); if(sk&&sk.parentNode===b) b.insertBefore(c,sk.nextSibling); else b.insertBefore(c,b.firstChild);
  }
  var w=d.querySelector('.f-d2'), p=w&&w.parentNode;
  if(p&&p.tagName==='P'){
    p.textContent='';
    p.appendChild(d.createTextNode(host+' is one of our system of elevating websites: ideas we are testing in the open, built with AI. Every site in the '));
    var e=d.createElement('a'); e.href='https://elevat.ing/'; e.textContent='elevat.ing family of websites'; p.appendChild(e);
    p.appendChild(d.createTextNode(' is always free, forever, with no ads. Nothing here will ever ask you for money.'));
  }
  [].forEach.call(d.querySelectorAll('a[href="https://hmrfamily.life/"]'),function(x){ if(/see all our sites/i.test(x.textContent)) x.href='https://elevat.ing/'; });
})();
