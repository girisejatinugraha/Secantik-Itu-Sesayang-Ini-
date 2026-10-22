const $ = id => document.getElementById(id);
const audio = $('audio'), list = $('list');
let lines = [], activeIdx = -1;
let geser = CONFIG.geserDetik || 0;   // + = lirik tampil lebih lambat

/* ---------- util ---------- */
let tt;
function toast(m) {
  const t = $('toast'); t.textContent = m;
  t.classList.remove('opacity-0', 'translate-y-4');
  clearTimeout(tt);
  tt = setTimeout(() => t.classList.add('opacity-0', 'translate-y-4'), 3200);
}
const fmt = s => { s = Math.max(0, s || 0); return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0'); };
const stampStr = t => `[${String(Math.floor(t / 60)).padStart(2, '0')}:${(t % 60).toFixed(2).padStart(5, '0')}]`;

/* ---------- info lagu ---------- */
$('titleOut').textContent = CONFIG.judul;
$('meta').textContent = ['Untuk ' + CONFIG.untuk,
  CONFIG.liriknyaOleh && 'lirik oleh ' + CONFIG.liriknyaOleh,
  CONFIG.suaraOleh && 'suara oleh ' + CONFIG.suaraOleh].filter(Boolean).join(', ');
$('polaCap').textContent = 'untuk ' + CONFIG.untuk.toLowerCase();
$('coverName').textContent = CONFIG.untuk;
$('coverTitle').textContent = CONFIG.judul;
document.title = CONFIG.judul + ' – untuk ' + CONFIG.untuk;

/* ---------- lirik ---------- */
const RX = /^\[(\d+):(\d{1,2}(?:\.\d{1,3})?)\]\s*(.*)$/;
lines = CONFIG.lirik.split('\n').map(r => r.trim()).filter(r => r && !r.startsWith('#')).map(r => {
  const m = r.match(RX);
  return m ? { t: +m[1] * 60 + parseFloat(m[2]), text: m[3] } : { t: null, text: r };
}).filter(l => l.text);

function renderList() {
  list.innerHTML = '';
  lines.forEach(l => {
    const p = document.createElement('p');
    p.className = 'ln font-judul leading-snug' + (l.t != null ? ' timed' : '');
    p.textContent = l.text;
    if (l.t != null) p.addEventListener('click', () => { audio.currentTime = l.t + geser; audio.play().catch(() => {}); });
    list.appendChild(p);
  });
  activeIdx = -1; highlight();
}
function highlight() {
  let idx = -1;
  lines.forEach((l, i) => { if (l.t != null && l.t + geser <= audio.currentTime) idx = i; });
  if (idx === activeIdx) return;
  activeIdx = idx;
  [...list.children].forEach((c, i) => c.classList.toggle('on', i === idx));
  if (idx >= 0) {
    $('caption').textContent = lines[idx].text;
    const c = list.children[idx];
    list.scrollTo({ top: c.offsetTop - list.clientHeight / 2 + c.clientHeight / 2 });
  }
}
const teksAsli = lines.map(l => l.text);
renderList();

/* Lirik tanpa waktu: sementara disebar merata sepanjang lagu (perkiraan kasar) */
audio.addEventListener('loadedmetadata', () => {
  if (!lines.length || lines.some(l => l.t != null) || !isFinite(audio.duration)) return;
  const D = audio.duration, total = lines.reduce((a, l) => a + l.text.length, 0);
  let acc = 0;
  const a0 = CONFIG.lirikMulai != null ? CONFIG.lirikMulai : D * .06;
  const b0 = CONFIG.lirikSelesai != null ? CONFIG.lirikSelesai : D * .94;
  lines.forEach(l => { l.t = a0 + acc / total * (b0 - a0); acc += l.text.length; });
  renderList();
});

/* ---------- pemutar ---------- */
audio.src = CONFIG.suara;
audio.addEventListener('error', () => toast('Lagu gagal dimuat. Cek alamat file di js/config.js.'));
$('play').addEventListener('click', () => {
  audio.paused ? audio.play().catch(() => toast('Lagu tidak bisa diputar.')) : audio.pause();
});
audio.addEventListener('play', () => {
  $('icoPlay').classList.add('hidden'); $('icoPause').classList.remove('hidden');
  document.body.classList.add('playing');
});
audio.addEventListener('pause', () => {
  $('icoPlay').classList.remove('hidden'); $('icoPause').classList.add('hidden');
  document.body.classList.remove('playing');
});
audio.addEventListener('timeupdate', () => {
  $('time').textContent = fmt(audio.currentTime) + ' / ' + fmt(audio.duration);
  if (audio.duration) $('seek').value = audio.currentTime / audio.duration * 100;
  highlight();
});
audio.addEventListener('ended', () => { if (recOn) stopCatat(); });
$('seek').addEventListener('input', e => { if (audio.duration) audio.currentTime = e.target.value / 100 * audio.duration; });

/* ---------- sampul pembuka ---------- */
$('open').addEventListener('click', () => {
  audio.play().catch(() => toast('Lagu belum bisa diputar. Cek alamat file di js/config.js.'));
  const c = $('cover');
  c.classList.add('opacity-0', 'pointer-events-none');
  setTimeout(() => c.remove(), 1100);
});
if (location.hash === '#catat' || location.hash === '#sinkron') $('cover').remove();

/* ---------- foto bergantian + latar buram ---------- */
let urls = [], idx = 0, front = 'A', tilt = -2;
const cekFoto = src => new Promise(res => { const i = new Image(); i.onload = () => res(src); i.onerror = () => res(null); i.src = src; });

function setBg(src, layer) {
  const on = $(layer === 'A' ? 'bgA' : 'bgB'), off = $(layer === 'A' ? 'bgB' : 'bgA');
  on.style.backgroundImage = `url("${src}")`; on.style.opacity = .55; off.style.opacity = 0;
}
Promise.all(CONFIG.foto.map(cekFoto)).then(r => {
  urls = r.filter(Boolean);
  if (!urls.length) return;
  $('empty').style.display = 'none';
  $('imgA').src = urls[0]; $('imgA').style.opacity = 1; setBg(urls[0], 'A');
  if (urls.length > 1) setInterval(nextFoto, CONFIG.gantiFotoDetik * 1000);
});
function nextFoto() {
  idx = (idx + 1) % urls.length;
  const inc = front === 'A' ? $('imgB') : $('imgA'), out = front === 'A' ? $('imgA') : $('imgB');
  inc.src = urls[idx]; inc.style.opacity = 1; out.style.opacity = 0;
  front = front === 'A' ? 'B' : 'A';
  setBg(urls[idx], front);
  tilt = tilt < 0 ? 2.2 : -2.2;
  $('polaroid').style.transform = `rotate(${tilt}deg)`;
}

/* ---------- mode catat lirik (buka index.html#catat) ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = null, recOn = false, hasil = [];
if (location.hash === '#catat') $('catat').classList.remove('hidden');

function startCatat() {
  if (!SR) return toast('Fitur ini butuh Chrome atau Edge.');
  hasil = []; $('hasil').value = ''; audio.currentTime = 0;
  rec = new SR(); rec.lang = 'id-ID'; rec.continuous = true; rec.interimResults = true;
  rec.onresult = e => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const r = e.results[i], tx = r[0].transcript.trim();
      if (r.isFinal && tx) {
        hasil.push(stampStr(Math.max(0, audio.currentTime - 1.5)) + ' ' + tx.charAt(0).toUpperCase() + tx.slice(1));
        $('hasil').value = hasil.join('\n');
      } else interim += r[0].transcript;
    }
    if (interim) $('caption').textContent = interim;
  };
  rec.onerror = e => {
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { toast('Akses mikrofon ditolak.'); stopCatat(); }
  };
  rec.onend = () => { if (recOn) { try { rec.start(); } catch (e) {} } };
  try {
    rec.start(); recOn = true; audio.play().catch(() => {});
    $('auto').textContent = 'Berhenti mencatat'; $('auto').classList.add('live');
  } catch (e) { toast('Mikrofon belum bisa dipakai.'); }
}
function stopCatat() {
  recOn = false;
  if (rec) { try { rec.stop(); } catch (e) {} }
  audio.pause();
  $('auto').textContent = 'Dengarkan & catat lirik'; $('auto').classList.remove('live');
  toast(hasil.length + ' baris tercatat. Salin ke js/config.js.');
}
$('auto').addEventListener('click', () => recOn ? stopCatat() : startCatat());
$('salin').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('hasil').value); toast('Hasil tersalin.'); }
  catch (e) { $('hasil').select(); toast('Tekan Ctrl+C untuk menyalin.'); }
});


/* ---------- mode sinkron (buka index.html#sinkron) ---------- */
let sIdx = 0, sOut = [];
if (location.hash === '#sinkron') { $('sinkron').classList.remove('hidden'); showNext(); }
function showNext() {
  $('nowLine').textContent = teksAsli[sIdx] || 'Selesai. Salin hasilnya.';
  $('nextLine').textContent = teksAsli[sIdx + 1] || '';
  $('sCount').textContent = sIdx + ' / ' + teksAsli.length + ' baris';
}
$('tandai').addEventListener('click', () => {
  if (sIdx >= teksAsli.length) return toast('Semua baris sudah ditandai.');
  if (audio.paused) return toast('Putar lagunya dulu, lalu tekan saat baris dinyanyikan.');
  sOut.push(stampStr(Math.max(0, audio.currentTime - .25)) + ' ' + teksAsli[sIdx]);
  sIdx++; $('hasil2').value = sOut.join('\n'); showNext();
});
$('ulang').addEventListener('click', () => {
  if (!sIdx) return; sIdx--; sOut.pop(); $('hasil2').value = sOut.join('\n'); showNext();
});
$('salin2').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('hasil2').value); toast('Hasil tersalin.'); }
  catch (e) { $('hasil2').select(); toast('Tekan Ctrl+C untuk menyalin.'); }
});


/* ---------- penyetel waktu lirik ---------- */
function updGeser() {
  $('geserVal').textContent = (geser > 0 ? '+' : '') + geser.toFixed(1) + ' dtk';
  activeIdx = -1; highlight();
}
$('tunda').addEventListener('click', () => { geser += .5; updGeser(); });
$('maju').addEventListener('click', () => { geser -= .5; updGeser(); });
updGeser();


/* ---------- lirik otomatis dari lagu (tanpa menulis lirik di config) ---------- */
const kunci = 'lirik-auto:' + CONFIG.suara;
let autoLive = false, recL = null, liveOn = false, trackLive = null, hintT = null;

(function initAuto() {
  if (lines.length || location.hash === '#catat' || location.hash === '#sinkron') return;
  try {
    const saved = JSON.parse(localStorage.getItem(kunci) || 'null');
    if (saved && saved.length) { lines = saved; renderList(); return; }
  } catch (e) {}
  if (!SR) { toast('Lirik otomatis butuh Chrome atau Edge.'); return; }
  autoLive = true;
  $('caption').textContent = 'Tekan putar. Lirik muncul otomatis saat lagu dinyanyikan.';
})();

function jalankanRec() { try { trackLive ? recL.start(trackLive) : recL.start(); return true; } catch (e) { try { recL.start(); return true; } catch (e2) { return false; } } }

function mulaiLive() {
  if (!autoLive || liveOn) return;
  trackLive = null;
  try {
    const st = audio.captureStream ? audio.captureStream() : (audio.mozCaptureStream ? audio.mozCaptureStream() : null);
    trackLive = st && st.getAudioTracks()[0] || null;
  } catch (e) {}
  recL = new SR(); recL.lang = CONFIG.bahasa || 'id-ID'; recL.continuous = true; recL.interimResults = true;
  let adaHasil = false;
  recL.onresult = e => {
    adaHasil = true; let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const r = e.results[i], tx = r[0].transcript.trim();
      if (r.isFinal && tx) {
        lines.push({ t: Math.max(0, audio.currentTime - 1.2 - geser), text: tx.charAt(0).toUpperCase() + tx.slice(1) });
        renderList();
      } else interim += r[0].transcript;
    }
    if (interim) $('caption').textContent = interim;
  };
  recL.onerror = e => {
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { toast('Akses mikrofon ditolak. Izinkan lewat ikon gembok di alamat.'); autoLive = false; liveOn = false; }
  };
  recL.onend = () => { if (liveOn && !audio.paused) jalankanRec(); };
  if (jalankanRec()) {
    liveOn = true;
    clearTimeout(hintT);
    hintT = setTimeout(() => { if (!adaHasil && liveOn) toast('Belum ada lirik terdeteksi. Pakai speaker dengan volume cukup keras, bukan headset.'); }, 12000);
  } else toast('Lirik otomatis belum bisa dimulai.');
}
function hentiLive() {
  liveOn = false; clearTimeout(hintT);
  if (recL) { try { recL.stop(); } catch (e) {} }
}
audio.addEventListener('playing', mulaiLive);
audio.addEventListener('pause', hentiLive);
audio.addEventListener('ended', () => {
  if (!autoLive) return;
  hentiLive();
  try { if (lines.length > 3) localStorage.setItem(kunci, JSON.stringify(lines)); } catch (e) {}
  if (lines.length > 3) toast('Lirik tersimpan di perangkat ini. Tekan "Salin lirik hasil" agar permanen.');
});
audio.addEventListener('seeked', () => {
  if (!autoLive) return;
  lines = lines.filter(l => l.t < audio.currentTime); renderList();
});

$('salinAuto').addEventListener('click', async () => {
  const txt = lines.map(l => l.t != null ? stampStr(l.t + geser) + ' ' + l.text : l.text).join('\n');
  if (!txt) return toast('Belum ada lirik untuk disalin.');
  try { await navigator.clipboard.writeText(txt); toast('Tersalin. Tempel ke lirik di js/config.js.'); }
  catch (e) { toast('Gagal menyalin otomatis.'); }
});
$('hapus').addEventListener('click', () => {
  try { localStorage.removeItem(kunci); } catch (e) {}
  location.reload();
});