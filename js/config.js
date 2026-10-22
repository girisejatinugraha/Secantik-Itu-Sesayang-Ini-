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
    'foto/1.jpg',
    'foto/2.jpg',
    'foto/3.jpg',
    'foto/4.jpg',
    'foto/5.jpg'
  ],
  gantiFotoDetik: 5,

  // Penyetel waktu lirik (dipakai selama lirik belum diberi waktu lewat #sinkron)
  lirikMulai: 15,      // detik ke berapa penyanyi mulai bernyanyi
  lirikSelesai: 200,   // detik ke berapa kalimat terakhir selesai
  geserDetik: 0,       // geser semua lirik: + = lebih lambat, - = lebih cepat

  // Lirik. Baris yang diawali tanda # hanya catatan bagian lagu (tidak ditampilkan).
  // Lirik boleh tanpa waktu. Agar tampil tepat waktu, buka index.html#sinkron
  // lalu tekan tombol di tiap baris, dan salin hasilnya ke sini
  // (format hasil: [menit:detik] teks).
  // KOSONGKAN `lirik` = lirik dibuat otomatis dari suara lagu saat diputar.
  // Isi `lirik` = lirik itu dipakai (boleh berwaktu atau tidak).
  // Lirik yang pernah kamu tempel disimpan di `lirikTersimpan` di bawah;
  // salin isinya ke `lirik` kalau mau memakainya lagi.
  lirik: '',
  bahasa: 'id-ID',     // bahasa nyanyian untuk pengenalan suara

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

# Verse 2
Aku suka caramu tertawa
Bahkan saat harimu tak sempurna
Aku suka saat kau bercerita
Tentang hal kecil yang orang lupa

Dan jika nanti kau merasa biasa
Merasa tak seindah yang kukatakan
Ingatlah, di mataku kau tetap istimewa
Bahkan saat kau tak sedang berusaha

# Pre-chorus 2
Tak perlu menjadi siapa-siapa
Tak perlu sempurna untuk kucinta
Kalau kau bertanya apa yang kupinta
Tetaplah di sini, selama kau bahagia

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

# Bridge
Jika suatu hari cermin tak lagi
Memperlihatkan cantik yang kau miliki
Biar aku yang mengingatkanmu
Bahwa indahmu tak pernah sesederhana itu

Dan jika nanti rambutmu memutih
Langkah kita tak secepat hari ini
Aku ingin tetap menjadi lelaki
Yang memandangmu dengan mata jatuh cinta lagi

# Final chorus
Kau secantik itu, sesayang ini
Bahkan setelah ribuan hari
Tak ada wajah yang ingin kucari
Selain wajahmu saat membuka pagi

Kau secantik itu, sesayang ini
Kalau boleh meminta sekali lagi
Di kehidupan mana pun aku nanti
Semoga semesta mengantarkanku padamu lagi

# Outro
Dan bila kau lupa betapa berharganya dirimu
Dengarkan lagu ini, ingatlah aku
Kau tak harus mengerti seluruh isi hatiku
Cukup tahu satu hal...

Aku secinta itu, karena kamu.
`
};