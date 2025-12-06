// --- Pengaturan Global & Konstanta ---
const ADMIN_WA = "6281234567890"; // GANTI DENGAN NOMOR WHATSAPP ADMIN ANDA!
const QRIS_IMAGE_URL = "https://via.placeholder.com/300x300/3b2c8c/ffd700?text=SCAN+QRIS+DI+SINI"; // GANTI DENGAN URL GAMBAR QRIS ANDA!

const BERANDA_URL = "#home"; // Menggunakan anchor untuk navigasi dalam satu halaman
const TESTIMONI_CHANNEL_URL = "https://whatsapp.com/channel/your-testimoni-channel"; 
const ADMIN_GMAIL = "admin@saktistore.com";
const ADMIN_TELEGRAM = "sakti_store_admin";

// Stok BBC Global
let currentBBCStock = 300000;
const INITIAL_SALES = {
    "Paket BOT 1.000 BBC": 150, "Paket New User 5.000 BBC": 320,
    "Paket Penguber Event 10.000 BBC": 80, "Paket Anak Emak 20.000 BBC": 210,
    "Paket Anak Montoon 100.000 BBC": 45, "Akun Level 1 Advanced Server": 50,
    "Akun Level 3 Advanced Server": 180, "Akun Level 20 Advanced Server": 75,
};
let currentOrderDetails = {};

// --- Helper Functions ---

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
}

function updateStockDisplay(item, productType) {
    const sold = INITIAL_SALES[item] || 0;
    
    if (productType === 'diamond') {
        document.getElementById('diamond-stock').textContent = `Stock Tersedia: ${new Intl.NumberFormat('id-ID').format(currentBBCStock)} BBC`;
        document.getElementById('diamond-sold').textContent = new Intl.NumberFormat('id-ID').format(sold);
    } else if (productType === 'akun') {
        document.getElementById('akun-sold').textContent = new Intl.NumberFormat('id-ID').format(sold);
    }
}

function decreaseStock() {
    const randomDecrease = Math.floor(Math.random() * 5000) + 1000; 
    if (currentBBCStock > 0) {
        currentBBCStock = Math.max(0, currentBBCStock - randomDecrease);
    }
    // Jika stok habis (simulasi reset harian)
    if (currentBBCStock === 0) {
        setTimeout(() => { currentBBCStock = 300000; }, 86400000); 
    }
}
setInterval(decreaseStock, 30 * 60 * 1000); // Setiap 30 menit

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


// --- Slider Logic ---
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const sliderContainer = document.querySelector('.slider-container');

function showSlides() {
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    const slideWidthPercentage = 100 / slides.length;
    sliderContainer.style.transform = `translateX(-${slideIndex * slideWidthPercentage}%)`;

    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots.length) dots[slideIndex].classList.add('active');
}

function initSlider() {
    const dotsContainer = document.querySelector('.dots-container');
    slides.forEach((slide, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            slideIndex = index - 1; 
            clearInterval(this.slideInterval);
            showSlides();
            this.slideInterval = setInterval(showSlides, 5000); 
        });
        dotsContainer.appendChild(dot);
    });
    this.slideInterval = setInterval(showSlides, 5000);
    showSlides();
}


// --- Category Logic ---
function initCategorySwitch() {
    const categoryCards = document.querySelectorAll('.category-card');
    const productBbc = document.getElementById('product-bbc');
    const productAkun = document.getElementById('product-akun');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            categoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const category = card.getAttribute('data-category');

            productBbc.classList.toggle('hidden', category !== 'bbc');
            productAkun.classList.toggle('hidden', category !== 'akun');
        });
    });
}


// --- Modal & Purchase Logic ---
function initModals() {
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

            updateStockDisplay(itemName, productType);
            
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
                
                // Logic Level & Hero
                const heroArea = document.getElementById('hero-selection-area');
                const heroSelect = document.getElementById('akun-hero-select');
                const isLevel1 = itemName.includes("Level 1");
                
                heroArea.style.display = isLevel1 ? 'none' : 'block';
                heroSelect.required = !isLevel1;
                
                // Reset manual input
                document.getElementById('akun-hero-manual').style.display = 'none';
                heroSelect.disabled = false;
                
                modals.akun.style.display = 'block';
            }
        });
    });

    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', (event) => {
            document.getElementById(button.getAttribute('data-modal')).style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Logic Hero Dropdown Fleksibel (Akun)
    document.getElementById('akun-hero-select').addEventListener('change', function() {
        const heroSelect = this;
        const heroManual = document.getElementById('akun-hero-manual');
        
        if (heroSelect.value === 'Lainnya (Tulis Manual)') {
            heroManual.style.display = 'block';
            heroManual.setAttribute('required', 'required');
            heroSelect.removeAttribute('required');
            heroSelect.disabled = true;
        } else {
            heroManual.style.display = 'none';
            heroManual.removeAttribute('required');
            heroSelect.setAttribute('required', 'required');
            heroSelect.disabled = false;
        }
    });

    // Handle Form Submissions (Preparation for QRIS)
    document.getElementById('form-diamond').addEventListener('submit', function(event) {
        event.preventDefault();
        modals.diamond.style.display = 'none'; 
        const data = {
            item: document.getElementById('diamond-item').value, price: document.getElementById('diamond-price').value,
            id: document.getElementById('diamond-id').value, server: document.getElementById('diamond-server').value,
            nickname: document.getElementById('diamond-nickname').value, wa: document.getElementById('diamond-wa').value,
        };
        prepareQrisModal('BBC/Diamond', data);
    });

    document.getElementById('form-akun').addEventListener('submit', function(event) {
        event.preventDefault();
        modals.akun.style.display = 'none'; 
        
        const heroSelect = document.getElementById('akun-hero-select');
        const heroManual = document.getElementById('akun-hero-manual');
        const levelElement = document.getElementById('modal-akun-title').textContent;

        let heroValue = "Tidak Dipilih (Level 1)";
        if (!levelElement.includes("Level 1")) {
            heroValue = (heroSelect.value === 'Lainnya (Tulis Manual)') ? heroManual.value : heroSelect.value;
        }

        const data = {
            item: document.getElementById('akun-item').value, price: document.getElementById('akun-price').value,
            nickname: document.getElementById('akun-nickname').value, email: document.getElementById('akun-email').value,
            hero: heroValue,
        };
        prepareQrisModal('Akun', data);
    });

    function prepareQrisModal(type, data) {
        data.formattedPrice = formatRupiah(data.price);
        currentOrderDetails = { ...data, type };
        
        document.getElementById('qris-item-name').textContent = data.item;
        document.getElementById('qris-item-price').textContent = data.formattedPrice;
        document.getElementById('qris-image').src = QRIS_IMAGE_URL;
        document.getElementById('bukti-transfer').value = ''; 
        
        modals.qris.style.display = 'block';
    }

    // Logic Konfirmasi QRIS + WhatsApp Admin
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
        window.open(waLink, '_blank');
    });
}


// --- Sidebar & Halaman Logic ---
function openNav() {
    document.getElementById("sidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.main-content-wrapper, .page-content');
    pages.forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('active-page');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        targetPage.classList.add('active-page');
    }
}
window.openNav = openNav; // Expose to global scope for HTML onclick
window.closeNav = closeNav;
window.showPage = showPage;


// --- Review Logic ---
const initialReviews = [
    { name: "UserMLBB87", text: "BBC-nya masuk cepet banget. Admin gercep. Pokoknya gacorr!" },
    { name: "SultanAS", text: "Akun level 20 udah siap tempur, hero mantap. Thank you SaktiStore!" },
    { name: "Noname12", text: "Pelayanan mantap, harganya pas di kantong pelajar. TOP!" }
];

const automaticReviews = [
    "Wih, baru beli akun level 3, gak nyangka dapet hero bagus! Fix langganan!",
    "Barusan topup BBC, prosesnya kilat kayak jet! Bintang 5 deh.",
    "Gak pake ribet input data, langsung sat set. Recommended buat player sibuk.",
    "Akhirnya nemu tempat topup AS terpercaya. Mantap, Bosku!",
];

function loadReviews() {
    let reviews = JSON.parse(localStorage.getItem('saktistore_reviews')) || initialReviews;
    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = ''; 

    reviews.forEach((review) => {
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card');
        if (review.isNew) reviewCard.classList.add('new');

        reviewCard.innerHTML = `<p class="review-text">"${review.text}"</p><p class="reviewer">- ${review.name}</p>`;
        reviewList.appendChild(reviewCard);
    });

    // Hapus label 'new' setelah review ditampilkan
    if (reviews.some(r => r.isNew)) {
        setTimeout(() => {
            reviews.forEach(r => r.isNew = false);
            localStorage.setItem('saktistore_reviews', JSON.stringify(reviews));
            if (document.getElementById('review').classList.contains('active-page')) loadReviews();
        }, 10000); // Label "BARU" hilang setelah 10 detik
    }
}

function addAutomaticReview() {
    const randomText = automaticReviews[Math.floor(Math.random() * automaticReviews.length)];
    const randomName = `UserAnon${Math.floor(Math.random() * 900) + 100}`;
    const newReview = { name: randomName, text: randomText, isNew: true };
    
    let reviews = JSON.parse(localStorage.getItem('saktistore_reviews')) || initialReviews;
    reviews.unshift(newReview);
    reviews = reviews.slice(0, 10); // Batasi 10 ulasan
    localStorage.setItem('saktistore_reviews', JSON.stringify(reviews));
    
    if (document.getElementById('review').classList.contains('active-page')) {
        loadReviews();
    }
}
setInterval(addAutomaticReview, 2 * 60 * 1000); // Otomatis setiap 2 menit

document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('review-name').value || 'Anonim';
    const text = document.getElementById('review-text').value;

    if (text.trim() !== '') {
        const newReview = { name: name, text: text, isNew: true };
        let reviews = JSON.parse(localStorage.getItem('saktistore_reviews')) || initialReviews;
        reviews.unshift(newReview);
        reviews = reviews.slice(0, 10);
        localStorage.setItem('saktistore_reviews', JSON.stringify(reviews));
        
        document.getElementById('review-form').reset();
        loadReviews();
        alert('Ulasan Anda berhasil dikirim! (Akan muncul sebentar lagi)');
    }
});


// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initCategorySwitch();
    initModals();
    loadReviews();
    
    // Setel link admin
    document.getElementById('wa-admin-link').href = `https://wa.me/${ADMIN_WA}?text=Halo%20Admin%2C%20saya%20membutuhkan%20bantuan%20mengenai%20website.`;
    document.getElementById('gmail-admin-link').href = `mailto:${ADMIN_GMAIL}?subject=Bantuan%20Website%20SaktiStore`;
    document.getElementById('telegram-admin-link').href = `https://t.me/${ADMIN_TELEGRAM}`;
    document.getElementById('testimoni-channel-link').href = TESTIMONI_CHANNEL_URL;
});
