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
app.innerHTML='<div class="tabs" id="pTabs">'+
'<button class="tab active" data-tab="Basico">Básico</button>'+
'<button class="tab" data-tab="Desc">Descuento</button>'+
'<button class="tab" data-tab="Cambio">Cambio %</button>'+
'<button class="tab" data-tab="Prop">Propina</button></div>'+
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
var meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
var dias=[];for(var d=1;d<=31;d++)dias.push(d);
var hoy=new Date();
function buildSelect(id,val,opts){var h='<select id="'+id+'" style="width:100%;padding:8px;border:1px solid var(--borde);border-radius:8px;background:var(--card2);color:var(--text);font-size:.9rem">';opts.forEach(function(o,i){h+='<option value="'+(typeof o==='object'?o.v:o)+'"'+(i===val?' selected':'')+'>'+(typeof o==='object'?o.l:o)+'</option>';});h+='</select>';return h;}
app.innerHTML='<div class="calc-form"><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+
'<div><div class="form-row"><label>Fecha inicio</label>'+buildSelect('fdSD',hoy.getDate()-1,dias)+buildSelect('fdSM',hoy.getMonth(),meses.map(function(m,i){return{v:i,l:m}}))+
buildSelect('fdSY',10,function(){var y=[];for(var i=hoy.getFullYear()-100;i<=hoy.getFullYear()+10;i++)y.push(i);return y;}())+'</div></div>'+
'<div><div class="form-row"><label>Fecha fin</label>'+buildSelect('fdED',hoy.getDate()-1,dias)+buildSelect('fdEM',hoy.getMonth(),meses.map(function(m,i){return{v:i,l:m}}))+
buildSelect('fdEY',10,function(){var y=[];for(var i=hoy.getFullYear()-100;i<=hoy.getFullYear()+10;i++)y.push(i);return y;}())+'</div></div></div>'+
'<button class="btn-primary" id="btnFD">Calcular</button><div class="resultado" id="fdRes"></div></div>';
document.getElementById('btnFD').addEventListener('click',function(){
var sd=parseInt(document.getElementById('fdSD').value),sm=parseInt(document.getElementById('fdSM').value),sy=parseInt(document.getElementById('fdSY').value);
var ed=parseInt(document.getElementById('fdED').value),em=parseInt(document.getElementById('fdEM').value),ey=parseInt(document.getElementById('fdEY').value);
var d1=new Date(sy,sm,sd),d2=new Date(ey,em,ed);var diff=Math.abs(d2-d1);var days=Math.floor(diff/(86400000));
var years=Math.floor(days/365),months=Math.floor((days%365)/30),rdays=days%365%30;
document.getElementById('fdRes').innerHTML='<div class="valor-grande">'+days+' días</div><div class="valor-sec">'+years+' años, '+months+' meses, '+rdays+' días</div>';});
document.getElementById('btnFD').click();}

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

// ===== IVA =====
function renderIva(){
function calc(){var p=g('ivPrecio')||0,t=g('ivTasa')||21,op=document.getElementById('ivOp').value;
var tasa=t/100;if(op=='add'){var iva=p*tasa;document.getElementById('ivRes').innerHTML='<div class="valor-grande">$'+(p+iva).toFixed(2)+'</div><div class="valor-sec">IVA: $'+iva.toFixed(2)+' | Base: $'+p.toFixed(2)+'</div>';}
else{var base=p/(1+tasa);document.getElementById('ivRes').innerHTML='<div class="valor-grande">$'+base.toFixed(2)+'</div><div class="valor-sec">IVA: $'+(p-base).toFixed(2)+' | Total: $'+p.toFixed(2)+'</div>';}}
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Cantidad</label><input type="number" id="ivPrecio" value="100" step="0.01"></div>'+
'<div class="form-row"><label>Tasa IVA (%)</label><select id="ivTasa"><option value="21">21%</option><option value="10">10%</option><option value="4">4%</option><option value="0">0%</option></select></div>'+
'<div class="form-row"><label>Operación</label><select id="ivOp"><option value="add">Añadir IVA</option><option value="remove">Quitar IVA</option></select></div>'+
'<button class="btn-primary" id="btnIV">Calcular</button><div class="resultado" id="ivRes"></div></div>';
document.getElementById('btnIV').addEventListener('click',calc);calc();}

// ===== ROMANOS =====
function renderRomanos(){
var rNum=[{v:1000,r:'M'},{v:900,r:'CM'},{v:500,r:'D'},{v:400,r:'CD'},{v:100,r:'C'},{v:90,r:'XC'},{v:50,r:'L'},{v:40,r:'XL'},{v:10,r:'X'},{v:9,r:'IX'},{v:5,r:'V'},{v:4,r:'IV'},{v:1,r:'I'}];
function toRoman(n){if(n<1||n>3999)return 'Error: 1-3999';var r='',i;for(i=0;i<rNum.length;i++){while(n>=rNum[i].v){r+=rNum[i].r;n-=rNum[i].v;}}return r;}
function fromRoman(r){var n=0,i;for(i=0;i<rNum.length;i++){while(r.indexOf(rNum[i].r)===0){n+=rNum[i].v;r=r.substring(rNum[i].r.length);}}return n;}
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Número decimal</label><input type="number" id="rmDec" value="2024" min="1" max="3999"></div>'+
'<button class="btn-primary" id="btnRmD">A Romano</button><div class="resultado" id="rmDRes"><div class="valor-grande">MMXXIV</div></div>'+
'<hr style="margin:16px 0;border-color:var(--borde)"><div class="form-row"><label>Número romano</label><input type="text" id="rmRom" placeholder="MMXXIV" value="MMXXIV"></div>'+
'<button class="btn-primary" id="btnRmR">A Decimal</button><div class="resultado" id="rmRRes"><div class="valor-grande">2024</div></div></div>';
document.getElementById('btnRmD').addEventListener('click',function(){var v=g('rmDec')||0;document.getElementById('rmDRes').innerHTML='<div class="valor-grande">'+toRoman(v)+'</div>';});
document.getElementById('btnRmR').addEventListener('click',function(){var v=document.getElementById('rmRom').value.toUpperCase();document.getElementById('rmRRes').innerHTML='<div class="valor-grande">'+fromRoman(v)+'</div>';});}

// ===== PROMEDIO =====
function renderPromedio(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Números (separados por coma)</label><input type="text" id="prNums" value="10, 20, 30, 40, 50" placeholder="1, 2, 3"></div>'+
'<button class="btn-primary" id="btnPR">Calcular</button><div class="resultado" id="prRes"></div></div>';
document.getElementById('btnPR').addEventListener('click',function(){var t=document.getElementById('prNums').value;
var n=t.split(',').map(function(x){return parseFloat(x.trim())}).filter(function(x){return!isNaN(x)});
if(!n.length)return;var sum=n.reduce(function(a,b){return a+b},0);var avg=sum/n.length;
var s=[].concat(n).sort(function(a,b){return a-b});var med;if(s.length%2)med=s[Math.floor(s.length/2)];else med=(s[s.length/2-1]+s[s.length/2])/2;
var freq={},maxF=0,moda=[];n.forEach(function(v){freq[v]=(freq[v]||0)+1;if(freq[v]>maxF)maxF=freq[v];});
Object.keys(freq).forEach(function(k){if(freq[k]===maxF)moda.push(parseFloat(k));});
document.getElementById('prRes').innerHTML='<div class="valor-grande">Promedio: '+avg.toFixed(2)+'</div><div class="valor-sec">Mediana: '+med.toFixed(2)+'</div><div class="valor-sec">Moda: '+moda.join(', ')+'</div>';});}

// ===== COMBUSTIBLE =====
function renderCombustible(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Distancia (km)</label><input type="number" id="cbDist" value="300" step="0.1"></div>'+
'<div class="form-row"><label>Consumo (L/100km)</label><input type="number" id="cbCons" value="8" step="0.1"></div>'+
'<div class="form-row"><label>Precio por litro ($)</label><input type="number" id="cbPrice" value="1.8" step="0.01"></div>'+
'<button class="btn-primary" id="btnCB">Calcular</button><div class="resultado" id="cbRes"></div></div>';
document.getElementById('btnCB').addEventListener('click',function(){var d=g('cbDist'),c=g('cbCons'),p=g('cbPrice');
var litros=d*c/100;var costo=litros*p;
document.getElementById('cbRes').innerHTML='<div class="valor-grande">$'+costo.toFixed(2)+'</div><div class="valor-sec">Litros: '+litros.toFixed(1)+'</div>';});}

// ===== TIEMPO =====
function renderTiempo(){
app.innerHTML='<div class="calc-form"><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+
'<div><div class="form-row"><label>Horas 1</label><input type="number" id="th1" value="2" min="0"></div><div class="form-row"><label>Minutos 1</label><input type="number" id="tm1" value="30" min="0" max="59"></div><div class="form-row"><label>Segundos 1</label><input type="number" id="ts1" value="15" min="0" max="59"></div></div>'+
'<div><div class="form-row"><label>Horas 2</label><input type="number" id="th2" value="1" min="0"></div><div class="form-row"><label>Minutos 2</label><input type="number" id="tm2" value="45" min="0" max="59"></div><div class="form-row"><label>Segundos 2</label><input type="number" id="ts2" value="30" min="0" max="59"></div></div></div>'+
'<div style="display:flex;gap:8px;margin-bottom:12px"><button class="btn-primary" id="btnTSum">Sumar</button><button class="btn-primary" id="btnTDif">Restar</button></div>'+
'<div class="resultado" id="tiRes"></div></div>';
function calc(op){var h1=g('th1'),m1=g('tm1'),s1=g('ts1'),h2=g('th2'),m2=g('tm2'),s2=g('ts2');
var t1=h1*3600+m1*60+s1,t2=h2*3600+m2*60+s2;var r=op==='+'?t1+t2:t1-t2;if(r<0)r=0;
var rh=Math.floor(r/3600),rm=Math.floor((r%3600)/60),rs=r%60;
document.getElementById('tiRes').innerHTML='<div class="valor-grande">'+rh+'h '+rm+'m '+rs+'s</div>';}
document.getElementById('btnTSum').addEventListener('click',function(){calc('+');});
document.getElementById('btnTDif').addEventListener('click',function(){calc('-');});}

// ===== PRÉSTAMO =====
function renderPrestamo(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Monto del préstamo ($)</label><input type="number" id="plMonto" value="10000" step="any"></div>'+
'<div class="form-row"><label>Tasa anual (%)</label><input type="number" id="plTasa" value="5" step="0.1"></div>'+
'<div class="form-row"><label>Plazo (meses)</label><input type="number" id="plMeses" value="12" min="1"></div>'+
'<button class="btn-primary" id="btnPL">Calcular</button><div class="resultado" id="plRes"></div></div>';
document.getElementById('btnPL').addEventListener('click',function(){var P=g('plMonto'),r=g('plTasa')/100/12,n=g('plMeses');
var cuota=P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);var total=cuota*n;var interes=total-P;
document.getElementById('plRes').innerHTML='<div class="valor-grande">$'+cuota.toFixed(2)+'/mes</div><div class="valor-sec">Total: $'+total.toFixed(2)+' | Interés: $'+interes.toFixed(2)+'</div>';});}

// ===== POTENCIA =====
function renderPotencia(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Número</label><input type="number" id="ptNum" value="16" step="any"></div>'+
'<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><button class="btn-primary" id="btnSq">Raíz²</button><button class="btn-primary" id="btnCb">Raíz³</button><button class="btn-primary" id="btnSqr">Al²</button></div>'+
'<div class="resultado" id="ptRes"><div class="valor-grande">4</div></div></div>';
document.getElementById('btnSq').addEventListener('click',function(){var n=g('ptNum');document.getElementById('ptRes').innerHTML='<div class="valor-grande">'+Math.sqrt(n).toFixed(4)+'</div>';});
document.getElementById('btnCb').addEventListener('click',function(){var n=g('ptNum');document.getElementById('ptRes').innerHTML='<div class="valor-grande">'+Math.cbrt(n).toFixed(4)+'</div>';});
document.getElementById('btnSqr').addEventListener('click',function(){var n=g('ptNum');document.getElementById('ptRes').innerHTML='<div class="valor-grande">'+(n*n).toFixed(4)+'</div>';});}

// ===== NOTACIÓN CIENTÍFICA =====
function renderNotacion(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Número</label><input type="number" id="ncNum" value="1234567" step="any"></div>'+
'<button class="btn-primary" id="btnNC">Convertir</button><div class="resultado" id="ncRes"></div></div>';
document.getElementById('btnNC').addEventListener('click',function(){var n=g('ncNum');if(!n)return;
document.getElementById('ncRes').innerHTML='<div class="valor-grande">'+n.toExponential(4)+'</div><div class="valor-sec">'+n.toLocaleString('es-ES')+'</div>';});}


// ===== DESVIACIÓN ESTÁNDAR =====
function renderDesviacion(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Números (separados por coma)</label><input type="text" id="dvNums" value="10, 20, 30, 40, 50"></div>'+
'<button class="btn-primary" id="btnDV">Calcular</button><div class="resultado" id="dvRes"></div></div>';
document.getElementById('btnDV').addEventListener('click',function(){
var n=document.getElementById('dvNums').value.split(',').map(function(x){return parseFloat(x.trim())}).filter(function(x){return!isNaN(x)});
if(!n.length)return;var m=n.reduce(function(a,b){return a+b},0)/n.length;
var v=n.reduce(function(a,b){return a+(b-m)*(b-m)},0)/n.length;
var sd=Math.sqrt(v);
document.getElementById('dvRes').innerHTML='<div class="valor-grande">'+sd.toFixed(4)+'</div><div class="valor-sec">Media: '+m.toFixed(2)+' | Varianza: '+v.toFixed(4)+' | n='+n.length+'</div>';});}

// ===== REGLA DE TRES =====
function renderRegla3(){
app.innerHTML='<div class="calc-form"><div style="display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center;margin-bottom:12px">'+
'<div class="form-row"><label>A</label><input type="number" id="r3a" value="2" step="any"></div><div style="text-align:center;font-size:1.3rem">→</div>'+
'<div class="form-row"><label>B</label><input type="number" id="r3b" value="8" step="any"></div>'+
'<div class="form-row"><label>C</label><input type="number" id="r3c" value="5" step="any"></div><div style="text-align:center;font-size:1.3rem">→</div>'+
'<div class="form-row"><label>X = ?</label><div class="valor-grande" id="r3x" style="padding:8px">20</div></div></div>'+
'<button class="btn-primary" id="btnR3">Calcular</button></div>';
function calc(){var a=g('r3a'),b=g('r3b'),c=g('r3c');if(!a)return;
document.getElementById('r3x').textContent=(b*c/a).toFixed(4);}
document.getElementById('btnR3').addEventListener('click',calc);calc();}

// ===== HIPOTENUSA =====
function renderHipotenusa(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Cateto A</label><input type="number" id="hpA" value="3" step="any"></div>'+
'<div class="form-row"><label>Cateto B</label><input type="number" id="hpB" value="4" step="any"></div>'+
'<button class="btn-primary" id="btnHP">Calcular</button><div class="resultado"><div class="valor-grande" id="hpRes">5</div></div></div>';
function calc(){var a=g('hpA'),b=g('hpB');document.getElementById('hpRes').textContent=Math.sqrt(a*a+b*b).toFixed(4);}
document.getElementById('btnHP').addEventListener('click',calc);calc();}

// ===== ÁREA =====
function renderArea(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Figura</label><select id="arFig"><option value="circulo">Círculo</option><option value="cuadrado">Cuadrado</option><option value="rectangulo">Rectángulo</option><option value="triangulo">Triángulo</option><option value="trapecio">Trapecio</option></select></div>'+
'<div id="arInputs"><div class="form-row"><label>Radio (r)</label><input type="number" id="ar1" value="5" step="any"></div></div>'+
'<button class="btn-primary" id="btnAR">Calcular</button><div class="resultado" id="arRes"></div></div>';
function upd(){var f=document.getElementById('arFig').value;var h='';var labels={circulo:['Radio (r)'],cuadrado:['Lado'],rectangulo:['Base','Altura'],triangulo:['Base','Altura'],trapecio:['Base mayor','Base menor','Altura']};
labels[f].forEach(function(l,i){h+='<div class="form-row"><label>'+l+'</label><input type="number" id="ar'+(i+1)+'" value="5" step="any"></div>';});
document.getElementById('arInputs').innerHTML=h;}
function calc(){var f=document.getElementById('arFig').value;var v1=g('ar1')||0,v2=g('ar2')||0,v3=g('ar3')||0;var area=0,per=0;
switch(f){case'circulo':area=Math.PI*v1*v1;per=2*Math.PI*v1;break;case'cuadrado':area=v1*v1;per=4*v1;break;case'rectangulo':area=v1*v2;per=2*(v1+v2);break;case'triangulo':area=v1*v2/2;per=0;break;case'trapecio':area=(v1+v2)*v3/2;per=0;break;}
document.getElementById('arRes').innerHTML='<div class="valor-grande">Área: '+area.toFixed(2)+'</div><div class="valor-sec">'+(per?'Perímetro: '+per.toFixed(2):'')+'</div>';}
document.getElementById('arFig').addEventListener('change',function(){upd();calc();});
document.getElementById('btnAR').addEventListener('click',calc);upd();calc();}

// ===== VOLUMEN =====
function renderVolumen(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Figura</label><select id="vlFig"><option value="cubo">Cubo</option><option value="esfera">Esfera</option><option value="cilindro">Cilindro</option><option value="cono">Cono</option></select></div>'+
'<div id="vlInputs"><div class="form-row"><label>Lado</label><input type="number" id="vl1" value="5" step="any"></div></div>'+
'<button class="btn-primary" id="btnVL">Calcular</button><div class="resultado" id="vlRes"></div></div>';
function upd(){var f=document.getElementById('vlFig').value;var h='';var lbs={cubo:['Lado'],esfera:['Radio'],cilindro:['Radio','Altura'],cono:['Radio','Altura']};
lbs[f].forEach(function(l,i){h+='<div class="form-row"><label>'+l+'</label><input type="number" id="vl'+(i+1)+'" value="5" step="any"></div>';});
document.getElementById('vlInputs').innerHTML=h;}
function calc(){var f=document.getElementById('vlFig').value;var v1=g('vl1')||0,v2=g('vl2')||0,v=0;
switch(f){case'cubo':v=v1*v1*v1;break;case'esfera':v=4/3*Math.PI*v1*v1*v1;break;case'cilindro':v=Math.PI*v1*v1*v2;break;case'cono':v=Math.PI*v1*v1*v2/3;break;}
document.getElementById('vlRes').innerHTML='<div class="valor-grande">'+v.toFixed(2)+' u³</div>';}
document.getElementById('vlFig').addEventListener('change',function(){upd();calc();});
document.getElementById('btnVL').addEventListener('click',calc);upd();calc();}

// ===== FACTORIAL =====
function renderFactorial(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Número (n)</label><input type="number" id="ftN" value="10" min="0" max="170"></div>'+
'<button class="btn-primary" id="btnFT">Calcular</button><div class="resultado" id="ftRes"></div></div>';
document.getElementById('btnFT').addEventListener('click',function(){var n=g('ftN');if(n>170)return;var r=1,i;for(i=2;i<=n;i++)r*=i;
document.getElementById('ftRes').innerHTML='<div class="valor-grande">'+r.toExponential(6)+'</div>';});}

// ===== COMBINACIONES =====
function renderCombinaciones(){
function fact(n){var r=1,i;for(i=2;i<=n;i++)r*=i;return r;}
app.innerHTML='<div class="calc-form"><div class="form-row"><label>n (total)</label><input type="number" id="cbN" value="10" min="1" max="100"></div>'+
'<div class="form-row"><label>r (selección)</label><input type="number" id="cbR" value="3" min="1" max="100"></div>'+
'<div style="display:flex;gap:8px"><button class="btn-primary" id="btnCbn">Combinaciones</button><button class="btn-primary" id="btnCbp">Permutaciones</button></div>'+
'<div class="resultado" id="cbRes"></div></div>';
document.getElementById('btnCbn').addEventListener('click',function(){var n=g('cbN'),r=g('cbR');if(n<r)return;
document.getElementById('cbRes').innerHTML='<div class="valor-grande">C('+n+','+r+') = '+fact(n)/(fact(r)*fact(n-r))+'</div>';});
document.getElementById('btnCbp').addEventListener('click',function(){var n=g('cbN'),r=g('cbR');if(n<r)return;
document.getElementById('cbRes').innerHTML='<div class="valor-grande">P('+n+','+r+') = '+fact(n)/fact(n-r)+'</div>';});}

// ===== MCM MCD =====
function renderMcm(){
function mcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a;}
function mcm(a,b){return a*b/mcd(a,b);}
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Número 1</label><input type="number" id="mmN1" value="12"></div>'+
'<div class="form-row"><label>Número 2</label><input type="number" id="mmN2" value="18"></div>'+
'<button class="btn-primary" id="btnMM">Calcular</button><div class="resultado" id="mmRes"></div></div>';
document.getElementById('btnMM').addEventListener('click',function(){var a=g('mmN1'),b=g('mmN2');
document.getElementById('mmRes').innerHTML='<div class="valor-grande">MCD: '+mcd(a,b)+'</div><div class="valor-sec">MCM: '+mcm(a,b)+'</div>';});}

// ===== PRIMOS =====
function renderPrimos(){
function esPrimo(n){if(n<2)return false;if(n%2===0)return n===2;var i;for(i=3;i*i<=n;i+=2)if(n%i===0)return false;return true;}
function generar(n){var r=[],c=0,i=2;while(c<n){if(esPrimo(i)){r.push(i);c++;}i++;}return r.join(', ');}
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Número</label><input type="number" id="prN" value="17"></div>'+
'<button class="btn-primary" id="btnPrC">Comprobar</button><div class="resultado" id="prRes"></div>'+
'<div class="form-row" style="margin-top:16px"><label>Generar N primos</label><input type="number" id="prGen" value="10" min="1" max="50"></div>'+
'<button class="btn-primary" id="btnPrG">Generar</button><div class="resultado" id="prGenRes"></div></div>';
document.getElementById('btnPrC').addEventListener('click',function(){var n=g('prN');
document.getElementById('prRes').innerHTML='<div class="valor-grande">'+n+' '+(esPrimo(n)?'es primo':'no es primo')+'</div>';});
document.getElementById('btnPrG').addEventListener('click',function(){var n=g('prGen')||10;
document.getElementById('prGenRes').innerHTML='<div class="hash-output" style="font-size:.82rem">'+generar(n)+'</div>';});}

// ===== CUADRÁTICA =====
function renderCuadratica(){
app.innerHTML='<div class="calc-form"><div style="text-align:center;font-size:1.2rem;margin-bottom:12px">ax² + bx + c = 0</div>'+
'<div class="form-row"><label>a</label><input type="number" id="cqA" value="1" step="any"></div>'+
'<div class="form-row"><label>b</label><input type="number" id="cqB" value="5" step="any"></div>'+
'<div class="form-row"><label>c</label><input type="number" id="cqC" value="6" step="any"></div>'+
'<button class="btn-primary" id="btnCQ">Resolver</button><div class="resultado" id="cqRes"></div></div>';
document.getElementById('btnCQ').addEventListener('click',function(){var a=g('cqA'),b=g('cqB'),c=g('cqC');if(!a)return;
var d=b*b-4*a*c;if(d<0){document.getElementById('cqRes').innerHTML='<div class="valor-grande">Sin solución real</div>';return;}
var x1=(-b+Math.sqrt(d))/(2*a),x2=(-b-Math.sqrt(d))/(2*a);
document.getElementById('cqRes').innerHTML='<div class="valor-grande">x₁ = '+x1.toFixed(4)+'</div><div class="valor-sec">x₂ = '+x2.toFixed(4)+'</div>';});}

// ===== PARTO =====
function renderParto(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Primer día de última menstruación</label><input type="date" id="ptFecha"></div>'+
'<button class="btn-primary" id="btnPT">Calcular</button><div class="resultado" id="ptRes"></div></div>';
document.getElementById('btnPT').addEventListener('click',function(){var v=document.getElementById('ptFecha').value;if(!v)return;
var f=new Date(v);var parto=new Date(f);parto.setDate(parto.getDate()+280);
var hoy=new Date();var diff=Math.floor((hoy-f)/(86400000));var semanas=Math.floor(diff/7);var dias=diff%7;
document.getElementById('ptRes').innerHTML='<div class="valor-grande">Fecha probable: '+parto.toLocaleDateString('es-ES')+'</div><div class="valor-sec">Semana '+semanas+'+'+dias+' ('+diff+' días)</div>';});}

// ===== PESO IDEAL =====
function renderPesoideal(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Altura (cm)</label><input type="number" id="piAlt" value="170" step="0.1"></div>'+
'<div class="form-row"><label>Edad</label><input type="number" id="piEdad" value="30"></div>'+
'<div class="form-row"><label>Sexo</label><select id="piSexo"><option value="M">Masculino</option><option value="F">Femenino</option></select></div>'+
'<button class="btn-primary" id="btnPI">Calcular</button><div class="resultado" id="piRes"></div></div>';
document.getElementById('btnPI').addEventListener('click',function(){var h=g('piAlt'),e=g('piEdad'),s=document.getElementById('piSexo').value;
var dev=s==='M'?50:45.5;var pi=dev+2.3*((h/2.54)-60);
document.getElementById('piRes').innerHTML='<div class="valor-grande">'+pi.toFixed(1)+' kg</div><div class="valor-sec">Fórmula de Devine</div>';});}

// ===== CALORÍAS =====
function renderCalorias(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Sexo</label><select id="clSexo"><option value="M">Masculino</option><option value="F">Femenino</option></select></div>'+
'<div class="form-row"><label>Peso (kg)</label><input type="number" id="clPeso" value="70" step="0.1"></div>'+
'<div class="form-row"><label>Altura (cm)</label><input type="number" id="clAlt" value="175" step="0.1"></div>'+
'<div class="form-row"><label>Edad</label><input type="number" id="clEdad" value="30"></div>'+
'<div class="form-row"><label>Actividad</label><select id="clAct"><option value="1.2">Sedentario</option><option value="1.375">Ligero</option><option value="1.55">Moderado</option><option value="1.725">Activo</option><option value="1.9">Muy activo</option></select></div>'+
'<button class="btn-primary" id="btnCL">Calcular</button><div class="resultado" id="clRes"></div></div>';
document.getElementById('btnCL').addEventListener('click',function(){var p=g('clPeso'),h=g('clAlt'),e=g('clEdad'),s=document.getElementById('clSexo').value,a=parseFloat(document.getElementById('clAct').value);
var tmb=s==='M'?10*p+6.25*h-5*e+5:10*p+6.25*h-5*e-161;
document.getElementById('clRes').innerHTML='<div class="valor-grande">'+Math.round(tmb*a)+' kcal/día</div><div class="valor-sec">TMB: '+Math.round(tmb)+' kcal | Factor: '+a+'</div>';});}

// ===== ZAPATO =====
function renderZapato(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Longitud del pie (cm)</label><input type="number" id="zpCm" value="26" step="0.1"></div>'+
'<div class="form-row"><label>Sistema</label><select id="zpSys"><option value="eu">EU</option><option value="us">US (hombre)</option><option value="uk">UK</option></select></div>'+
'<button class="btn-primary" id="btnZP">Convertir</button><div class="resultado" id="zpRes"></div></div>';
document.getElementById('btnZP').addEventListener('click',function(){var cm=g('zpCm'),s=document.getElementById('zpSys').value;
var eu=Math.round(cm*1.5+1);var us=Math.round(cm*1.5-16);var uk=Math.round(cm*1.5-17);
var res='<div class="valor-grande">';if(s==='eu')res+=eu+' EU';else if(s==='us')res+=us+' US';else res+=uk+' UK';
res+='</div><div class="valor-sec">EU: '+eu+' | US: '+us+' | UK: '+uk+'</div>';
document.getElementById('zpRes').innerHTML=res;});}

// ===== ROT13 =====
function renderRot13(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Texto</label><input type="text" id="r13Text" placeholder="Hola Mundo"></div>'+
'<button class="btn-primary" id="btnR13">Codificar</button><div class="resultado"><div class="hash-output" id="r13Res"></div></div></div>';
document.getElementById('btnR13').addEventListener('click',function(){var t=document.getElementById('r13Text').value;
var r='',i;for(i=0;i<t.length;i++){var c=t.charCodeAt(i);if(c>=65&&c<=90)r+=String.fromCharCode((c-65+13)%26+65);
else if(c>=97&&c<=122)r+=String.fromCharCode((c-97+13)%26+97);else r+=t[i];}
document.getElementById('r13Res').textContent=r;});}

// ===== CÉSAR =====
function renderCesar(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Texto</label><input type="text" id="csText" placeholder="Hola Mundo"></div>'+
'<div class="form-row"><label>Desplazamiento</label><input type="number" id="csShift" value="3" min="1" max="25"></div>'+
'<button class="btn-primary" id="btnCS">Codificar</button><div class="resultado"><div class="hash-output" id="csRes"></div></div></div>';
document.getElementById('btnCS').addEventListener('click',function(){var t=document.getElementById('csText').value,s=parseInt(document.getElementById('csShift').value)||3;
var r='',i;for(i=0;i<t.length;i++){var c=t.charCodeAt(i);if(c>=65&&c<=90)r+=String.fromCharCode((c-65+s)%26+65);
else if(c>=97&&c<=122)r+=String.fromCharCode((c-97+s)%26+97);else r+=t[i];}
document.getElementById('csRes').textContent=r;});}

// ===== PALÍNDROMO =====
function renderPalindromo(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Palabra o frase</label><input type="text" id="plText" value="Anita lava la tina"></div>'+
'<button class="btn-primary" id="btnPL">Comprobar</button><div class="resultado" id="plRes"></div></div>';
document.getElementById('btnPL').addEventListener('click',function(){var t=document.getElementById('plText').value;
var c=t.toLowerCase().replace(/[^a-z0-9]/g,'');var r=c.split('').reverse().join('');
var es=c===r;document.getElementById('plRes').innerHTML='<div class="valor-grande">'+(es?'✅ Sí es palíndromo':'❌ No es palíndromo')+'</div>';});}

// ===== PASSWORD CHECK =====
function renderPasswordcheck(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Contraseña</label><input type="text" id="pwText" placeholder="Escribe una contraseña"></div>'+
'<button class="btn-primary" id="btnPWC">Evaluar</button><div class="resultado" id="pwcRes"></div></div>';
document.getElementById('btnPWC').addEventListener('click',function(){var t=document.getElementById('pwText').value||'';
var l=t.length,may=(t.match(/[A-Z]/g)||[]).length,min=(t.match(/[a-z]/g)||[]).length,num=(t.match(/[0-9]/g)||[]).length,sim=(t.match(/[^A-Za-z0-9]/g)||[]).length;
var pts=0;if(l>=8)pts+=25;if(l>=12)pts+=15;if(l>=16)pts+=10;if(may>0)pts+=10;if(min>0)pts+=10;if(num>0)pts+=10;if(sim>0)pts+=10;if(l>=12&&may>0&&num>0&&sim>0)pts+=10;
var nivel,color,c=pts>75?'#10b981':pts>50?'#f59e0b':pts>25?'#f97316':'#ef4444';
if(pts>=80)nivel='Muy fuerte';else if(pts>=60)nivel='Fuerte';else if(pts>=40)nivel='Media';else if(pts>=20)nivel='Débil';else nivel='Muy débil';
document.getElementById('pwcRes').innerHTML='<div style="background:var(--card2);border-radius:8px;padding:16px">'+
'<div style="height:8px;background:#e2e8f0;border-radius:4px;margin-bottom:8px"><div style="height:8px;width:'+pts+'%;background:'+c+';border-radius:4px;transition:width .3s"></div></div>'+
'<div class="valor-grande" style="font-size:1.1rem;color:'+c+'">'+nivel+' ('+pts+'/100)</div>'+
'<div class="valor-sec" style="font-size:.78rem">'+l+' chars | '+may+' may | '+min+' min | '+num+' num | '+sim+' sim</div></div>';});}

// ===== BINARIO/TEXTO =====
function renderBintext(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Texto</label><input type="text" id="btText" value="Hola"></div>'+
'<button class="btn-primary" id="btnBtE">A Binario</button><button class="btn-primary" id="btnBtD">A Texto</button><div class="resultado" id="btRes"></div>'+
'<div class="form-row" style="margin-top:16px"><label>Binario</label><input type="text" id="btBin" value="01001000 01101111 01101100 01100001"></div>'+
'<button class="btn-primary" id="btnBtB">Decodificar</button><div class="resultado" id="btBinRes"></div></div>';
document.getElementById('btnBtE').addEventListener('click',function(){var t=document.getElementById('btText').value;
var r='',i;for(i=0;i<t.length;i++)r+=t.charCodeAt(i).toString(2).padStart(8,'0')+' ';
document.getElementById('btRes').innerHTML='<div class="hash-output">'+r.trim()+'</div>';});
document.getElementById('btnBtD').addEventListener('click',function(){var t=document.getElementById('btBin').value;
var b=t.split(' ').filter(function(x){return x});var r='',i;for(i=0;i<b.length;i++)r+=String.fromCharCode(parseInt(b[i],2));
document.getElementById('btBinRes').innerHTML='<div class="hash-output">'+r+'</div>';});
document.getElementById('btnBtB').addEventListener('click',function(){document.getElementById('btnBtD').click();});}

// ===== LISTA ALEATORIA =====
function renderListrandom(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Elementos (uno por línea)</label><textarea id="lrItems" rows="6" style="width:100%;padding:8px;border:1px solid var(--borde);border-radius:8px;background:var(--card2);color:var(--text)">Ana\nLuis\nCarlos\nMaría\nPedro</textarea></div>'+
'<button class="btn-primary" id="btnLR">Ordenar al azar</button><div class="resultado" id="lrRes"></div></div>';
document.getElementById('btnLR').addEventListener('click',function(){var t=document.getElementById('lrItems').value.split('\\n').filter(function(l){return l.trim()});
if(!t.length)return;var a=[].concat(t),i;for(i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var tmp=a[i];a[i]=a[j];a[j]=tmp;}
document.getElementById('lrRes').innerHTML='<div class="hash-output">'+a.join('<br>')+'</div>';});}

// ===== INVERSIÓN =====
function renderInversion(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Capital inicial ($)</label><input type="number" id="ivCap" value="10000" step="any"></div>'+
'<div class="form-row"><label>Tasa anual (%)</label><input type="number" id="ivTasa" value="8" step="0.1"></div>'+
'<div class="form-row"><label>Años</label><input type="number" id="ivAnios" value="10"></div>'+
'<button class="btn-primary" id="btnIV">Calcular</button><div class="resultado" id="ivRes"></div></div>';
document.getElementById('btnIV').addEventListener('click',function(){var P=g('ivCap'),r=g('ivTasa')/100,t=g('ivAnios');
var fv=P*Math.pow(1+r,t);document.getElementById('ivRes').innerHTML='<div class="valor-grande">$'+fv.toFixed(2)+'</div><div class="valor-sec">Ganancia: $'+(fv-P).toFixed(2)+'</div>';});}

// ===== AHORRO =====
function renderAhorro(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Meta ($)</label><input type="number" id="ahMeta" value="10000" step="any"></div>'+
'<div class="form-row"><label>Mensual ($)</label><input type="number" id="ahMes" value="500" step="any"></div>'+
'<div class="form-row"><label>Tasa anual (%)</label><input type="number" id="ahTasa" value="3" step="0.1"></div>'+
'<button class="btn-primary" id="btnAH">Calcular</button><div class="resultado" id="ahRes"></div></div>';
document.getElementById('btnAH').addEventListener('click',function(){var M=g('ahMeta'),pmt=g('ahMes'),r=g('ahTasa')/100/12;
var meses=0,acum=0;while(acum<M&&meses<600){acum=(acum+pmt)*(1+r);meses++;}
document.getElementById('ahRes').innerHTML='<div class="valor-grande">'+meses+' meses ('+Math.round(meses/12)+' años)</div><div class="valor-sec">Ahorrando $'+pmt.toFixed(2)+'/mes</div>';});}

// ===== SALARIO =====
function renderSalario(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Salario</label><input type="number" id="slVal" value="30000" step="any"></div>'+
'<div class="form-row"><label>Período</label><select id="slPer"><option value="anual">Anual</option><option value="mensual">Mensual</option><option value="semanal">Semanal</option><option value="hora">Por hora</option></select></div>'+
'<div class="form-row"><label>Horas/semana</label><input type="number" id="slHoras" value="40"></div>'+
'<button class="btn-primary" id="btnSL">Convertir</button><div class="resultado" id="slRes"></div></div>';
document.getElementById('btnSL').addEventListener('click',function(){var v=g('slVal'),p=document.getElementById('slPer').value,h=g('slHoras');
var anual,men,sem,hora;if(p==='anual'){anual=v;men=v/12;sem=v/52;hora=v/(52*h);}
else if(p==='mensual'){men=v;anual=v*12;sem=v*12/52;hora=v*12/(52*h);}
else if(p==='semanal'){sem=v;anual=v*52;men=v*52/12;hora=v/h;}
else{hora=v;sem=v*h;anual=v*h*52;men=v*h*52/12;}
document.getElementById('slRes').innerHTML='<div class="valor-grande">$'+hora.toFixed(2)+'/hora</div><div class="valor-sec">$'+men.toFixed(2)+'/mes | $'+sem.toFixed(2)+'/sem | $'+anual.toFixed(2)+'/año</div>';});}

// ===== FECHA + DÍAS =====
function renderFechamas(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Fecha</label><input type="date" id="fmFecha"></div>'+
'<div class="form-row"><label>Días a sumar/restar</label><input type="number" id="fmDias" value="30"></div>'+
'<button class="btn-primary" id="btnFM">Calcular</button><div class="resultado" id="fmRes"></div></div>';
document.getElementById('btnFM').addEventListener('click',function(){var v=document.getElementById('fmFecha').value;if(!v)return;
var f=new Date(v);var d=g('fmDias')||0;f.setDate(f.getDate()+d);
document.getElementById('fmRes').innerHTML='<div class="valor-grande">'+f.toLocaleDateString('es-ES')+'</div>';});}

// ===== DÍAS LABORABLES =====
function renderLaborables(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Fecha inicio</label><input type="date" id="lbIni"></div>'+
'<div class="form-row"><label>Fecha fin</label><input type="date" id="lbFin"></div>'+
'<button class="btn-primary" id="btnLB">Calcular</button><div class="resultado" id="lbRes"></div></div>';
document.getElementById('btnLB').addEventListener('click',function(){var a=document.getElementById('lbIni').value,b=document.getElementById('lbFin').value;if(!a||!b)return;
var d1=new Date(a),d2=new Date(b);var lab=0,tot=0;while(d1<=d2){var dia=d1.getDay();if(dia>0&&dia<6)lab++;tot++;d1.setDate(d1.getDate()+1);}
document.getElementById('lbRes').innerHTML='<div class="valor-grande">'+lab+' días laborables</div><div class="valor-sec">De '+tot+' días totales</div>';});}

// ===== MASCOTA =====
function renderMascota(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Edad humana (años)</label><input type="number" id="mcEdad" value="5" min="0" max="30"></div>'+
'<div class="form-row"><label>Tipo</label><select id="mcTipo"><option value="perro">Perro</option><option value="gato">Gato</option></select></div>'+
'<div class="form-row"><label>Tamaño (perro)</label><select id="mcTam"><option value="peq">Pequeño (&lt;10kg)</option><option value="med">Mediano</option><option value="gra">Grande (≥25kg)</option></select></div>'+
'<button class="btn-primary" id="btnMC">Calcular</button><div class="resultado" id="mcRes"></div></div>';
document.getElementById('btnMC').addEventListener('click',function(){var e=g('mcEdad'),t=document.getElementById('mcTipo').value,tam=document.getElementById('mcTam').value;
if(t==='gato'){var ge=1;if(e>=1)ge=15;if(e>=2)ge=24;if(e>2)ge=24+(e-2)*4;document.getElementById('mcRes').innerHTML='<div class="valor-grande">'+ge+' años gatunos</div>';return;}
var f=1;if(tam==='peq'){if(e===1)f=15;else if(e===2)f=24;else f=24+(e-2)*4;}
else{f=1;if(e===1)f=15;else if(e===2)f=24;else f=24+(e-2)*5;}
document.getElementById('mcRes').innerHTML='<div class="valor-grande">'+f+' años perrunos</div>';});}

// ===== BISIESTO =====
function renderBisiesto(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Año</label><input type="number" id="bsAnio" value="2024"></div>'+
'<button class="btn-primary" id="btnBS">Comprobar</button><div class="resultado" id="bsRes"></div></div>';
document.getElementById('btnBS').addEventListener('click',function(){var y=g('bsAnio');
var es=(y%4===0&&y%100!==0)||y%400===0;
document.getElementById('bsRes').innerHTML='<div class="valor-grande">'+(es?'✅ Sí es bisiesto ('+y+' tiene 366 días)':'❌ No es bisiesto ('+y+' tiene 365 días)')+'</div>';});}

// ===== CARDÍACO =====
function renderCardiaco(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Edad</label><input type="number" id="crEdad" value="30"></div>'+
'<button class="btn-primary" id="btnCR">Calcular</button><div class="resultado" id="crRes"></div></div>';
document.getElementById('btnCR').addEventListener('click',function(){var e=g('crEdad');
var fcm=220-e;var z50=Math.round(fcm*0.5),z60=Math.round(fcm*0.6),z70=Math.round(fcm*0.7),z85=Math.round(fcm*0.85);
document.getElementById('crRes').innerHTML='<table class="tabla-resultados"><thead><tr><th>Zona</th><th>% FCM</th><th>ppm</th></tr></thead><tbody>'+
'<tr><td>Recuperación</td><td>50-60%</td><td>'+z50+'-'+z60+'</td></tr>'+
'<tr><td>Quema de grasa</td><td>60-70%</td><td>'+z60+'-'+z70+'</td></tr>'+
'<tr><td>Cardio</td><td>70-85%</td><td>'+z70+'-'+z85+'</td></tr>'+
'<tr><td>Máximo</td><td>85-100%</td><td>'+z85+'-'+fcm+'</td></tr></tbody></table>';});}

// ===== NOTA =====
function renderNota(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Nota actual (%)</label><input type="number" id="ntAct" value="80" step="0.1" max="100"></div>'+
'<div class="form-row"><label>Peso del examen (%)</label><input type="number" id="ntPeso" value="30" step="0.1"></div>'+
'<div class="form-row"><label>Nota deseada (%)</label><input type="number" id="ntDes" value="85" step="0.1" max="100"></div>'+
'<button class="btn-primary" id="btnNT">Calcular</button><div class="resultado" id="ntRes"></div></div>';
document.getElementById('btnNT').addEventListener('click',function(){var a=g('ntAct'),p=g('ntPeso')/100,d=g('ntDes');
var req=(d-(1-p)*a)/p;if(req>100)document.getElementById('ntRes').innerHTML='<div class="valor-grande" style="color:#ef4444">Imposible</div><div class="valor-sec">Necesitas >'+req.toFixed(1)+'%</div>';
else document.getElementById('ntRes').innerHTML='<div class="valor-grande">'+req.toFixed(1)+'%</div>';});}

// ===== HIPOTECA =====
function renderHipoteca(){
app.innerHTML='<div class="calc-form"><div class="form-row"><label>Monto ($)</label><input type="number" id="hpMonto" value="200000" step="any"></div>'+
'<div class="form-row"><label>Tasa anual (%)</label><input type="number" id="hpTasa" value="3.5" step="0.1"></div>'+
'<div class="form-row"><label>Plazo (años)</label><select id="hpPlazo"><option value="15">15 años</option><option value="20">20 años</option><option value="25">25 años</option><option value="30" selected>30 años</option></select></div>'+
'<button class="btn-primary" id="btnHP">Calcular</button><div class="resultado" id="hpRes"></div></div>';
document.getElementById('btnHP').addEventListener('click',function(){var P=g('hpMonto'),r=g('hpTasa')/100/12,n=g('hpPlazo')*12;
var cuota=P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);var total=cuota*n;var intereses=total-P;
document.getElementById('hpRes').innerHTML='<div class="valor-grande">$'+cuota.toFixed(2)+'/mes</div><div class="valor-sec">Total: $'+total.toFixed(2)+' | Intereses: $'+intereses.toFixed(2)+'</div>';});}

// ===== Dispatch =====
var modes={
porcentaje:renderPorcentaje,imc:renderIMC,interes:renderInteres,descuento:renderDescuento,
edad:renderEdad,hash:renderHash,uuid:renderUUID,contrasenas:renderContrasenas,
dados:renderDados,moneda:renderMoneda,aleatorio:renderAleatorio,timestamp:renderTimestamp,
urlcode:renderUrlcode,base64:renderBase64,mayusculas:renderMayusculas,palabras:renderPalabras,
colorhex:renderColorhex,fecha:renderFecha,binario:renderBinario,
divisas:renderDivisas,unidades:renderUnidades,qrcode:renderQrcode,diferencia:renderDiferencia,
lorem:renderLorem,morse:renderMorse,fraccion:renderFraccion,
iva:renderIva,romanos:renderRomanos,promedio:renderPromedio,combustible:renderCombustible,
tiempo:renderTiempo,prestamo:renderPrestamo,potencia:renderPotencia,notacion:renderNotacion,
desviacion:renderDesviacion,regla3:renderRegla3,hipotenusa:renderHipotenusa,area:renderArea,
volumen:renderVolumen,factorial:renderFactorial,combinaciones:renderCombinaciones,mcm:renderMcm,
primos:renderPrimos,cuadratica:renderCuadratica,parto:renderParto,pesoideal:renderPesoideal,
calorias:renderCalorias,zapato:renderZapato,rot13:renderRot13,cesar:renderCesar,
palindromo:renderPalindromo,passwordcheck:renderPasswordcheck,bintext:renderBintext,
listrandom:renderListrandom,inversion:renderInversion,ahorro:renderAhorro,salario:renderSalario,
fechamas:renderFechamas,laborables:renderLaborables,mascota:renderMascota,bisiesto:renderBisiesto,
cardiaco:renderCardiaco,nota:renderNota,hipoteca:renderHipoteca
};
if(modes[mode])modes[mode]();
})();
