// Minimal site JS
document.addEventListener('DOMContentLoaded', ()=>{
  const navToggle = document.getElementById('nav-toggle');
  if(navToggle) navToggle.addEventListener('click', ()=> document.body.classList.toggle('nav-open'));
});
