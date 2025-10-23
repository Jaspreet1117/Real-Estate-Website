// Data
const cities = [
'New Delhi','Mumbai','Bengaluru','Chennai','Kolkata','Hyderabad','Pune','Ahmedabad','Jaipur','Lucknow',
'Surat','Kanpur','Nagpur','Visakhapatnam','Bhopal','Patna','Ludhiana','Agra','Vadodara','Coimbatore'
];

const listings = [
{
id:1,
title:'Spacious 3BHK Apartment near Park',
city:'Bengaluru',
price:'₹ 1.05 Cr',
area:'1450 sqft',
bhk:'3 BHK',
agent:'Green Realty',
img:'[https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=60](https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=60)'
},
{
id:2,
title:'Sunny 2BHK with Balcony',
city:'Pune',
price:'₹ 62 Lakh',
area:'920 sqft',
bhk:'2 BHK',
agent:'Home Seekers',
img:'[https://images.unsplash.com/photo-1560448204-0b7f42f9f3b1?auto=format&fit=crop&w=900&q=60](https://images.unsplash.com/photo-1560448204-0b7f42f9f3b1?auto=format&fit=crop&w=900&q=60)'
},
{
id:3,
title:'Luxury 4BHK Villa with Pool',
city:'Goa',
price:'₹ 3.9 Cr',
area:'3500 sqft',
bhk:'4 BHK',
agent:'Elite Estates',
img:'[https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=60](https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=60)'
},
{
id:4,
title:'Cozy 1BHK for Young Couples',
city:'Mumbai',
price:'₹ 34 Lakh',
area:'560 sqft',
bhk:'1 BHK',
agent:'CityHomes',
img:'[https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=60](https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=60)'
},
{
id:5,
title:'Modern 3BHK in Gated Community',
city:'Chennai',
price:'₹ 1.25 Cr',
area:'1600 sqft',
bhk:'3 BHK',
agent:'SafeNest Realtors',
img:'[https://images.unsplash.com/photo-1572120360610-d971b9a2e83e?auto=format&fit=crop&w=900&q=60](https://images.unsplash.com/photo-1572120360610-d971b9a2e83e?auto=format&fit=crop&w=900&q=60)'
}
];

// DOM refs
const cityScroll = document.getElementById('cityScroll');
const listingsEl = document.getElementById('listings');
const suggestions = document.getElementById('suggestions');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');

// Render cities
function renderCities(){
cities.forEach((c, idx)=>{
const btn = document.createElement('button');
btn.className='city';
btn.textContent = c;
btn.addEventListener('click', ()=>{
document.querySelectorAll('.city').forEach(n=>n.classList.remove('active'));
btn.classList.add('active');
filterListingsByCity(c);
});
cityScroll.appendChild(btn);
});
}

// Render listings
function renderListings(items){
listingsEl.innerHTML='';
items.forEach(item=>{
const card = document.createElement('article');
card.className='prop-card';
card.innerHTML = `       <div class="prop-media" style="background-image:url('${item.img}')" aria-hidden="true"></div>       <div class="prop-info">         <h3>${escapeHtml(item.title)}</h3>         <div class="meta">${item.city} • ${item.bhk} • ${item.area}</div>         <div class="tags"><span class="tag">Ready to Move</span><span class="tag">2 Baths</span></div>         <div style="margin-top:10px;color:var(--muted);font-size:13px">Listed by <strong>${escapeHtml(item.agent)}</strong></div>       </div>       <div class="prop-actions">         <div class="price">${item.price}</div>         <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">           <button class="contact-btn" data-id="${item.id}">Contact</button>           <button class="fav" aria-label="favorite" data-id="${item.id}">🤍</button>         </div>       </div>
    `;
listingsEl.appendChild(card);
});
}

// Simple HTML escape
function escapeHtml(s){ return (s+'').replace(/[&<>"']/g, function(ch){return {'&':'&','<':'<','>':'>','"':'"',"'":"'"}[ch];}); }

// Filter functions
function filterListingsByCity(city){
const filtered = listings.filter(l => l.city.toLowerCase() === city.toLowerCase());
if(filtered.length) renderListings(filtered);
else renderListings(listings.filter(l => l.city.toLowerCase() === city.toLowerCase() || l.title.toLowerCase().includes(city.toLowerCase())));
}

function resetCitySelection(){
document.querySelectorAll('.city').forEach(n=>n.classList.remove('active'));
renderListings(listings);
}

// Suggestions for search
function showSuggestions(q){
const ql = q.trim().toLowerCase();
if(!ql){ suggestions.style.display='none'; return; }
const matches = cities.filter(c => c.toLowerCase().includes(ql)).slice(0,8);
suggestions.innerHTML = '';
matches.forEach(m =>{
const li = document.createElement('li'); li.textContent = m;
li.addEventListener('click', ()=>{ searchInput.value = m; suggestions.style.display='none'; filterListingsByCity(m); });
suggestions.appendChild(li);
});
if(matches.length) suggestions.style.display='block'; else suggestions.style.display='none';
}

// Modal
function openContactModal(id){
const item = listings.find(l=>l.id==id);
if(!item) return;
modalContent.innerHTML = `     <h3>Contact about: ${escapeHtml(item.title)}</h3>     <p><strong>Agent:</strong> ${escapeHtml(item.agent)}</p>     <p><strong>City:</strong> ${escapeHtml(item.city)}</p>     <p><strong>Price:</strong> ${escapeHtml(item.price)}</p>     <p style="margin-top:10px">Call: <a href='tel:+911234567890'>+91 12345 67890</a></p>     <p style="margin-top:8px;color:var(--muted);font-size:13px">We will share your contact details with the agent.</p>
  `;
modal.style.display='flex'; modal.setAttribute('aria-hidden','false');
}

function closeContactModal(){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); }

// Favorites toggle (local only)
function toggleFav(id, btn){
const key = 'fav_'+id;
const current = localStorage.getItem(key);
if(current){ localStorage.removeItem(key); btn.textContent='🤍'; }
else { localStorage.setItem(key, '1'); btn.textContent='❤️'; }
}

function hydrateFavButtons(){
document.querySelectorAll('.fav').forEach(btn=>{
const id = btn.dataset.id; if(localStorage.getItem('fav_'+id)) btn.textContent='❤️';
btn.addEventListener('click',(e)=>{ toggleFav(id, btn); });
});
}

// Event delegation for contact buttons because items are re-rendered
function bindListingActions(){
listingsEl.addEventListener('click', (e)=>{
const ct = e.target;
if(ct.matches('.contact-btn')) openContactModal(ct.dataset.id);
});
}

// Search input handlers
searchInput.addEventListener('input', (e)=>{ showSuggestions(e.target.value); if(!e.target.value) resetCitySelection(); });
searchInput.addEventListener('keydown', (e)=>{ if(e.key==='Escape'){ suggestions.style.display='none'; } if(e.key==='Enter'){ const v=e.target.value.trim(); if(v) filterListingsByCity(v); suggestions.style.display='none'; }});

document.addEventListener('click',(e)=>{ if(!e.target.closest('.search-wrap')) suggestions.style.display='none'; });

// Modal close
closeModal.addEventListener('click', closeContactModal);
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeContactModal(); });

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', ()=>{ document.querySelector('.actions').classList.toggle('open'); });

// Initialize
renderCities();
renderListings(listings);
bindListingActions();
// hydrate fav buttons after initial render (and after any render)
setTimeout(hydrateFavButtons, 200);

// Make sure to re-hydrate favs when listings re-render (simple approach: observe DOM)
const obs = new MutationObserver(()=>{ hydrateFavButtons(); });
obs.observe(listingsEl, {childList:true, subtree:true});

// Smooth horizontal scrolling for city row by mouse wheel
cityScroll.addEventListener('wheel', (e)=>{
e.preventDefault(); cityScroll.scrollLeft += e.deltaY;
});
