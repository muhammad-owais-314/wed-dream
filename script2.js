/* ── NAVBAR ── */
$(document).ready(() => {
    $.get('navebar.html', (data) => {
        $('#nav-container').html(data);

        var page = window.location.pathname.split('/').pop().replace('.html','').toLowerCase() || 'index';

        var pageMap = {
            'index'        : 'home',
            'aboutme'      : 'about',
            'services'     : 'services',
            'decoration'   : 'services',
            'guestlist'    : 'guestlist',
            'gustlist'     : 'guestlist',
            'photographers': 'vendors',
            'makeup'       : 'vendors',
            'catering'     : 'vendors',
            'ai-planner'   : 'ai',
            'halls'        : 'halls',
            'hall-detail'  : 'halls'
        };

        var activeKey = pageMap[page] || 'home';

        $('.wd-menu-link').removeClass('active');
        $('.wd-mobile-list > li > a').removeClass('active');
        $('.wd-menu-link[data-nav="' + activeKey + '"]').addClass('active');
        $('.wd-mobile-list > li > a[data-nav="' + activeKey + '"]').addClass('active');
    });
});

/* ── FOOTER ── */
$(document).ready(() => {
    $.get('footer.html', (data) => {
        $('#footer-container').html(data);
    });
});

/* ── HALLS PAGE ── */

const productContainer = document.getElementById('productContainer');
const filterBar = document.getElementById('filterBar');
const noResults = document.getElementById('noResults');

function formatPKR(num) {
    return num.toLocaleString('en-PK');
}

function buildStars(rating) {
    const full  = Math.floor(rating);
    const half  = (rating - full) >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    let stars = '';
    for (let i = 0; i < full;  i++) stars += '<i class="fas fa-star"></i>';
    if (half)                        stars += '<i class="fas fa-star-half-alt"></i>';
    for (let i = 0; i < empty; i++) stars += '<i class="far fa-star"></i>';
    return stars;
}

function buildCard(item) {
    const imgSrc = item.image ? `images/halls/${item.image}` : '';

    return `
    <div class="col-12 col-md-6 col-lg-4 col-xl-3 card-item" data-area="${item.area}">
        <div class="premium-card-wrapper">
            <div class="premium-card">
                <div class="card-img-container position-relative">
                    <img 
                        src="${imgSrc}" 
                        alt="${item.name}"
                        onerror="this.src=''; this.style.background='linear-gradient(135deg,#1a1012 0%,#2a1a20 40%,#1e160d 70%,#120d0e 100%)';"
                    >
                    <div class="img-overlay"></div>
                    <div class="img-placeholder-icon"><i class="fas fa-gem"></i></div>
                    ${item.verified ? `<div class="premium-badge"><i class="fas fa-crown"></i> PREMIUM</div>` : ''}
                </div>
                <div class="card-body-custom">
                    <div>
                        <h2 class="hall-title">${item.name}</h2>
                        <div class="location-text">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${item.area}</span>
                        </div>
                        <div class="rating-wrapper">
                            <div class="stars">${buildStars(item.rating)}</div>
                            <span class="rating-number">${item.rating}</span>
                        </div>
                    </div>
                    <div>
                        <div class="gold-divider"></div>
                        <div class="price-section">
                            <div class="d-flex-price">
                                <span class="price-pkr">PKR</span>
                                <span class="price-amount">${formatPKR(item.starting_price)}</span>
                                <small class="text-muted ms-1">/ event</small>
                            </div>
                            <button class="btn-view-details view-details-btn" data-id="${item.id}" data-hall="${item.name}">
                                <i class="fas fa-arrow-right"></i> Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

function buildFilters(areas) {
    let btns = `<button class="filter-btn active" data-filter="all">All Areas</button>`;
    areas.forEach(area => {
        btns += `<button class="filter-btn" data-filter="${area}">${area}</button>`;
    });
    filterBar.innerHTML = btns;

    filterBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        const cards  = document.querySelectorAll('.card-item');
        let visible  = 0;

        cards.forEach(card => {
            const match = filter === 'all' || card.dataset.area === filter;
            card.style.display = match ? '' : 'none';
            if (match) visible++;
        });

        noResults.style.display = visible === 0 ? 'block' : 'none';
    });
}

async function getProducts() {
    try {
        const response = await axios.get('halls.json');
        const data     = response.data;

        const areas = [...new Set(data.map(i => i.area))];

        buildFilters(areas);

        productContainer.innerHTML = data.map(buildCard).join('');

        // ✅ FIXED: Detail page navigation
        productContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.view-details-btn');
            if (!btn) return;
            const id = btn.dataset.id;
            window.location.href = `hall-detail.html?id=${id}`;
        });

    } catch (error) {
        console.error('halls.json load error:', error);
    }
}

getProducts();