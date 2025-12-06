// --- Pengaturan Global ---
const ADMIN_WA = "6281234567890"; // GANTI DENGAN NOMOR WHATSAPP ADMIN ANDA!
const QRIS_IMAGE_URL = "https://i.imgur.com/your-qris-image.png"; // GANTI DENGAN URL GAMBAR QRIS ANDA!

// Ganti dengan link Anda
const BERANDA_URL = "https://saktistore.vercel.app"; 
const TESTIMONI_CHANNEL_URL = "https://whatsapp.com/channel/your-testimoni-channel"; 
const ADMIN_GMAIL = "admin@saktistore.com";
const ADMIN_TELEGRAM = "sakti_store_admin";

// Stok BBC Global
let currentBBCStock = 300000;
const INITIAL_SALES = {
    "Paket BOT 1.000 BBC": 150,
    "Paket New User 5.000 BBC": 320,
    "Paket Penguber Event 10.000 BBC": 80,
    "Paket Anak Emak 20.000 BBC": 210,
    "Paket Anak Montoon 100.000 BBC": 45,
    "Akun Level 1 Advanced Server": 50,
    "Akun Level 3 Advanced Server": 180,
    "Akun Level 20 Advanced Server": 75,
};

// --- Fungsi Stok BBC dan Penjualan Otomatis ---
function updateStockDisplay(modalId, item, productType) {
    const sold = INITIAL_SALES[item] || 0;
    
    if (productType === 'diamond') {
        document.getElementById('diamond-stock').textContent = `Stok Tersedia: ${new Intl.NumberFormat('id-ID').format(currentBBCStock)} BBC`;
        document.getElementById('diamond-sold').textContent = new Intl.NumberFormat('id-ID').format(sold);
    } else if (productType === 'akun') {
        // Akun tidak pakai stok BBC
        document.getElementById('akun-sold').textContent = new Intl.NumberFormat('id-ID').format(sold);
    }
}

function decreaseStock() {
    // Kurangi stok BBC secara acak (simulasi pembelian)
    const randomDecrease = Math.floor(Math.random() * 5000) + 1000; // Kurangi 1000 hingga 6000
    if (currentBBCStock > 0) {
        currentBBCStock = Math.max(0, currentBBCStock - randomDecrease);
        console.log(`[STOK] BBC berkurang ${randomDecrease}. Sisa: ${currentBBCStock}`);

        // Jika stok habis, reset di hari berikutnya (simulasi)
        if (currentBBCStock === 0) {
            setTimeout(() => {
                currentBBCStock = 300000; // Reset stok
                console.log("[STOK] Stok BBC direset hari baru.");
            }, 86400000); // 24 jam (simulasi reset harian)
        }
    }
}
// Jalankan pengurangan stok setiap 30 menit (30 * 60 * 1000 ms)
setInterval(decreaseStock, 30 * 60 * 1000); 


// --- Slider dan Kategori (Kode lama tetap dipertahankan) ---
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const sliderContainer = document.querySelector('.slider-container');
const dotsContainer = document.querySelector('.dots-container');
let slideInterval;

// ... (Fungsi showSlides dan inisialisasi dots tetap sama seperti skrip sebelumnya) ...
function showSlides() {
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    
    sliderContainer.style.transform = `translateX(-${slideIndex * (100 / slides.length)}%)`;

    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex].classList.add('active');
}

slides.forEach((slide, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        slideIndex = index - 1; 
        clearInterval(slideInterval);
        showSlides();
        slideInterval = setInterval(showSlides, 5000); 
    });
    dotsContainer.appendChild(dot);
});

// --- Inisialisasi Slider ---
showSlides(); 
slideInterval = setInterval(showSlides, 5000); 

const categoryCards = document.querySelectorAll('.category-card');
const productBbc = document.getElementById('product-bbc');
const productAkun = document.getElementById('product-akun');

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        categoryCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const category = card.getAttribute('data-category');

        if (category === 'bbc') {
            productBbc.classList.remove('hidden');
            productAkun.classList.add('hidden');
        } else if (category === 'akun') {
            productBbc.classList.add('hidden');
            productAkun.classList.remove('hidden');
        }
    });
});


// --- Quotes Otomatis (Simulasi) ---
const quotes = [
    "Prosesnya cepet banget! Gak sampe 5 menit BBC udah masuk. Recommended!",
    "Admin fast respon, akun Level 20-nya langsung bisa dipake main rank. Mantap jiwa!",
    "Harga paling murah dibanding yang lain. Pokoknya langganan di SaktiStore!",
    "Awalnya ragu, tapi ternyata terpercaya. Topup BBC buat nge-bot gak pake lama.",
    "Beli akun level 3 buat nyoba event, heronya lumayan. Puas deh!",
];
function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// --- Logika Modal (Pop-up) Pembelian ---
const buyButtons = document.querySelectorAll('.buy-button');
const modals = {
    diamond: document.getElementById('modal-diamond'),
    akun: document.getElementById('modal-akun'),
    qris: document.getElementById('modal-qris')
};

buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productType = button.getAttribute('data-product');
        const card = button.closest('.product-card');
        const itemName = card.getAttribute('data-item');
        const itemPrice = card.getAttribute('data-price');
        const itemDesc = card.getAttribute('data-desc');
        const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(itemPrice);

        // Update stok/sold info
        updateStockDisplay(productType === 'diamond' ? 'modal-diamond' : 'modal-akun', itemName, productType);
        
        if (productType === 'diamond') {
            document.getElementById('modal-diamond-title').textContent = itemName;
            document.getElementById('diamond-desc').textContent = itemDesc;
            document.getElementById('diamond-item').value = itemName;
            document.getElementById('diamond-price').value = itemPrice;
            document.getElementById('diamond-quote').textContent = `"${getRandomQuote()}"`;
            modals.diamond.style.display = 'block';
        } else if (productType === 'akun') {
            document.getElementById('modal-akun-title').textContent = itemName;
            document.getElementById('akun-desc').textContent = itemDesc;
            document.getElementById('akun-item').value = itemName;
            document.getElementById('akun-price').value = itemPrice;
            document.getElementById('akun-quote').textContent = `"${getRandomQuote()}"`;
            
            // Logika Hero Dropdown untuk Akun
            const level = parseInt(itemName.match(/Level (\d+)/i)[1]);
            const heroSelect = document.getElementById('akun-hero-select');
            const heroManual = document.getElementById('akun-hero-manual');
            
            heroManual.value = ''; // Reset manual input
            
            if (level === 1) {
                 // Level 1: Non-aktifkan pilihan hero
                document.getElementById('hero-selection-area').style.display = 'none';
                heroSelect.removeAttribute('required');
                heroManual.style.display = 'none';
            } else {
                // Level 3 & 20: Aktifkan pilihan hero
                document.getElementById('hero-selection-area').style.display = 'block';
                heroSelect.setAttribute('required', 'required');
                heroSelect.selectedIndex = 0; // Reset ke "Pilih Hero (Wajib)"
            }
            modals.akun.style.display = 'block';
        }
    });
});

// Menutup modal
document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const modalId = button.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'none';
    });
});

window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// --- Logika Hero Dropdown Fleksibel (Akun) ---
document.getElementById('akun-hero-select').addEventListener('change', function() {
    const heroSelect = this;
    const heroManual = document.getElementById('akun-hero-manual');
    
    if (heroSelect.value === 'Lainnya (Tulis Manual)') {
        heroManual.style.display = 'block';
        heroManual.setAttribute('required', 'required');
        heroSelect.removeAttribute('required');
        heroSelect.disabled = true; // Nonaktifkan dropdown
    } else {
        heroManual.style.display = 'none';
        heroManual.removeAttribute('required');
        heroSelect.setAttribute('required', 'required');
        heroSelect.disabled = false;
    }
});


// --- Logika Form Submission (Persiapan QRIS) ---

let currentOrderDetails = {};

function prepareQrisModal(formId, data) {
    const itemName = data.item;
    const itemPrice = data.price;
    const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(itemPrice);
    
    // Simpan detail pesanan untuk konfirmasi WhatsApp
    currentOrderDetails = data;
    currentOrderDetails.type = formId === 'form-diamond' ? 'BBC/Diamond' : 'Akun';
    currentOrderDetails.formattedPrice = formattedPrice;

    // Tampilkan modal QRIS
    document.getElementById('qris-item-name').textContent = itemName;
    document.getElementById('qris-item-price').textContent = formattedPrice;
    document.getElementById('qris-image').src = QRIS_IMAGE_URL;
    
    // Reset input file
    document.getElementById('bukti-transfer').value = ''; 
    
    modals.qris.style.display = 'block';
}

document.getElementById('form-diamond').addEventListener('submit', function(event) {
    event.preventDefault();
    modals.diamond.style.display = 'none'; 
    const data = {
        item: document.getElementById('diamond-item').value,
        price: document.getElementById('diamond-price').value,
        id: document.getElementById('diamond-id').value,
        server: document.getElementById('diamond-server').value,
        nickname: document.getElementById('diamond-nickname').value,
        wa: document.getElementById('diamond-wa').value,
    };
    prepareQrisModal('form-diamond', data);
});

document.getElementById('form-akun').addEventListener('submit', function(event) {
    event.preventDefault();
    modals.akun.style.display = 'none'; 
    
    // Tentukan nilai hero yang dipilih
    const heroSelect = document.getElementById('akun-hero-select');
    const heroManual = document.getElementById('akun-hero-manual');
    
    let heroValue = "Tidak Dipilih (Level 1)"; // Default untuk Level 1
    
    const levelElement = document.getElementById('modal-akun-title').textContent;
    if (!levelElement.includes("Level 1")) {
        if (heroSelect.value === 'Lainnya (Tulis Manual)') {
            heroValue = heroManual.value || "Lainnya (Tidak Diisi)";
        } else {
            heroValue = heroSelect.value;
        }
    }


    const data = {
        item: document.getElementById('akun-item').value,
        price: document.getElementById('akun-price').value,
        nickname: document.getElementById('akun-nickname').value,
        email: document.getElementById('akun-email').value,
        hero: heroValue,
    };
    prepareQrisModal('form-akun', data);
});

// --- Logika Konfirmasi QRIS + WhatsApp Admin ---
document.getElementById('form-konfirmasi-qris').addEventListener('submit', function(event) {
    event.preventDefault();
    modals.qris.style.display = 'none';

    const buktiTransferFile = document.getElementById('bukti-transfer').files[0];
    const fileName = buktiTransferFile ? buktiTransferFile.name : 'TIDAK ADA FILE DIUPLOAD';
    
    let waMessage = `*KONFIRMASI PEMBAYARAN - SAKTI STORE*\n\n`;
    waMessage += `*Pesanan*: ${currentOrderDetails.item}\n`;
    waMessage += `*Harga*: ${currentOrderDetails.formattedPrice}\n`;

    if (currentOrderDetails.type === 'BBC/Diamond') {
        waMessage += `*Tipe*: Topup BBC\n`;
        waMessage += `*ID/Server*: ${currentOrderDetails.id} (${currentOrderDetails.server})\n`;
        waMessage += `*Nickname*: ${currentOrderDetails.nickname}\n`;
        waMessage += `*No. WA Pembeli*: ${currentOrderDetails.wa}\n`;
    } else { // Akun
        waMessage += `*Tipe*: Jasa Akun Advanced Server\n`;
        waMessage += `*Nickname Req*: ${currentOrderDetails.nickname}\n`;
        waMessage += `*Email*: ${currentOrderDetails.email}\n`;
        waMessage += `*Hero Leveling*: ${currentOrderDetails.hero}\n`;
    }

    waMessage += `\n*Bukti Transfer*: (Gambar terlampir/File: ${fileName})\n`;
    waMessage += `\nMohon segera diproses, terima kasih.`;

    const waLink = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(waMessage)}`;

    // Arahkan ke WhatsApp (Pengguna harus melampirkan file secara manual)
    window.open(waLink, '_blank');
});


// --- Logika Sidebar Navigasi ---
function openNav() {
    document.getElementById("sidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
}

function showPage(pageId) {
    // Sembunyikan semua halaman
    document.querySelectorAll('.main-content-wrapper, .page-content').forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('active-page');
    });

    // Tampilkan halaman yang dipilih
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        targetPage.classList.add('active-page');
    }
    
    // Khusus untuk Beranda
    if (pageId === 'home') {
        window.location.href = BERANDA_URL; // Arahkan ke URL Beranda yang diset
    }
}

// --- Inisialisasi Link Halaman Bantuan Admin ---
document.getElementById('wa-admin-link').href = `https://wa.me/${ADMIN_WA}?text=Halo%20Admin%2C%20saya%20membutuhkan%20bantuan%20mengenai%20website.`;
document.getElementById('gmail-admin-link').href = `mailto:${ADMIN_GMAIL}?subject=Bantuan%20Website%20SaktiStore`;
document.getElementById('telegram-admin-link').href = `https://t.me/${ADMIN_TELEGRAM}`;
document.getElementById('testimoni-channel-link').href = TESTIMONI_CHANNEL_URL;

// --- Logika Review Pelanggan (Simulasi Non-Database) ---

const initialReviews = [
    { name: "UserMLBB87", text: "BBC-nya masuk cepet banget. Admin gercep. Pokoknya gacorr!" },
    { name: "SultanAS", text: "Akun level 20 udah siap tempur, hero mantap. Thank you SaktiStore!" },
    { name: "Noname12", text: "Pelayanan mantap, harganya pas di kantong pelajar. TOP!" }
];

const automaticReviews = [
    "Wih, baru beli akun level 3, gak nyangka dapet hero bagus! Fix langganan!",
    "Barusan topup BBC, prosesnya kilat kayak jet! Bintang 5 deh.",
    "Bisa dapet BBC murah, sekarang bisa nge-bot tanpa khawatir. Ciamik!",
    "Gak pake ribet input data, langsung sat set. Recommended buat player sibuk.",
    "Akhirnya nemu tempat topup AS terpercaya. Mantap, Bosku!",
];

function loadReviews() {
    let reviews = JSON.parse(localStorage.getItem('saktistore_reviews')) || initialReviews;
    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = ''; // Bersihkan list

    reviews.forEach((review, index) => {
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card');
        
        // Label BARU hanya untuk review yang baru ditambahkan secara otomatis
        if (review.isNew) {
            reviewCard.classList.add('new');
        }

        reviewCard.innerHTML = `
            <p class="review-text">"${review.text}"</p>
            <p class="reviewer">- ${review.name}</p>
        `;
        reviewList.appendChild(reviewCard);
    });
}

function addAutomaticReview() {
    const randomText = automaticReviews[Math.floor(Math.random() * automaticReviews.length)];
    const randomName = `UserAnon${Math.floor(Math.random() * 900) + 100}`;

    const newReview = { name: randomName, text: randomText, isNew: true };
    
    let reviews = JSON.parse(localStorage.getItem('saktistore_reviews')) || initialReviews;
    reviews.unshift(newReview); // Tambahkan di paling atas

    // Batasi jumlah ulasan yang disimpan
    reviews = reviews.slice(0, 10); 

    // Hapus label 'new' dari ulasan lama setelah beberapa saat
    reviews.forEach(r => r.isNew = false); 
    
    localStorage.setItem('saktistore_reviews', JSON.stringify(reviews));
    if (document.getElementById('review').classList.contains('active-page')) {
        loadReviews();
    }
}

// Jalankan penambahan ulasan otomatis setiap 2 menit (Simulasi)
setInterval(addAutomaticReview, 2 * 60 * 1000); 

// Form Submission untuk Ulasan Manual
document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('review-name').value || 'Anonim';
    const text = document.getElementById('review-text').value;

    if (text.trim() !== '') {
        const newReview = { name: name, text: text, isNew: true };
        let reviews = JSON.parse(localStorage.getItem('saktistore_reviews')) || initialReviews;
        reviews.unshift(newReview);
        
        // Batasi jumlah ulasan yang disimpan
        reviews = reviews.slice(0, 10);
        
        localStorage.setItem('saktistore_reviews', JSON.stringify(reviews));
        
        // Reset form
        document.getElementById('review-form').reset();
        
        // Reload list
        loadReviews();
        alert('Ulasan Anda berhasil dikirim!');
    }
});

// Load reviews saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Pastikan link beranda mengarah ke URL yang diset
    document.querySelector('.navbar .logo').href = BERANDA_URL;
    document.querySelector('.sidebar a[href="#home"]').href = BERANDA_URL;

    loadReviews(); 
});