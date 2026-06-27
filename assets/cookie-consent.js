// Herramientas.cc — Cookie Consent Banner (GDPR + AdSense compliance)
(function(){
if(localStorage.getItem('h_consent')) return;
var lang = (document.documentElement.lang || 'es').substr(0,2);
var txt = {
  es: ['Usamos cookies para mostrar anuncios personalizados. Google AdSense y DoubleClick pueden usar cookies para mostrar anuncios basados en tus visitas.','Más info','Aceptar','Rechazar'],
  en: ['We use cookies for personalized ads. Google AdSense and DoubleClick may use cookies.','Learn more','Accept','Decline']
};
var t = txt[lang] || txt.es;
var pu = '/privacidad.html';
var b = document.createElement('div');
b.id = 'h-cookie';
b.innerHTML = '<div style="position:fixed;bottom:0;left:0;right:0;background:#ffffff;border-top:1px solid #dce2ec;padding:12px 20px;z-index:9999;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;font-size:.85rem;color:#1a202c;box-shadow:0 -2px 10px rgba(0,0,0,.05)">' +
'<span>🍪 '+t[0]+' <a href="'+pu+'" style="color:#2563eb;text-decoration:underline">'+t[1]+'</a></span>' +
'<button id="h-ok" style="background:#2563eb;color:#fff;border:none;padding:7px 18px;border-radius:8px;cursor:pointer;font-weight:500;font-size:.84rem">'+t[2]+'</button>' +
'<button id="h-no" style="background:#f0f4f8;color:#5a6a7a;border:1px solid #dce2ec;padding:7px 16px;border-radius:8px;cursor:pointer;font-size:.84rem">'+t[3]+'</button></div>';
document.body.appendChild(b);
document.getElementById('h-ok').onclick = function(){localStorage.setItem('h_consent','1');b.remove();};
document.getElementById('h-no').onclick = function(){localStorage.setItem('h_consent','0');b.remove();};
})();
