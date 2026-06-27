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
app.innerHTML='<div class="calc-form"><div class="tabs" id="pTabs">'+
'<button class="tab active" data-tab="basico">Básico</button>'+
'<button class="tab" data-tab="descuento">Descuento</button>'+
'<button class="tab" data-tab="cambio">Cambio %</button>'+
'<button class="tab" data-tab="propina">Propina</button></div>'+
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

// ===== MÁS HERRAMIENTAS PLACEHOLDER =====
function renderDivisas(){app.innerHTML='<div class="calc-form"><p style="color:var(--text2);text-align:center;padding:20px">Próximamente: conversor de divisas en tiempo real.</p></div>';}
function renderUnidades(){app.innerHTML='<div class="calc-form"><p style="color:var(--text2);text-align:center;padding:20px">Próximamente: conversor completo de unidades.</p></div>';}
function renderQrcode(){app.innerHTML='<div class="calc-form"><p style="color:var(--text2);text-align:center;padding:20px">Próximamente: generador de códigos QR.</p></div>';}
function renderDiferencia(){app.innerHTML='<div class="calc-form"><p style="color:var(--text2);text-align:center;padding:20px">Próximamente: comparador de textos.</p></div>';}
function renderLorem(){app.innerHTML='<div class="calc-form"><p style="color:var(--text2);text-align:center;padding:20px">Próximamente: generador de Lorem Ipsum.</p></div>';}
function renderMorse(){app.innerHTML='<div class="calc-form"><p style="color:var(--text2);text-align:center;padding:20px">Próximamente: conversor de código Morse.</p></div>';}
function renderFraccion(){app.innerHTML='<div class="calc-form"><p style="color:var(--text2);text-align:center;padding:20px">Próximamente: calculadora de fracciones.</p></div>';}

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
