// ===== EDIT ME =====
const birthdayData = {
  boyfriend: "Rohan", girlfriend: "Twishu", nicknameForHer: "Laadli", nicknameForHim: "Nona",
  birthday: "22 October 2003", relationshipYear: "2023", favoriteFlower: "Roses", favoriteSong: "Dil Diyan Gallan"
};
const photos = [
  { src: "assets/photo1.jpg", caption: "", alt: "Rohan and Twishu sitting together by the lake" },
  { src: "assets/photo2.jpg", caption: "Laadli being Laadli 😂", alt: "Selfie with dog filters under a tree" },
  { src: "assets/photo3.jpg", caption: "", alt: "Rohan and Twishu dressed up at the college farewell" },
  { src: "assets/photo4.jpg", caption: "How are you this cute?", alt: "Twishu making a peace sign in a dog-filter selfie" },
  { src: "assets/photo5.jpg", caption: "", alt: "Twishu and Rohan in front of a red heart wall" },
  { src: "assets/photo6.jpg", caption: "", alt: "Twishu resting her head on Rohan's shoulder, Holi colours on their faces" },
  { src: "assets/photo7.jpg", caption: "", alt: "Rohan and Twishu smiling in front of a monument" },
  { src: "assets/photo8.jpg", caption: "My favorite smile ❤️", alt: "Selfie with dog filters, Twishu smiling" }
];
const notes = [
  ["For Your Smile ❤️", "Tumhari smile ka koi logic nahi hai... bas dekh ke mood automatically better ho jaata hai."],
  ["For Your Nakhre 😌", "Tumhare nakhre kabhi kabhi headache dete hain... but honestly, tumhare bina woh bhi miss karunga. 😂❤️"],
  ["For My Laadli 🌷", "Laadli ho isliye special nahi ho... special ho isliye Laadli ho."],
  ["For My Favorite Dumbo 😂❤️", "Duniya ki sabse badi dumbo ho tum... aur meri sabse pyaari bhi. 🥰"]
];
// ===================
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
$$('[data-k]').forEach(e => e.textContent = birthdayData[e.dataset.k]);
$$('img[data-p]').forEach(i => { const p = photos[i.dataset.p - 1]; i.src = p.src; i.alt = p.alt; i.loading = 'lazy'; });
$$('.po').forEach(f => f.querySelector('.cap').textContent = photos[f.querySelector('img').dataset.p - 1].caption);

// ---- particles (light: cached sprites, draws only when needed) ----
const cv = $('#fx'), cx = cv.getContext('2d'); let P = [], W, H, run = false;
const rs = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; }; rs(); addEventListener('resize', rs);
const E = { h: '❤️', p: '🌸', s: '✨', r: '🌹' }, SP = {};
for (const k in E) { const c = document.createElement('canvas'); c.width = c.height = 32; const x = c.getContext('2d'); x.font = '24px serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(E[k], 16, 18); SP[k] = c; }
const COL = ['#e91e63', '#ff80ab', '#ffd54f', '#f06292', '#fff'];
function add(x, y, t, vx, vy, l = 1, g = .05) {
  if (P.length > 90) return;
  P.push({ x, y, t, vx, vy, l, g, s: 16 + Math.random() * 12, c: COL[Math.random() * 5 | 0] });
  if (!run) { run = true; requestAnimationFrame(loop); }
}
function burst(x, y, n = 20, types = ['h', 's', 'c']) {
  n = RM ? 4 : Math.ceil(n * .5);
  for (let i = 0; i < n; i++) { const a = Math.random() * 6.28, v = 2 + Math.random() * 5; add(x, y, types[i % types.length], Math.cos(a) * v, Math.sin(a) * v - 3, .8); }
}
function rain(types, ms, dur) {
  if (RM) return; const id = setInterval(() => { if (!document.hidden) add(Math.random() * W, -20, types[Math.random() * types.length | 0], (Math.random() - .5), 1.5 + Math.random(), 2, .004); }, ms);
  if (dur) setTimeout(() => clearInterval(id), dur);
}
function loop() {
  cx.clearRect(0, 0, W, H); P = P.filter(p => p.l > 0 && p.y < H + 40);
  if (!P.length) { run = false; return; }
  for (const p of P) {
    p.x += p.vx; p.y += p.vy; p.vy += p.g; p.l -= .008; cx.globalAlpha = Math.min(1, p.l * 2);
    if (p.t == 'c') { cx.fillStyle = p.c; cx.fillRect(p.x, p.y, 7, 4); } else cx.drawImage(SP[p.t], p.x, p.y, p.s, p.s);
  }
  requestAnimationFrame(loop);
}
rain(['h', 'p'], 2500);
const mid = () => [W / 2, H / 2];

// ---- flow ----
function show(id) {
  const s = document.getElementById(id); s.hidden = false;
  s.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' });
  revealIn(s);
}
function revealIn(s) { $$('#' + s.id + ' .rv').forEach((e, i) => setTimeout(() => e.classList.add('in'), 250 + i * (+s.dataset.gap || 350))); }
revealIn($('#s1'));
document.addEventListener('click', e => {
  const b = e.target.closest('[data-go]'); if (!b) return;
  burst(e.clientX, e.clientY, 26); b.disabled = true;
  setTimeout(() => show(b.dataset.go), 350);
});

// ---- lightbox ----
$$('.po').forEach(f => f.addEventListener('click', () => {
  const i = f.querySelector('img'), lb = $('#lb');
  lb.querySelector('img').src = i.src; lb.querySelector('img').alt = i.alt;
  lb.querySelector('figcaption').textContent = f.querySelector('.cap').textContent;
  lb.hidden = false; burst(W / 2, H / 2, 18, ['h']);
}));
$('#lb').addEventListener('click', () => $('#lb').hidden = true);
addEventListener('keydown', e => { if (e.key == 'Escape') $('#lb').hidden = true; });

// ---- envelopes ----
notes.forEach(([t, m]) => {
  const b = document.createElement('button'); b.className = 'env'; b.textContent = '💌 ' + t;
  b.onclick = e => { if (b.classList.contains('open')) return; b.classList.add('open'); b.textContent = m; burst(e.clientX, e.clientY, 14, ['h']); };
  $('#envs').appendChild(b);
});

// ---- heart game ----
const hg = $('#hg'), win = Math.random() * 14 | 0, hs = ['❤️', '🩷', '💕', '💖'];
for (let i = 0; i < 14; i++) {
  const b = document.createElement('button'); b.className = 'hh'; b.textContent = i == win ? '💝' : hs[i % 4];
  b.setAttribute('aria-label', 'heart'); b.style.left = (4 + (i % 5) * 19 + Math.random() * 6) + '%'; b.style.top = (4 + (i / 5 | 0) * 30 + Math.random() * 8) + '%';
  b.style.animationDelay = (-Math.random() * 3) + 's';
  b.onclick = e => {
    if (i == win) { burst(e.clientX, e.clientY, 50, ['h', 'h', 's']); $('#win').hidden = false; $$('.hh').forEach(x => x.disabled = true); setTimeout(() => $('#win').scrollIntoView({ behavior: 'smooth' }), 400); }
    else { b.classList.remove('no'); void b.offsetWidth; b.classList.add('no'); b.textContent = '😜'; }
  };
  hg.appendChild(b);
}

// ---- music ----
const au = $('#aud'), pb = $('#play'); let hearts;
pb.onclick = () => {
  if (au.paused) {
    au.play().then(() => {
      pb.textContent = '⏸ Pause'; $('#bars').classList.add('on'); hearts = hearts || rain(['h'], 1500);
    }).catch(() => { $('#mnote').hidden = false; });
  } else { au.pause(); pb.textContent = '▶ Play Dil Diyan Gallan'; $('#bars').classList.remove('on'); }
};
au.onerror = () => $('#mnote').hidden = false;

// ---- letter ----
$('#openL').onclick = e => {
  e.target.hidden = true; document.body.style.background = '#ffe3ec';
  $('#lt').classList.add('open'); rain(['p', 'r'], 900, 12000);
  setTimeout(() => $('#lt').scrollIntoView({ behavior: 'smooth' }), 300);
};

// ---- rose ----
const rose = $('#rose'); $$('#rose .petals ellipse').forEach((p, i) => p.style.setProperty('--k', (i - 2) * 38 + 'deg'));
let bloomed = false;
function bloom(e) {
  if (bloomed) return; bloomed = true; rose.classList.add('bloom');
  const r = rose.getBoundingClientRect(); burst(r.left + 100, r.top + 80, 40, ['r', 'p', 'h']);
  const seq = [['#r1', 1200], ['#r2', 3200], ['#roses', 4600], ['#r3', 5600]];
  seq.forEach(([s, t]) => setTimeout(() => { $(s).hidden = false; if (s == '#roses') burst(W / 2, H / 2, 30, ['r', 'p']); }, t));
}
rose.onclick = bloom; rose.onkeydown = e => { if (e.key == 'Enter' || e.key == ' ') { e.preventDefault(); bloom(); } };

// ---- gift ----
$('#gift').onclick = e => {
  const g = e.currentTarget; g.classList.add('open'); g.disabled = true;
  const [x, y] = mid(); burst(x, y, 90, ['c', 'r', 'h', 's', 'p']); setTimeout(() => burst(x, y, 60, ['c', 'r', 'h']), 600);
  rain(['r', 'p', 'h'], 500, 6000);
  setTimeout(() => { g.hidden = true; $('#fin').hidden = false; revealIn($('#fin')); }, 900);
};
$('#psst').onclick = e => {
  e.target.hidden = true; $('#sec').hidden = false; $('#sec').scrollIntoView({ behavior: 'smooth' });
  const [x, y] = mid(); burst(x, y, 40, ['h', 'r']); rain(['h', 'r'], 800, 6000);
};
