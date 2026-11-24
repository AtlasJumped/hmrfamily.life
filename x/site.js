(function(){
  var host=location.hostname.replace(/^www\./,'');
  var x=new XMLHttpRequest(); x.open('GET','https://hmrfamily.life/x/sites.json',false); try{x.send();}catch(e){}
  var db={sites:{},kinds:{}}; try{db=JSON.parse(x.responseText);}catch(e){}
  var s=db.sites[host]||{t:host,p:'A new site in the HMR family of websites.',k:'fun'};
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
