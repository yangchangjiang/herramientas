// Herramientas.cc — All-in-one Spanish Tool Script
(function(){
var app = document.getElementById('pg-app');
if(!app) return;
var mode = app.dataset.mode;
var t = function(es){return es;};

function fmt(n){return Number(n.toFixed(2)).toString();}
function g(id){return parseFloat(document.getElementById(id).value)||0;}

// ===== PORCENTAJE =====
function renderPorcentaje(){
'<div class="tabs" id="pTabs">'+
'<button class="tab active" data-tab="Basico">Básico</button>'+
'<button class="tab" data-tab="Desc">Descuento</button>'+
'<button class="tab" data-tab="Cambio">Cambio %</button>'+
'<button class="tab" data-tab="Prop">Propina</button></div>'
'<div class="panel active" id="pBasico"><div class="form-row"><label>Valor</label><input type="number" id="pVal" placeholder="200"></div>'+
'<div class="form-row"><label>Porcentaje</label><input type="number" id="pPct" placeholder="15"></div>'+
'<button class="btn-primary" id="btnP">Calcular</button><div class="resultado" id="pRes"></div></div>'+
'<div class="panel" id="pDesc"><div class="form-row"><label>Precio original</label><input type="number" id="pOrig" placeholder="100"></div>'+
'<div class="form-row"><label>% Descuento</label><input type="number" id="pDescPct" placeholder="20"></div>'+
'<button class="btn-primary" id="btnPD">Calcular</button><div class="resultado" id="pDescRes"></div></div>'+
'<div class="panel" id="pCambio"><div class="form-row"><label>Valor antiguo</label><input type="number" id="pOld" placeholder="50"></div>'+
'<div class="form-row"><label>Valor nuevo</label><input type="number" id="pNew" placeholder="75"></div>'+
'<button class="btn-primary" id="btnPC">Calcular</button><div class="resultado" id="pCambioRes"></div></div>'+
'<div class="panel" id="pProp"><div class="form-row"><label>Total cuenta</label><input type="number" id="pBill" placeholder="50"></div>'+
'<div class="form-row"><label>% Propina</label><input type="number" id="pTipPct" placeholder="15"></div>'+
'<div class="form-row"><label>Personas</label><input type="number" id="pPeople" placeholder="1" value="1"></div>'+
'<button class="btn-primary" id="btnPT">Calcular</button><div class="resultado" id="pPropRes"></div></div></div>';
document.getElementById('pTabs').addEventListener('click',function(e){
var tab=e.target.closest('.tab');if(!tab)return;
document.querySelectorAll('#pTabs .tab').forEach(function(t){t.classList.remove('active');});
document.querySelectorAll('.panel').forEach(function(p){p.classList.remove('active');});
tab.classList.add('active');document.getElementById('p'+tab.dataset.tab).classList.add('active');});
document.getElementById('btnP').addEventListener('click',function(){
var v=g('pVal'),p=g('pPct');
document.getElementById('pRes').innerHTML='<div class="valor-grande">El '+p+'% de '+fmt(v)+' = <strong>'+fmt(v*p/100)+'</strong></div>';});
document.getElementById('btnPD').addEventListener('click',function(){
var o=g('pOrig'),p=g('pDescPct'),s=o*p/100,f=o-s;
document.getElementById('pDescRes').innerHTML='<div class="valor-grande">Precio final: <strong>'+fmt(f)+'</strong></div><div class="valor-sec">Ahorras: '+fmt(s)+'</div>';});
document.getElementById('btnPC').addEventListener('click',function(){
var o=g('pOld'),n=g('pNew'),c=n&&o?((n-o)/Math.abs(o)*100):0;
document.getElementById('pCambioRes').innerHTML='<div class="valor-grande">Cambio: <strong>'+fmt(c)+'%</strong></div>';});
document.getElementById('btnPT').addEventListener('click',function(){
var b=g('pBill'),p=g('pTipPct'),pp=g('pPeople')||1,tip=b*p/100,total=b+tip,ppp=total/pp;
document.getElementById('pPropRes').innerHTML='<div class="valor-grande">Propina: <strong>'+fmt(tip)+'</strong></div>'+
'<div class="valor-sec">Total: '+fmt(total)+'</div><div class="valor-sec">Por persona: '+fmt(ppp)+'</div>';});
}

// ===== IMC =====
function renderIMC(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Peso (kg)</label><input type="number" id="imcPeso" placeholder="70" step="0.1"></div>'+
'<div class="form-row"><label>Altura (cm)</label><input type="number" id="imcAltura" placeholder="175" step="0.1"></div>'+
'<button class="btn-primary" id="btnIMC">Calcular IMC</button><div class="resultado" id="imcRes"></div></div>';
document.getElementById('btnIMC').addEventListener('click',function(){
var w=g('imcPeso'),h=g('imcAltura')/100,imc=h?w/(h*h):0,c='';
if(imc<18.5)c='Bajo peso';else if(imc<25)c='Normal';else if(imc<30)c='Sobrepeso';else if(imc<35)c='Obesidad I';else if(imc<40)c='Obesidad II';else c='Obesidad III';
document.getElementById('imcRes').innerHTML='<div class="valor-grande">'+imc.toFixed(1)+'</div><div class="valor-sec">'+c+'</div>';});
}

// ===== INTERÉS COMPUESTO =====
function renderInteres(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Capital inicial</label><input type="number" id="icCapital" value="10000"></div>'+
'<div class="form-row"><label>Tasa anual (%)</label><input type="number" id="icTasa" value="7" step="0.1"></div>'+
'<div class="form-row"><label>Años</label><input type="number" id="icAnios" value="10"></div>'+
'<div class="form-row"><label>Frecuencia</label><select id="icFreq"><option value="365">Diario</option><option value="12">Mensual</option><option value="4">Trimestral</option><option value="1" selected>Anual</option></select></div>'+
'<div class="form-row"><label>Aporte mensual</label><input type="number" id="icAporte" value="0"></div>'+
'<button class="btn-primary" id="btnIC">Calcular</button><div class="resultado" id="icRes"></div></div>';
document.getElementById('btnIC').addEventListener('click',function(){
var P=g('icCapital'),r=g('icTasa')/100,t=g('icAnios'),n=g('icFreq'),pmt=g('icAporte');
var fv=P*Math.pow(1+r/n,n*t);if(pmt>0){fv=P*Math.pow(1+r/n,n*t);for(var i=0;i<n*t;i++)fv+=pmt*12/n*Math.pow(1+r/n,n*t-i-1);}
var tc=P+(pmt*12*t),g=fv-tc;
document.getElementById('icRes').innerHTML='<div class="valor-grande">$'+fmt(fv)+'</div><div class="valor-sec">Capital total: $'+fmt(tc)+'</div><div class="valor-sec">Ganancia: <strong>$'+fmt(Math.max(0,g))+'</strong></div>';});
}

// ===== DESCUENTO =====
function renderDescuento(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Precio original</label><input type="number" id="dOrig" placeholder="100"></div>'+
'<div class="form-row"><label>% Descuento</label><input type="number" id="dPct" placeholder="20"></div>'+
'<button class="btn-primary" id="btnD">Calcular</button><div class="resultado" id="dRes"></div></div>';
document.getElementById('btnD').addEventListener('click',function(){
var o=g('dOrig'),p=g('dPct'),a=o*p/100,f=o-a;
document.getElementById('dRes').innerHTML='<div class="valor-grande">$'+fmt(f)+'</div><div class="valor-sec">Ahorras: $'+fmt(a)+'</div>';});
}

// ===== PROPINA =====
function renderPropina(){renderPorcentaje();/* reused in tabs */}

// ===== EDAD =====
function renderEdad(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Fecha de nacimiento</label><input type="date" id="edadFecha"></div>'+
'<button class="btn-primary" id="btnEdad">Calcular edad</button><div class="resultado" id="edadRes"></div></div>';
document.getElementById('btnEdad').addEventListener('click',function(){
var v=document.getElementById('edadFecha').value;if(!v)return;
var n=new Date(),c=new Date(v);var y=n.getFullYear()-c.getFullYear(),m=n.getMonth()-c.getMonth(),d=n.getDate()-c.getDate();
if(d<0){m--;d+=new Date(n.getFullYear(),n.getMonth(),0).getDate();}
if(m<0){y--;m+=12;}
document.getElementById('edadRes').innerHTML='<div class="valor-grande">'+y+' años</div><div class="valor-sec">'+m+' meses, '+d+' días</div>';});
}

// ===== HASH =====
function renderHash(){
async function hash(){
var t=document.getElementById('hashText').value||'',a=document.getElementById('hashAlgo').value;
var e=new TextEncoder();var d=await crypto.subtle.digest(a,e.encode(t));
var h=Array.from(new Uint8Array(d)).map(function(b){return b.toString(16).padStart(2,'0')}).join('');
document.getElementById('hashRes').innerHTML='<div class="hash-output">'+h+'</div>';}
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Texto</label><input type="text" id="hashText" placeholder="Escribe algo..."></div>'+
'<div class="form-row"><label>Algoritmo</label><select id="hashAlgo"><option value="MD5">MD5</option><option value="SHA-1">SHA-1</option><option value="SHA-256">SHA-256</option><option value="SHA-384">SHA-384</option><option value="SHA-512">SHA-512</option></select></div>'+
'<button class="btn-primary" id="btnHash">Generar Hash</button><div class="resultado" id="hashRes"></div></div>';
document.getElementById('btnHash').addEventListener('click',hash);}

// ===== UUID =====
function renderUUID(){
function gen(){return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0;return(c==='x'?r:(r&3|8)).toString(16);});}
var n=10;var u=[],i;
for(i=0;i<n;i++)u.push(gen());
app.innerHTML='<div class="calc-form"><button class="btn-primary" id="btnUUID">Generar UUIDs</button><div class="resultado" id="uuidRes"><div class="hash-output">'+
u.join('<br>')+'</div></div></div>';
document.getElementById('btnUUID').addEventListener('click',function(){var a=[],j;for(j=0;j<10;j++)a.push(gen());
document.getElementById('uuidRes').innerHTML='<div class="hash-output">'+a.join('<br>')+'</div>';});}

// ===== CONTRASEÑAS =====
function renderContrasenas(){
function genPw(l){var c='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';var r='',i;
for(i=0;i<l;i++)r+=c[Math.floor(Math.random()*c.length)];return r;}
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Longitud</label><input type="number" id="pwLen" value="16" min="4" max="64"></div>'+
'<button class="btn-primary" id="btnPW">Generar</button><div class="resultado" id="pwRes"><div class="hash-output">'+genPw(16)+'</div></div></div>';
document.getElementById('btnPW').addEventListener('click',function(){var l=g('pwLen')||16;
document.getElementById('pwRes').innerHTML='<div class="hash-output">'+genPw(l)+'</div>';});}

// ===== DADOS =====
function renderDados(){
function r(max){var a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%max+1;}
app.innerHTML='<div class="calc-form"><div class="tabs" id="dTabs"><button class="tab active" data-d="6">d6</button>'+
'<button class="tab" data-d="4">d4</button><button class="tab" data-d="8">d8</button><button class="tab" data-d="10">d10</button><button class="tab" data-d="12">d12</button><button class="tab" data-d="20">d20</button></div>'+
'<div class="dado-resultado" id="dRes">?</div><button class="btn-primary" id="btnDado">Lanzar</button></div>';
var s=6,h=[];function l(){var n=r(s);document.getElementById('dRes').textContent=n;h.unshift(n);if(h.length>10)h.pop();}
document.getElementById('btnDado').addEventListener('click',l);
document.getElementById('dTabs').addEventListener('click',function(e){
var t=e.target.closest('.tab');if(!t)return;s=parseInt(t.dataset.d);
document.querySelectorAll('#dTabs .tab').forEach(function(b){b.classList.remove('active');});t.classList.add('active');
h=[];document.getElementById('dRes').textContent='?';});}

// ===== MONEDA =====
function renderMoneda(){
var heads=0,tails=0;
app.innerHTML='<div class="calc-form"><div class="dado-resultado" id="coinRes">?</div><button class="btn-primary" id="btnCoin">Lanzar</button>'+
'<div style="margin-top:12px;text-align:center;font-size:.9rem"><span style="margin-right:16px">Cara: <strong id="headsC">0</strong></span>Cruz: <strong id="tailsC">0</strong></div></div>';
function f(){var a=new Uint32Array(1);crypto.getRandomValues(a);var r=a[0]%2?'Cara':'Cruz';
document.getElementById('coinRes').textContent=r;if(r==='Cara')heads++;else tails++;
document.getElementById('headsC').textContent=heads;document.getElementById('tailsC').textContent=tails;}
document.getElementById('btnCoin').addEventListener('click',f);}

// ===== ALEATORIO =====
function renderAleatorio(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Mínimo</label><input type="number" id="rMin" value="1"></div>'+
'<div class="form-row"><label>Máximo</label><input type="number" id="rMax" value="100"></div>'+
'<button class="btn-primary" id="btnRand">Generar</button><div class="resultado"><div class="valor-grande" id="randRes">?</div></div></div>';
document.getElementById('btnRand').addEventListener('click',function(){
var mn=g('rMin'),mx=g('rMax');if(mn>mx){var t=mn;mn=mx;mx=t;}
var r=Math.floor(Math.random()*(mx-mn+1))+mn;
document.getElementById('randRes').textContent=r;});}

// ===== TIMESTAMP =====
function renderTimestamp(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Timestamp Unix</label><input type="number" id="tsInput" value="'+Math.floor(Date.now()/1000)+'"></div>'+
'<button class="btn-primary" id="btnTS">Convertir</button><div class="resultado" id="tsRes"></div></div>';
function conv(){var t=g('tsInput');var d=new Date(t*1000);
document.getElementById('tsRes').innerHTML='<div class="valor-grande">'+d.toLocaleDateString('es-ES',{year:'numeric',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit'})+'</div>';}
document.getElementById('btnTS').addEventListener('click',conv);conv();}

// ===== URL CODE =====
function renderUrlcode(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Texto</label><input type="text" id="urlText" placeholder="https://ejemplo.com?param=valor"></div>'+
'<div style="display:flex;gap:8px;margin-bottom:12px"><button class="btn-primary" id="btnEnc">Codificar</button><button class="btn-primary" id="btnDec">Decodificar</button></div>'+
'<div class="resultado" id="urlRes"></div></div>';
document.getElementById('btnEnc').addEventListener('click',function(){var v=document.getElementById('urlText').value;
document.getElementById('urlRes').innerHTML='<div class="hash-output">'+encodeURIComponent(v)+'</div>';});
document.getElementById('btnDec').addEventListener('click',function(){var v=document.getElementById('urlText').value;
try{document.getElementById('urlRes').innerHTML='<div class="hash-output">'+decodeURIComponent(v)+'</div>';}
catch(e){document.getElementById('urlRes').innerHTML='<div class="hash-output">Error: texto inválido</div>';}});}

// ===== BASE64 =====
function renderBase64(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Texto</label><input type="text" id="b64Text" placeholder="Hola Mundo"></div>'+
'<div style="display:flex;gap:8px;margin-bottom:12px"><button class="btn-primary" id="btnB64Enc">Codificar</button><button class="btn-primary" id="btnB64Dec">Decodificar</button></div>'+
'<div class="resultado" id="b64Res"></div></div>';
document.getElementById('btnB64Enc').addEventListener('click',function(){var v=document.getElementById('b64Text').value;
document.getElementById('b64Res').innerHTML='<div class="hash-output">'+btoa(v)+'</div>';});
document.getElementById('btnB64Dec').addEventListener('click',function(){var v=document.getElementById('b64Text').value;
try{document.getElementById('b64Res').innerHTML='<div class="hash-output">'+atob(v)+'</div>';}
catch(e){document.getElementById('b64Res').innerHTML='<div class="hash-output">Error: Base64 inválido</div>';}});}

// ===== MAYÚSCULAS =====
function renderMayusculas(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Texto</label><input type="text" id="mcText" placeholder="hola mundo"></div>'+
'<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:12px">'+
'<button class="btn-primary" id="btnUpper">MAYÚSCULAS</button><button class="btn-primary" id="btnLower">minúsculas</button>'+
'<button class="btn-primary" id="btnTitle">Título</button><button class="btn-primary" id="btnToggle">ALtErNaDo</button></div>'+
'<div class="resultado"><div class="hash-output" id="mcRes">HOLA MUNDO</div></div></div>';
document.getElementById('btnUpper').addEventListener('click',function(){var v=document.getElementById('mcText').value;
document.getElementById('mcRes').textContent=v.toUpperCase();});
document.getElementById('btnLower').addEventListener('click',function(){var v=document.getElementById('mcText').value;
document.getElementById('mcRes').textContent=v.toLowerCase();});
document.getElementById('btnTitle').addEventListener('click',function(){var v=document.getElementById('mcText').value;
document.getElementById('mcRes').textContent=v.replace(/\w\S*/g,function(t){return t.charAt(0).toUpperCase()+t.substr(1).toLowerCase();});});
document.getElementById('btnToggle').addEventListener('click',function(){var v=document.getElementById('mcText').value,r='',i;
for(i=0;i<v.length;i++){r+=i%2?v[i].toUpperCase():v[i].toLowerCase();}
document.getElementById('mcRes').textContent=r;});}

// ===== PALABRAS =====
function renderPalabras(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Texto</label><textarea id="wcText" rows="6" style="width:100%;padding:10px;border:1px solid var(--borde);border-radius:8px;background:var(--card2);color:var(--text);font-size:.9rem"></textarea></div>'+
'<button class="btn-primary" id="btnWC">Contar</button><div class="resultado" id="wcRes"></div></div>';
document.getElementById('btnWC').addEventListener('click',function(){
var t=document.getElementById('wcText').value||'',w=t.match(/\S+/g),c=t.length,l=t.split('\n').length,p=t.split(/\n\s*\n/).length;
document.getElementById('wcRes').innerHTML='<div class="valor-grande">'+(w?w.length:0)+' palabras</div><div class="valor-sec">'+c+' caracteres, '+l+' líneas, '+p+' párrafos</div>';});}

// ===== COLOR HEX =====
function renderColorhex(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Color HEX</label><input type="text" id="hexInput" placeholder="#ff6600" value="#ff6600"></div>'+
'<button class="btn-primary" id="btnHex">Convertir</button><div class="resultado" id="hexRes"></div></div>';
document.getElementById('btnHex').addEventListener('click',function(){
var h=document.getElementById('hexInput').value.trim().replace('#','');if(h.length<6)return;
var r=parseInt(h.substr(0,2),16),g=parseInt(h.substr(2,2),16),b=parseInt(h.substr(4,2),16);
var rs=(r/255).toFixed(2),gs=(g/255).toFixed(2),bs=(b/255).toFixed(2);
var mx=Math.max(r,g,b)/255,mn=Math.min(r,g,b)/255,l=(mx+mn)/2,s=mx===mn?0:(l<0.5?(mx-mn)/(mx+mn):(mx-mn)/(2-mx-mn));
document.getElementById('hexRes').innerHTML='<div style="background:#'+h+';height:60px;border-radius:8px;margin-bottom:8px"></div>'+
'<div class="valor-sec">RGB: '+r+', '+g+', '+b+'</div><div class="valor-sec">HSL: '+Math.round(s*100)+'%, '+Math.round(l*100)+'%</div>';});}

// ===== FECHA =====
function renderFecha(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Fecha inicio</label><input type="date" id="fdStart"></div>'+
'<div class="form-row"><label>Fecha fin</label><input type="date" id="fdEnd"></div>'+
'<button class="btn-primary" id="btnFD">Calcular</button><div class="resultado" id="fdRes"></div></div>';
document.getElementById('btnFD').addEventListener('click',function(){
var a=document.getElementById('fdStart').value,b=document.getElementById('fdEnd').value;if(!a||!b)return;
var d1=new Date(a),d2=new Date(b);var diff=Math.abs(d2-d1);var days=Math.floor(diff/(86400000));
var years=Math.floor(days/365),months=Math.floor((days%365)/30),rdays=days%365%30;
document.getElementById('fdRes').innerHTML='<div class="valor-grande">'+days+' días</div><div class="valor-sec">'+years+' años, '+months+' meses, '+rdays+' días</div>';});}

// ===== BINARIO =====
function renderBinario(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Número decimal</label><input type="number" id="decInput" value="255"></div>'+
'<button class="btn-primary" id="btnDec">Convertir</button><div class="resultado" id="decRes"></div></div>';
document.getElementById('btnDec').addEventListener('click',function(){var n=g('decInput');
document.getElementById('decRes').innerHTML='<div class="valor-sec">Binario: <strong>'+n.toString(2)+'</strong></div>'+
'<div class="valor-sec">Hexadecimal: <strong>'+n.toString(16).toUpperCase()+'</strong></div>'+
'<div class="valor-sec">Octal: <strong>'+n.toString(8)+'</strong></div>';});}

// ===== DIVISAS =====
function renderDivisas(){
var rates={USD:1,EUR:0.92,GBP:0.79,JPY:157.5,CNY:7.24,CAD:1.37,AUD:1.52,CHF:0.89,MXN:18.2,BRL:5.45,ARS:910,KRW:1380,INR:83.5,TRY:32.1,RUB:89.5,SEK:10.7,NOK:10.5,DKK:6.9,PLN:4.04,ZAR:18.8,SGD:1.35,HKD:7.82,TWD:32.3,CLP:970,COP:4020,PEN:3.73};
function convert(){var amt=g('dvMonto')||0,from=document.getElementById('dvFrom').value,to=document.getElementById('dvTo').value,usd=amt/rates[from],res=usd*rates[to];
document.getElementById('dvRes').innerHTML='<div class="valor-grande">'+res.toFixed(2)+'</div><div class="valor-sec">1 '+from+' = '+rates[to]/rates[from]+' '+to+' | Tasas aprox.</div>';}
var opts=Object.keys(rates).map(function(c){return '<option value="'+c+'">'+c+'</option>'}).join('');
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Cantidad</label><input type="number" id="dvMonto" value="100" step="0.01"></div>'+
'<div class="form-row"><label>De</label><select id="dvFrom">'+opts+'</select></div>'+
'<div class="form-row"><label>A</label><select id="dvTo">'+opts.replace('value="USD"','value="EUR" selected')+'</select></div>'+
'<button class="btn-primary" id="btnDV">Convertir</button><div class="resultado" id="dvRes"></div></div>';
document.getElementById('btnDV').addEventListener('click',convert);convert();}

// ===== UNIDADES =====
function renderUnidades(){
var cats={longitud:{u:['Metro','Kilómetro','Milla','Pie','Pulgada','Centímetro','Yarda'],f:[1,0.001,0.000621,3.281,39.37,100,1.094]},
peso:{u:['Kilogramo','Gramo','Libra','Onza','Tonelada','Miligramo'],f:[1,1000,2.205,35.27,0.001,1e6]},
volumen:{u:['Litro','Mililitro','Galón USA','Cuarto','Pinta','Taza'],f:[1,1000,0.264,1.057,2.113,4.227]},
temperatura:{u:['°C','°F','°K'],f:[1,1,1],sp:true}};
var catSel=Object.keys(cats).map(function(c,i){return '<option value="'+c+'"'+(i===0?' selected':'')+'>'+c.charAt(0).toUpperCase()+c.slice(1)+'</option>'}).join('');
function updateUnits(){var cat=document.getElementById('unCat').value;var c=cats[cat];var sin=c.u.map(function(u,i){return '<option value="'+i+'">'+u+'</option>'}).join('');
document.getElementById('unFrom').innerHTML=sin;document.getElementById('unTo').innerHTML=sin;convert();}
function convert(){var cat=document.getElementById('unCat').value;var c=cats[cat];var v=g('unVal')||1;var fi=parseInt(document.getElementById('unFrom').value);var ti=parseInt(document.getElementById('unTo').value);
var base;if(c.sp){base=v;}else{base=v/c.f[fi];}
var res;if(c.sp){if(fi===0)res=v;else if(fi===1)res=(v-32)*5/9;else res=v-273.15;
if(ti===0)res=res;else if(ti===1)res=res*9/5+32;else res=res+273.15;}
else{res=base*c.f[ti];}
document.getElementById('unRes').innerHTML='<div class="valor-grande">'+res.toFixed(4)+' '+c.u[ti]+'</div>';}
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Categoría</label><select id="unCat" onchange="updateUnits()">'+catSel+'</select></div>'+
'<div class="form-row"><label>Valor</label><input type="number" id="unVal" value="1" step="any"></div>'+
'<div class="form-row"><label>De</label><select id="unFrom"></select></div>'+
'<div class="form-row"><label>A</label><select id="unTo"></select></div>'+
'<button class="btn-primary" id="btnUN">Convertir</button><div class="resultado" id="unRes"></div></div>';
document.getElementById('btnUN').addEventListener('click',convert);updateUnits();window.updateUnits=updateUnits;}

// ===== QR CODE =====
function renderQrcode(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Texto o URL</label><input type="text" id="qrText" placeholder="https://ejemplo.com"></div>'+
'<div class="form-row"><label>Tamaño</label><select id="qrSize"><option value="150">150x150</option><option value="200" selected>200x200</option><option value="300">300x300</option><option value="500">500x500</option></select></div>'+
'<button class="btn-primary" id="btnQR">Generar QR</button><div class="resultado qr-output" id="qrRes"></div></div>';
document.getElementById('btnQR').addEventListener('click',function(){var t=document.getElementById('qrText').value||'https://herramientas.cc';var s=document.getElementById('qrSize').value;
document.getElementById('qrRes').innerHTML='<img src="https://api.qrserver.com/v1/create-qr-code/?size='+s+'x'+s+'&data='+encodeURIComponent(t)+'" alt="QR Code" style="max-width:100%;border-radius:8px">';});}

// ===== DIFERENCIA =====
function renderDiferencia(){
function diff(){var a=document.getElementById('dfA').value.split('\n'),b=document.getElementById('dfB').value.split('\n');
var m=Math.max(a.length,b.length),h='<table class="tabla-resultados"><thead><tr><th>#</th><th>Texto A</th><th>Texto B</th></tr></thead><tbody>';
for(var i=0;i<m;i++){var la=a[i]||'',lb=b[i]||'';var cls=la===lb?'':'style="background:#fee2e2;color:#dc2626"';h+='<tr><td>'+(i+1)+'</td><td>'+la+'</td><td '+cls+'>'+lb+'</td></tr>';}
h+='</tbody></table>';document.getElementById('dfRes').innerHTML=h;}
app.innerHTML='<div class="calc-form" style="max-width:100%"><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'+
'<div class="form-row"><label>Texto A</label><textarea id="dfA" rows="6" style="width:100%;padding:8px;border:1px solid var(--borde);border-radius:8px;background:var(--card2);color:var(--text);font-size:.85rem">Hola</textarea></div>'+
'<div class="form-row"><label>Texto B</label><textarea id="dfB" rows="6" style="width:100%;padding:8px;border:1px solid var(--borde);border-radius:8px;background:var(--card2);color:var(--text);font-size:.85rem">Hola mundo</textarea></div></div>'+
'<button class="btn-primary" id="btnDF">Comparar</button><div class="resultado" id="dfRes"></div></div>';
document.getElementById('btnDF').addEventListener('click',diff);}

// ===== LOREM IPSUM =====
function renderLorem(){
var lorem='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
function gen(){var p=parseInt(document.getElementById('lpParrafos').value)||1;var s=parseInt(document.getElementById('lpOraciones').value)||3;var res='',i,j;
for(i=0;i<p;i++){var par='';for(j=0;j<s;j++){var words=lorem.split(' ');var start=Math.floor(Math.random()*(words.length-10));var len=Math.floor(Math.random()*8)+10;par+=words.slice(start,start+len).join(' ')+'. ';}
res+='<p style="margin-bottom:10px;line-height:1.7">'+par+'</p>';}
document.getElementById('lpRes').innerHTML=res;}
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Párrafos</label><input type="number" id="lpParrafos" value="3" min="1" max="20"></div>'+
'<div class="form-row"><label>Oraciones por párrafo</label><input type="number" id="lpOraciones" value="4" min="1" max="10"></div>'+
'<button class="btn-primary" id="btnLP">Generar</button><div class="resultado" id="lpRes"></div></div>';
document.getElementById('btnLP').addEventListener('click',gen);gen();}

// ===== MORSE =====
function renderMorse(){
var morse={'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..','0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',' ':'/'};
var rev={};for(var k in morse)rev[morse[k]]=k;
function aMorse(){var t=document.getElementById('mrText').value.toUpperCase(),r='',i;for(i=0;i<t.length;i++){var c=t[i];r+=morse[c]||c;r+=' ';}
document.getElementById('mrRes').innerHTML='<div class="hash-output">'+r.trim()+'</div>';}
function aTexto(){var t=document.getElementById('mrText').value.trim().split(' '),r='',i;for(i=0;i<t.length;i++){var m=t[i];r+=rev[m]||m;}
document.getElementById('mrRes').innerHTML='<div class="hash-output">'+r+'</div>';}
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Texto o código Morse</label><input type="text" id="mrText" placeholder="HOLA ... --- .-.. .-"></div>'+
'<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><button class="btn-primary" id="btnMrEnc">A Morse</button><button class="btn-primary" id="btnMrDec">A Texto</button></div>'+
'<div class="resultado" id="mrRes"></div></div>';
document.getElementById('btnMrEnc').addEventListener('click',aMorse);document.getElementById('btnMrDec').addEventListener('click',aTexto);}

// ===== FRACCIÓN =====
function renderFraccion(){
function mcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a;}
function calc(){var n1=g('frN1')||1,d1=g('frD1')||1,n2=g('frN2')||1,d2=g('frD2')||1,op=document.getElementById('frOp').value;
var rn,rd;switch(op){
case'+':rn=n1*d2+n2*d1;rd=d1*d2;break;
case'-':rn=n1*d2-n2*d1;rd=d1*d2;break;
case'*':rn=n1*n2;rd=d1*d2;break;
case'/':rn=n1*d2;rd=d1*n2;break;}
var div=mcd(rn,rd);rn/=div;rd/=div;var ent=0;
if(rd<0){rn=-rn;rd=-rd;}
if(Math.abs(rn)>=rd){ent=Math.floor(rn/rd);rn=rn%rd;}
var res='<div class="valor-grande">';if(ent)res+=ent+' ';if(rn)res+=Math.abs(rn)+'/'+rd;else if(!ent)res+='0';
res+='</div>';if(ent&&rn)res+='<div class="valor-sec">'+Math.abs(rn)+'/'+rd+'</div>';
document.getElementById('frRes').innerHTML=res;}
app.innerHTML='<div class="calc-form"><div style="display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center">'+
'<div><div class="form-row"><label>Numerador 1</label><input type="number" id="frN1" value="1"></div><div class="form-row"><label>Denominador 1</label><input type="number" id="frD1" value="2"></div></div>'+
'<div style="text-align:center;font-size:1.5rem"><select id="frOp" style="font-size:1.5rem;padding:4px;border-radius:6px;border:1px solid var(--borde);background:var(--card2);color:var(--text)"><option value="+">+</option><option value="-">−</option><option value="*">×</option><option value="/">÷</option></select></div>'+
'<div><div class="form-row"><label>Numerador 2</label><input type="number" id="frN2" value="1"></div><div class="form-row"><label>Denominador 2</label><input type="number" id="frD2" value="3"></div></div></div>'+
'<button class="btn-primary" id="btnFR">Calcular</button><div class="resultado" id="frRes"></div></div>';
document.getElementById('btnFR').addEventListener('click',calc);calc();}

// ===== Dispatch =====
var modes={
porcentaje:renderPorcentaje,imc:renderIMC,interes:renderInteres,descuento:renderDescuento,
edad:renderEdad,hash:renderHash,uuid:renderUUID,contrasenas:renderContrasenas,
dados:renderDados,moneda:renderMoneda,aleatorio:renderAleatorio,timestamp:renderTimestamp,
urlcode:renderUrlcode,base64:renderBase64,mayusculas:renderMayusculas,palabras:renderPalabras,
colorhex:renderColorhex,fecha:renderFecha,binario:renderBinario,
divisas:renderDivisas,unidades:renderUnidades,qrcode:renderQrcode,diferencia:renderDiferencia,
lorem:renderLorem,morse:renderMorse,fraccion:renderFraccion
};
if(modes[mode])modes[mode]();
})();
