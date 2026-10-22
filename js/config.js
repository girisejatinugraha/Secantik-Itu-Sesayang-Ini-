/* =====================================================================
   PENGATURAN — cukup ubah file ini
   ===================================================================== */
const CONFIG = {
  judul: 'Secantik Itu, Sesayang Ini',
  untuk: 'Sayang "Welly Karmelia"',                  // lagu ini untuk siapa
  liriknyaOleh: 'Giri Sejati Nugraha',           // lirik lagu dibuat oleh siapa
  suaraOleh: 'SUNO AI',
  // File lagu: taruh di folder "musik", atau pakai tautan langsung
  // berakhiran .mp3 / .m4a / .ogg / .wav
  suara: 'musik/sound-lirik.mpeg',

  // Foto orang tersayang: taruh di folder "foto". Tambah sebanyak yang kamu mau.
  foto: [
    'foto/Foto1.jpeg',
    'foto/Foto2.jpeg',
    'foto/Foto3.jpeg',
    'foto/Foto4.jpeg'
  ],
  gantiFotoDetik: 3,

  // Penyetel waktu lirik (dipakai hanya jika lirik tanpa waktu)
  lirikMulai: 15,
  lirikSelesai: 200,

  // DELAY LIRIK: geser semua lirik sekaligus.
  //   + (mis. 0.8)  = lirik tampil LEBIH LAMBAT
  //   - (mis. -0.8) = lirik tampil LEBIH CEPAT
  // Di halaman juga ada tombol tunda/maju (±0,5 dtk) untuk mencoba langsung.
  geserDetik: 0,

  // Lirik berwaktu, format [menit:detik] teks. Baris diawali # = catatan bagian lagu.
  // Waktu disusun dari analisis musik sound-lirik.mpeg: reff 1 (±1:19) dan reff 2
  // (±2:38) berjarak 79,2 dtk, jeda instrumental ±3:50, reff akhir ±4:00, outro ±4:33.
  lirik: `
# Verse 1
[00:14.00] Pernah kucoba mencari kata
[00:20.00] Untuk menjelaskan indahnya dirimu
[00:27.00] Tapi setiap kali kupandang wajahmu
[00:33.00] Semua kalimat hilang satu per satu
[00:41.00] Ada yang berbeda dari senyummu
[00:47.00] Seolah dunia berhenti sebentar
[00:54.00] Dan di antara jutaan manusia
[01:00.00] Hatiku selalu tahu ke mana pulang

# Pre-chorus
[01:07.00] Kau mungkin tak pernah menyadari
[01:10.00] Apa yang kulihat saat menatapmu
[01:13.00] Bukan hanya cantik yang terlihat mata
[01:16.00] Tapi alasan aku jatuh cinta selalu

# Chorus
[01:21.00] Kau secantik itu, sesayang ini
[01:24.00] Sampai tak sanggup kujelaskan lagi
[01:27.00] Kalau seluruh dunia bertanya padaku
[01:30.00] Mengapa kamu, jawabanku tetap kamu
[01:34.00] Kau secantik itu, sesayang ini
[01:37.00] Tak pernah bosan jatuh cinta lagi
[01:40.00] Bila waktu mengubah semua yang ada
[01:44.00] Jangan takut, cintaku tak ikut menua
[01:47.00] Sebab dari sekian banyak cerita
[01:50.00] Kaulah yang ingin kupilih selamanya

# Verse 2
[02:00.00] Aku suka caramu tertawa
[02:04.00] Bahkan saat harimu tak sempurna
[02:07.00] Aku suka saat kau bercerita
[02:10.00] Tentang hal kecil yang orang lupa
[02:14.00] Dan jika nanti kau merasa biasa
[02:17.00] Merasa tak seindah yang kukatakan
[02:20.00] Ingatlah, di mataku kau tetap istimewa
[02:24.00] Bahkan saat kau tak sedang berusaha

# Pre-chorus 2
[02:27.00] Tak perlu menjadi siapa-siapa
[02:30.00] Tak perlu sempurna untuk kucinta
[02:33.00] Kalau kau bertanya apa yang kupinta
[02:36.00] Tetaplah di sini, selama kau bahagia

# Chorus
[02:40.00] Kau secantik itu, sesayang ini
[02:43.00] Sampai tak sanggup kujelaskan lagi
[02:46.00] Kalau seluruh dunia bertanya padaku
[02:50.00] Mengapa kamu, jawabanku tetap kamu
[02:53.00] Kau secantik itu, sesayang ini
[02:56.00] Tak pernah bosan jatuh cinta lagi
[03:00.00] Bila waktu mengubah semua yang ada
[03:03.00] Jangan takut, cintaku tak ikut menua
[03:06.00] Sebab dari sekian banyak cerita
[03:09.00] Kaulah yang ingin kupilih selamanya

# Bridge
[03:19.00] Jika suatu hari cermin tak lagi
[03:22.00] Memperlihatkan cantik yang kau miliki
[03:26.00] Biar aku yang mengingatkanmu
[03:29.00] Bahwa indahmu tak pernah sesederhana itu
[03:32.00] Dan jika nanti rambutmu memutih
[03:35.00] Langkah kita tak secepat hari ini
[03:38.00] Aku ingin tetap menjadi lelaki
[03:42.00] Yang memandangmu dengan mata jatuh cinta lagi

# Final chorus
[03:49.00] Kau secantik itu, sesayang ini
[03:52.00] Bahkan setelah ribuan hari
[03:55.00] Tak ada wajah yang ingin kucari
[03:58.00] Selain wajahmu saat membuka pagi
[04:02.00] Kau secantik itu, sesayang ini
[04:05.00] Kalau boleh meminta sekali lagi
[04:09.00] Di kehidupan mana pun aku nanti
[04:12.00] Semoga semesta mengantarkanku padamu lagi

# Outro
[04:28.00] Dan bila kau lupa betapa berharganya dirimu
[04:34.00] Dengarkan lagu ini, ingatlah aku
[04:41.00] Kau tak harus mengerti seluruh isi hatiku
[04:48.00] Cukup tahu satu hal...
[04:51.00] Aku secinta itu, karena kamu.
`,
  bahasa: 'id-ID',     // bahasa nyanyian untuk pengenalan suara

  // Lirik asli tanpa waktu (cadangan)
  lirikTersimpan: `
# Verse 1
Pernah kucoba mencari kata
Untuk menjelaskan indahnya dirimu
Tapi setiap kali kupandang wajahmu
Semua kalimat hilang satu per satu

Ada yang berbeda dari senyummu
Seolah dunia berhenti sebentar
Dan di antara jutaan manusia
Hatiku selalu tahu ke mana pulang

# Pre-chorus
Kau mungkin tak pernah menyadari
Apa yang kulihat saat menatapmu
Bukan hanya cantik yang terlihat mata
Tapi alasan aku jatuh cinta selalu

# Chorus
Kau secantik itu, sesayang ini
Sampai tak sanggup kujelaskan lagi
Kalau seluruh dunia bertanya padaku
Mengapa kamu, jawabanku tetap kamu

Kau secantik itu, sesayang ini
Tak pernah bosan jatuh cinta lagi
Bila waktu mengubah semua yang ada
Jangan takut, cintaku tak ikut menua

Sebab dari sekian banyak cerita
Kaulah yang ingin kupilih selamanya
`
};