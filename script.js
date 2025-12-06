// --- DATA PRODUK ---
const PRODUCTS = {
    bbc: [
        { id: 'bot-1k', name: 'Paket BOT', description: 'Cocok buat yang cuma mau nambah dikit buat gacha sisanya.', amount: '1.000 BBC', price: 5000, popular: false, quote: '"Masuknya cepet banget! Langsung dapat skin epic."', bought: 257 },
        { id: 'new-5k', name: 'Paket New User', description: 'Ideal untuk pemula yang ingin mencoba gacha di event.', amount: '5.000 BBC', price: 25000, popular: true, quote: '"Pelayanan ramah, BBC langsung cair. Next order lagi!', bought: 890 },
        { id: 'event-10k', name: 'Paket Penguber Event', description: 'Pilihan terbaik untuk mengamankan hadiah utama di event.', amount: '10.000 BBC', price: 50000, popular: true, quote: '"Gak pernah gagal kalau beli di sini, auto-win event!"', bought: 1205 },
        { id: 'anak-emak-20k', name: 'Paket Anak Emak', description: 'Top up borongan, jamin gacor di semua event.', amount: '20.000 BBC', price: 100000, popular: false, quote: '"Harga terbaik se-Indonesia. Mantap admin!', bought: 450 },
        { id: 'anak-moonton-100k', name: 'Paket Anak Moonton', description: 'Khusus sultan yang tidak mau repot. Borong semua!', amount: '100.000 BBC', price: 500000, popular: true, quote: '"Terkirim dalam 5 menit. Gila sih, secepat itu!"', bought: 128 }
    ],
    account: [
        { id: 'acc-lvl-1', name: 'Akun Level 1', description: 'Akun Advanced Server Fresh. Belum ada heronya.', price: 2000, popular: false, quote: '"Akunnya masih perawan, buat leveling sendiri asik."', bought: 310 },
        { id: 'acc-lvl-3', name: 'Akun Level 3', description: 'Siap langsung main di Classic/Rank rendah Advanced Server.', price: 5000, popular: true, quote: '"Murah meriah, akunnya langsung bisa dipakai."', bought: 850 },
        { id: 'acc-lvl-20', name: 'Akun Level 20', description: 'Akun siap gacha dan coba semua fitur Advanced Server.', price: 15000, popular: true, quote: '"Levelnya pas, tinggal gacha event. Recomended."', bought: 520 }
    ]
};

// --- DATA SIMULASI (STOK & ULASAN) ---
let currentBBCStock = 300000;

let REVIEWS = [
    { name: 'Anonim Pembeli', text: 'BBC nya langsung masuk ga pake lama! Recomen bgt buat para penguber event, tancap gas!', date: 'Baru Saja', tag: '#TopUpBBC', new: true },
];

const AUTO_REVIEW_TEMPLATES = [
    { text: 'Prosesnya sat set wat wet. Adminnya gercep pol. 5 bintang deh!', tag: '#TopUpBBC' },
    { text: 'Mantap! Akun Advanced Server sudah diterima. Langsung nyoba hero baru.', tag: '#JasaAkun' },
    { text: 'Top up 10k BBC, 3 menit kelar. Gak kaleng-kaleng ini toko.', tag: '#TopUpBBC' },
    { text: 'Murah banget buat Level 20. Thanks min!', tag: '#JasaAkun' },
    { text: 'Transfer, kirim bukti, langsung diproses. The best!', tag: '#TopUpBBC' },
];

const HERO_LIST = [
    'Miya', 'Layla', 'Zilong', 'Chou', 'Fanny', 'Ling', 'Gusion', 'Faramis', 'Novella (Hero Baru)', 'Lainnya (Tulis Manual)'
];


// --- UTILITY FUNCTIONS ---

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
}

function generateProductCards(category) {
    const container = document.getElementById('product-list-container');
    container.innerHTML = '';
    const products = PRODUCTS[category];

    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';

        let badge = p.popular ? `<span class="popular-badge">⭐ POPULER</span>` : '';

        card.innerHTML = `
            ${badge}
            <h3>${p.name}</h3>
            <p>${p.amount || `Level ${p.name.split(' ')[1]}`}</p>
            <div class="price">${formatRupiah(p.price)}</div>
            <button class="buy-button" onclick="showProductDetail('${category}', '${p.id}')">
                Beli Sekarang
            </button>
        `;
        container.appendChild(card);
    });
}

function changeCategory(category) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.tab-btn[onclick*="${category}"]`).classList.add('active');
    generateProductCards(category);
}

// --- SLIDER LOGIC ---
let slideIndex = 0;
const sliderTrack = document.getElementById('slider-track');
const totalSlides = 4;

function moveSlider() {
    slideIndex++;
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    const offset = -slideIndex * 100;
    sliderTrack.style.transform = `translateX(${offset}%)`;
}

// Start the slider
setInterval(moveSlider, 5000);

// --- NAVIGATION & SIDEBAR ---
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '250px';
    }
}

function showPage(pageId, homeUrl = 'index.html') {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.add('hidden');
    });

    if (pageId === 'home') {
        // Jika Beranda diklik, navigasi ke URL awal (bisa diubah)
        window.location.href = homeUrl;
    } else if (pageId === 'help') {
        document.getElementById('help').classList.remove('hidden');
    } else if (pageId === 'review') {
        document.getElementById('review').classList.remove('hidden');
    } else if (pageId === 'about') {
        document.getElementById('about').classList.remove('hidden');
    } else if (pageId === 'terms') {
        document.getElementById('terms').classList.remove('hidden');
    }
}


// --- MODAL & FORM LOGIC ---

function openModal(id) {
    document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

let currentOrder = {}; // Menyimpan detail pesanan sementara

function showProductDetail(category, productId) {
    const product = PRODUCTS[category].find(p => p.id === productId);
    currentOrder = { category, product };

    const container = document.getElementById('modal-content-container');
    container.innerHTML = ''; // Clear previous content

    // Konten Detail Produk
    let detailHTML = `
        <div class="modal-product-info">
            <h3 class="gradient-text">${product.name} - ${category === 'bbc' ? 'TOPUP BBC' : 'JASA AKUN ADV'}</h3>
            <div class="product-stats">
                ${category === 'bbc' ? `<span class="stock">Stock BBC Tersedia: ${new Intl.NumberFormat('id-ID').format(currentBBCStock)} BBC</span>` : ''}
                <span class="bought">Sudah Terbeli: ${new Intl.NumberFormat('id-ID').format(product.bought)}x</span>
            </div>
            <p>${product.description}</p>
            <blockquote>"${product.quote}"</blockquote>
            <p>Harga: <strong style="color:#fca311; font-size:1.2em;">${formatRupiah(product.price)}</strong></p>
        </div>
        ${category === 'bbc' ? generateBBCForm(product) : generateAccountForm(product)}
    `;

    container.innerHTML = detailHTML;
    openModal('product-detail-modal');

    // Tambahkan listener khusus untuk form Akun
    if (category === 'account') {
        setupAccountFormListeners(product);
    }
}

function generateBBCForm(product) {
    return `
        <form id="bbc-order-form" onsubmit="event.preventDefault(); processBBCPayment('${product.id}')">
            <input type="hidden" name="product-id" value="${product.id}">
            <div class="input-group">
                <label for="bbc-userid">Masukan User ID</label>
                <input type="number" id="bbc-userid" placeholder="Contoh: 12345678" required>
            </div>
            <div class="input-group">
                <label for="bbc-serverid">Masukan Server ID</label>
                <input type="number" id="bbc-serverid" placeholder="Contoh: 1234" required>
            </div>
            <div class="input-group">
                <label for="bbc-nickname">Nickname</label>
                <input type="text" id="bbc-nickname" placeholder="Nickname MLBB Anda" required>
            </div>
            <div class="input-group">
                <label for="bbc-whatsapp">Nomor Whatsapp</label>
                <input type="tel" id="bbc-whatsapp" placeholder="Contoh: 081234567890" required>
            </div>
            <button type="submit" class="checkout-button">Bayar Sekarang (${formatRupiah(product.price)})</button>
        </form>
    `;
}

function generateAccountForm(product) {
    let heroSelectHTML = '';
    const isLeveling = product.id !== 'acc-lvl-1';

    if (isLeveling) {
        let options = HERO_LIST.map(hero => `<option value="${hero}">${hero}</option>`).join('');
        heroSelectHTML = `
            <div class="input-group">
                <label for="acc-hero">Hero Yang Dipakai Untuk Leveling (Min. 1)</label>
                <select id="acc-hero" required>
                    <option value="" disabled selected>Pilih Hero...</option>
                    ${options}
                </select>
            </div>
            <div class="input-group" id="manual-hero-input" style="display:none;">
                <label for="acc-hero-manual">Tulis Nama Hero Manual</label>
                <input type="text" id="acc-hero-manual" placeholder="Contoh: Esmeralda">
            </div>
        `;
    } else {
         heroSelectHTML = `<p style="color:#22c55e;">Level 1 tidak memerlukan pilihan hero.</p>`;
    }


    return `
        <form id="account-order-form" onsubmit="event.preventDefault(); processAccountPayment('${product.id}')">
            <input type="hidden" name="product-id" value="${product.id}">
            <div class="input-group">
                <label for="acc-nickname">Nickname Yang Diinginkan</label>
                <input type="text" id="acc-nickname" placeholder="Contoh: SaktiStore" required>
            </div>
            <div class="input-group">
                <label for="acc-gmail">Gmail Untuk Akun Baru</label>
                <input type="email" id="acc-gmail" placeholder="Contoh: emailanda@gmail.com" required>
            </div>
            ${heroSelectHTML}
             <div class="input-group">
                <label for="acc-whatsapp">Nomor Whatsapp</label>
                <input type="tel" id="acc-whatsapp" placeholder="Contoh: 081234567890" required>
            </div>
            <button type="submit" class="checkout-button">Bayar Sekarang (${formatRupiah(product.price)})</button>
        </form>
    `;
}

function setupAccountFormListeners(product) {
    if (product.id !== 'acc-lvl-1') {
        const heroSelect = document.getElementById('acc-hero');
        const manualHeroInputGroup = document.getElementById('manual-hero-input');
        const manualHeroInput = document.getElementById('acc-hero-manual');

        heroSelect.addEventListener('change', function() {
            if (this.value === 'Lainnya (Tulis Manual)') {
                manualHeroInputGroup.style.display = 'block';
                manualHeroInput.setAttribute('required', 'required');
                heroSelect.removeAttribute('required'); // Nonaktifkan required di dropdown
                heroSelect.disabled = true; // Nonaktifkan dropdown
            } else {
                manualHeroInputGroup.style.display = 'none';
                manualHeroInput.removeAttribute('required');
                heroSelect.setAttribute('required', 'required');
                heroSelect.disabled = false; // Aktifkan dropdown
            }
        });
    }
}


function processBBCPayment(productId) {
    const product = PRODUCTS.bbc.find(p => p.id === productId);
    
    // Ambil data dari form
    const userId = document.getElementById('bbc-userid').value;
    const serverId = document.getElementById('bbc-serverid').value;
    const nickname = document.getElementById('bbc-nickname').value;
    const whatsapp = document.getElementById('bbc-whatsapp').value;

    if (!userId || !serverId || !nickname || !whatsapp) return; // Basic validation

    currentOrder = {
        type: 'BBC',
        ...product,
        userId,
        serverId,
        nickname,
        whatsapp,
        price: product.price
    };

    closeModal('product-detail-modal');
    document.getElementById('payment-total-price').textContent = formatRupiah(product.price);
    // Ganti URL QRIS jika diperlukan:
    // document.getElementById('qris-image').src = "URL_QRIS_BARU_ANDA";
    
    // Atur listener konfirmasi pembayaran
    document.getElementById('confirm-payment-btn').onclick = () => confirmPayment('bbc');
    openModal('payment-modal');

    // Logika simulasi stok berkurang (simulasi pembelian)
    simulateStockReduction(product.amount);
}

function processAccountPayment(productId) {
    const product = PRODUCTS.account.find(p => p.id === productId);

    // Ambil data dari form
    const nickname = document.getElementById('acc-nickname').value;
    const gmail = document.getElementById('acc-gmail').value;
    const whatsapp = document.getElementById('acc-whatsapp').value;
    
    let hero = '';
    if (product.id !== 'acc-lvl-1') {
        const heroSelect = document.getElementById('acc-hero');
        if (heroSelect.value === 'Lainnya (Tulis Manual)') {
            hero = document.getElementById('acc-hero-manual').value;
        } else {
            hero = heroSelect.value;
        }
    } else {
        hero = 'Tidak Perlu (Level 1)';
    }

    if (!nickname || !gmail || !whatsapp) return; // Basic validation

    currentOrder = {
        type: 'Akun',
        ...product,
        nickname,
        gmail,
        hero,
        whatsapp,
        price: product.price
    };

    closeModal('product-detail-modal');
    document.getElementById('payment-total-price').textContent = formatRupiah(product.price);
    // Ganti URL QRIS jika diperlukan:
    // document.getElementById('qris-image').src = "URL_QRIS_BARU_ANDA";
    
    // Atur listener konfirmasi pembayaran
    document.getElementById('confirm-payment-btn').onclick = () => confirmPayment('account');
    openModal('payment-modal');
}


function confirmPayment(type) {
    const proofFile = document.getElementById('proof-upload').files[0];

    if (!proofFile) {
        alert('Mohon unggah screenshot bukti transfer Anda terlebih dahulu!');
        return;
    }

    closeModal('payment-modal');

    let orderDetails = '';
    if (type === 'bbc') {
        orderDetails = `
            *DETAIL PESANAN TOPUP BBC:*
            - Produk: ${currentOrder.name} (${currentOrder.amount})
            - Harga: ${formatRupiah(currentOrder.price)}
            - User ID: ${currentOrder.userId}(${currentOrder.serverId})
            - Nickname: ${currentOrder.nickname}
        `;
    } else if (type === 'account') {
        orderDetails = `
            *DETAIL PESANAN JASA AKUN ADVANCED SERVER:*
            - Produk: ${currentOrder.name}
            - Harga: ${formatRupiah(currentOrder.price)}
            - Nickname: ${currentOrder.nickname}
            - Gmail: ${currentOrder.gmail}
            - Hero Leveling: ${currentOrder.hero}
        `;
    }

    const whatsappMessage = `
Halo Admin Sakti Store! Saya sudah melakukan pembayaran.
${orderDetails}
---
*Catatan:*
- Nomor WA Pembeli: ${currentOrder.whatsapp}
- Bukti transfer akan dikirim di chat ini.

Mohon diproses ya, terima kasih!
`;

    // Arahkan ke WhatsApp Admin (Ganti nomor WA)
    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(whatsappMessage)}`;

    // PENTING: Karena tidak ada API untuk mengirim file, user harus mengirim file secara manual
    alert("Pembayaran terkonfirmasi! Anda akan diarahkan ke WhatsApp Admin untuk mengirim bukti transfer dan diproses. Pastikan file bukti transfer sudah siap.");
    window.open(waUrl, '_blank');
}


// --- REVIEW LOGIC ---

function displayReviews() {
    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';
    
    // Tampilkan yang terbaru dulu
    REVIEWS.reverse().forEach(r => {
        const box = document.createElement('div');
        box.className = `review-box ${r.new ? 'new' : ''}`;
        box.innerHTML = `
            <div class="review-header">
                <span class="review-name">**${r.name}**</span>
                <span class="review-date">${r.date}</span>
            </div>
            <p class="review-text">${r.text}</p>
            <span class="review-tag">${r.tag}</span>
        `;
        reviewList.appendChild(box);
    });
    // Balikkan lagi agar data array tetap konsisten
    REVIEWS.reverse();
}

function submitReview() {
    const name = document.getElementById('reviewer-name').value || 'Anonim';
    const comment = document.getElementById('reviewer-comment').value;

    if (comment.trim() === '') {
        alert('Ulasan tidak boleh kosong!');
        return;
    }

    const newReview = {
        name: name,
        text: comment,
        date: 'Baru Saja',
        tag: '#PelangganBaru',
        new: true
    };

    REVIEWS.push(newReview);
    displayReviews();

    document.getElementById('reviewer-name').value = '';
    document.getElementById('reviewer-comment').value = '';

    alert('Ulasan Anda berhasil dikirim dan ditampilkan!');
}

function autoAddReview() {
    const template = AUTO_REVIEW_TEMPLATES[Math.floor(Math.random() * AUTO_REVIEW_TEMPLATES.length)];
    const newReview = {
        name: `Pembeli Rahasia ${Math.floor(Math.random() * 100)}`,
        text: template.text,
        date: 'Baru Saja',
        tag: template.tag,
        new: true
    };
    
    // Hapus label 'new' dari semua ulasan yang sudah ada
    REVIEWS.forEach(r => r.new = false);

    // Tambahkan ulasan baru
    REVIEWS.push(newReview);
    // Batasi jumlah ulasan agar tidak terlalu panjang
    if (REVIEWS.length > 10) {
        REVIEWS.shift(); 
    }
    
    displayReviews();
}

// Set interval untuk menambahkan ulasan otomatis (Simulasi)
setInterval(autoAddReview, 30000); // Setiap 30 detik muncul ulasan baru

// --- STOK & PEMBARUAN OTOMATIS ---

function simulateStockReduction(amountStr) {
    const amount = parseInt(amountStr.replace(/\./g, '').replace(' BBC', ''));

    // Hanya kurangi stok jika TopUp BBC
    if (amount) {
        currentBBCStock = Math.max(0, currentBBCStock - amount);
        // Tambah jumlah pembelian produk yang dibeli
        const product = PRODUCTS.bbc.find(p => p.amount === amountStr);
        if (product) {
            product.bought += 1;
        }

        // Tampilkan notifikasi stok berkurang (di console/log)
        console.log(`Stok BBC berkurang ${amount}. Sisa: ${currentBBCStock} BBC.`);
    }

    // Perbarui display produk jika sedang di halaman home
    if (!document.getElementById('home').classList.contains('hidden')) {
        changeCategory('bbc');
    }
}

function resetStockDaily() {
    // Simulasi reset stok di hari berikutnya (setelah 24 jam)
    currentBBCStock = 300000;
    console.log('Stok BBC direset menjadi 300.000 BBC.');
}

// Set interval untuk simulasi pengurangan stok (setiap 30 menit)
// Untuk tujuan demo, kita buat interval lebih pendek
setInterval(() => simulateStockReduction('10.000 BBC'), 1800000); // 30 menit = 1800000 ms
// Set timeout untuk reset stok (Untuk tujuan demo, tidak diaktifkan)
// setTimeout(resetStockDaily, 86400000); // Reset stok setelah 24 jam

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi tampilan awal
    changeCategory('bbc');
    displayReviews();
    
    // Pastikan halaman awal aktif
    document.getElementById('home').classList.remove('hidden');
});
