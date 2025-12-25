/**
 * microCMS Integration
 * 
 * IMPORTANT: Please replace 'YOUR_SERVICE_DOMAIN' with your actual microCMS service domain (ID).
 * Example: If your endpoint is https://riselive.microcms.io/api/v1/..., then SERVICE_DOMAIN is 'riselive'.
 */

const CMS_CONFIG = {
    apiKey: 'HZQRqDOnP5ah2jZkqAhUpgoMYMCzxYtss7LA',
    serviceDomain: 'riselive', // Please enter your Service ID here
};

const fetchFromCMS = async (endpoint, limit = 10, filters = '') => {
    if (CMS_CONFIG.serviceDomain === 'YOUR_SERVICE_DOMAIN') {
        console.warn('microCMS Service Domain is not set.');
        return null;
    }

    const url = new URL(`https://${CMS_CONFIG.serviceDomain}.microcms.io/api/v1/${endpoint}`);
    if (limit) url.searchParams.append('limit', limit);
    if (filters) url.searchParams.append('filters', filters);

    try {
        const response = await fetch(url.toString(), {
            headers: {
                'X-MICROCMS-API-KEY': CMS_CONFIG.apiKey,
            },
        });
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
};

const fetchSingleFromCMS = async (endpoint, contentId) => {
    if (CMS_CONFIG.serviceDomain === 'YOUR_SERVICE_DOMAIN') return null;
    const url = `https://${CMS_CONFIG.serviceDomain}.microcms.io/api/v1/${endpoint}/${contentId}`;
    try {
        const response = await fetch(url, {
            headers: { 'X-MICROCMS-API-KEY': CMS_CONFIG.apiKey },
        });
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
};

// Render Functions
const renderNews = (contents, containerId, isTop = false) => {
    const container = document.getElementById(containerId);
    if (!container || !contents) return;

    const basePath = isTop ? 'news/' : './';

    container.innerHTML = contents.map(item => `
        <a href="${basePath}?id=${item.id}" class="news-item fade-in-up visible">
            <time>${formatDate(item.publishedAt)}</time>
            <span class="news-tag">${item.category ? item.category.name : 'Info'}</span>
            <span class="news-title">${item.title}</span>
        </a>
    `).join('');
};

const renderWorks = (contents, containerId) => {
    const container = document.getElementById(containerId);
    if (!container || !contents) return;

    // Clear container content first
    container.innerHTML = '';

    // Helper to extract raw URL from potential Rich Text/HTML string
    const extractRawUrl = (str) => {
        if (!str) return '';
        if (typeof str !== 'string') return '';

        // If string contains HTML tags
        if (str.match(/<[^>]+>/)) {
            const temp = document.createElement('div');
            temp.innerHTML = str;
            // Try to find first anchor tag
            const link = temp.querySelector('a');
            if (link) return link.href;
            // Otherwise just get text content (e.g. if wrapped in <p>)
            return temp.textContent.trim();
        }
        return str;
    };

    contents.forEach(item => {
        // Fallback for image URL
        const imageUrl = item.thumbnail?.url || item.mainImage?.url || item.image?.url || item.img?.url || item.eyecatch?.url || item.workImage?.url || item.photo?.url;

        // Placeholder if no image
        const finalImgSrc = imageUrl || 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22450%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20450%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1%20%7B%20fill%3A%23EEEEEE%3Bfill-opacity%3A1%3B%20%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Crect%20width%3D%22800%22%20height%3D%22450%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23AAAAAA%22%20dy%3D%22.3em%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20Helvetica%2C%20sans-serif%22%20font-size%3D%2224%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fsvg%3E';

        // Check for common URL fields and CLEAN them
        const rawUrlField = item.url || item.link || item.website || item.siteUrl || '';
        const workUrl = extractRawUrl(rawUrlField);

        const categoryName = item.category ? (Array.isArray(item.category) ? item.category[0] : item.category.name) : 'Work';

        // Create Article
        const article = document.createElement('article');
        article.className = 'work-card fade-in-up visible';

        // 1. Image Wrapper
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'work-image-wrapper';

        const imgLink = document.createElement('a');
        if (workUrl) {
            imgLink.href = workUrl;
            imgLink.target = '_blank';
            imgLink.rel = 'noopener';
        } else {
            imgLink.href = '#';
            imgLink.style.pointerEvents = 'none'; // Disable click if no URL
        }
        imgLink.style.display = 'block';
        imgLink.style.height = '100%';

        const img = document.createElement('img');
        img.src = finalImgSrc;
        img.alt = item.title;
        img.className = 'work-image';
        img.loading = 'lazy';

        imgLink.appendChild(img);
        imgWrapper.appendChild(imgLink);
        article.appendChild(imgWrapper);

        // 2. Info Wrapper
        const infoDiv = document.createElement('div');
        infoDiv.className = 'work-info';

        // Title
        const titleH3 = document.createElement('h3');
        titleH3.className = 'work-title';
        const titleLink = document.createElement('a');
        if (workUrl) {
            titleLink.href = workUrl; // Clean URL
            titleLink.target = '_blank';
            titleLink.rel = 'noopener';
        }
        titleLink.textContent = item.title;
        titleH3.appendChild(titleLink);
        infoDiv.appendChild(titleH3);

        // Meta (Tag + URL)
        const metaDiv = document.createElement('div');
        metaDiv.className = 'work-meta';

        const tagSpan = document.createElement('span');
        tagSpan.className = 'work-tag';
        tagSpan.textContent = categoryName;
        metaDiv.appendChild(tagSpan);

        if (workUrl) {
            const urlLink = document.createElement('a');
            urlLink.href = workUrl; // Clean URL
            urlLink.target = '_blank';
            urlLink.rel = 'noopener';
            urlLink.className = 'work-meta-url';
            urlLink.textContent = workUrl;
            // Add margin left for spacing
            urlLink.style.marginLeft = '10px';
            metaDiv.appendChild(urlLink);
        }

        infoDiv.appendChild(metaDiv);
        article.appendChild(infoDiv);

        container.appendChild(article);
    });
};


// Store works data globally for filtering
let allWorksData = [];

// Demo Data map for static fallback
const DEMO_NEWS = {
    'demo_renewal': {
        title: 'Webサイトをリニューアルしました。今後実績を更新していきます。',
        date: '2024.05.01',
        category: 'Info',
        content: '<p>日頃よりRiseliveをご愛顧いただき、誠にありがとうございます。</p><p>この度、Webサイトを全面的にリニューアルいたしました。</p><p>今回のリニューアルでは、皆様により分かりやすく情報をお伝えすることを目指し、デザインや構成を一新いたしました。</p><p>引き続き、コンテンツの充実を図り、より良いサイト運営を目指してまいりますので、今後とも何卒よろしくお願い申し上げます。</p>'
    },
    'demo_work1': {
        title: '新規制作実績を公開しました（株式会社〇〇様 コーポレートサイト）',
        date: '2024.04.15',
        category: 'Work',
        content: '<p>株式会社〇〇様のコーポレートサイトを制作いたしました。</p><p>「信頼感」と「革新性」をテーマに、企業カラーであるブルーを基調としたクリーンなデザインに仕上げました。</p><p>レスポンシブ対応はもちろん、CMS導入によりお客様自身でのお知らせ更新も可能となっております。</p>'
    },
    'demo_work2': {
        title: '新規制作実績を公開しました（株式会社△△様 LP）',
        date: '2024.04.10',
        category: 'Work',
        content: '<p>新商品発売に伴うランディングページ（LP）の制作を担当いたしました。</p><p>ターゲット層に響く訴求ポイントを整理し、CV（コンバージョン）への導線を意識した構成となっております。</p><p>ファーストビューでのインパクトを重視し、ストーリー性のあるデザインを展開しました。</p>'
    },
    'demo_column': {
        title: '【コラム】最近のWebデザインのトレンドについて',
        date: '2024.04.05',
        category: 'Blog',
        content: '<p>2024年のWebデザインのトレンドについてご紹介します。</p><h3>1. Bento Grids</h3><p>お弁当箱のようにコンテンツをグリッド状に配置するレイアウトが人気です。</p><h3>2. マイクロインタラクション</h3><p>ボタンを押した時の動きや、スクロール時のアニメーションなど、細かな動きがユーザー体験を向上させます。</p><p>Webデザインは日々進化していますが、本質は「ユーザーにとって使いやすいか」です。トレンドを取り入れつつも、見やすさを損なわないデザインを心がけています。</p>'
    },
    'demo_start': {
        title: 'フリーランスとしての活動を本格的に開始しました。',
        date: '2024.04.01',
        category: 'Info',
        content: '<p>この度、フリーランスのWebディレクター/デザイナーとして本格的に活動を開始いたしました。</p><p>これまでの経験を活かし、お客様のビジネス課題を解決するWebサイト制作を行ってまいります。</p><p>お仕事のご相談やご質問など、お気軽にお問い合わせください。</p>'
    }

};

const renderNewsDetailContent = (id, data) => {
    const detailContainer = document.getElementById('newsDetail');
    const listContainer = document.getElementById('newsList');
    const pagination = document.querySelector('nav[aria-label="Page navigation"]')?.parentElement; // Hide pagination

    if (!detailContainer) return;

    let title, date, category, content;

    if (data) {
        // API Data
        title = data.title;
        date = formatDate(data.publishedAt);
        category = data.category ? data.category.name : 'Info';
        content = data.content || data.body || ''; // content or body depending on CMS schema
    } else if (DEMO_NEWS[id]) {
        // Demo Data
        const d = DEMO_NEWS[id];
        title = d.title;
        date = d.date;
        category = d.category;
        content = d.content;
    } else {
        // Not found
        detailContainer.innerHTML = '<p>記事が見つかりませんでした。</p><div class="text-center mt-5"><a href="./" class="btn btn-outline">一覧に戻る</a></div>';
        listContainer.style.display = 'none';
        detailContainer.style.display = 'block';
        if (pagination) pagination.style.display = 'none';
        return;
    }

    detailContainer.innerHTML = `
        <article class="news-detail-content fade-in-up visible">
            <header class="news-header" style="margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 2rem;">
                <div class="news-meta" style="margin-bottom: 1rem; color: #888;">
                    <time style="margin-right: 1rem;">${date}</time>
                    <span class="news-tag">${category}</span>
                </div>
                <h1 style="font-size: 2rem; line-height: 1.4;">${title}</h1>
            </header>
            <div class="news-body" style="line-height: 1.8; margin-bottom: 4rem;">
                ${content}
            </div>
            <div class="text-center">
                <a href="./" class="btn btn-outline">一覧に戻る</a>
            </div>
        </article>
    `;

    // Switch view
    if (listContainer) listContainer.style.display = 'none';
    if (pagination) pagination.style.display = 'none';
    detailContainer.style.display = 'block';

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Auto-run on page load
document.addEventListener('DOMContentLoaded', async () => {

    // Check for News Detail ID first
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');
    const newsList = document.getElementById('newsList');

    // Check if we are on the Top page
    // We check for .hero-section which is typically only on Top
    const isTopPage = document.querySelector('.hero-section') !== null;

    if (newsId && document.getElementById('newsDetail')) {
        // We are in detail mode
        // Try to fetch from API first if it looks like an API ID (not starting with demo_)
        if (!newsId.startsWith('demo_') && CMS_CONFIG.serviceDomain !== 'YOUR_SERVICE_DOMAIN') {
            const data = await fetchSingleFromCMS('news', newsId);
            renderNewsDetailContent(newsId, data);
        } else {
            // Render Demo Content
            renderNewsDetailContent(newsId, null);
        }
    } else {
        // List Mode
        if (newsList && CMS_CONFIG.serviceDomain !== 'YOUR_SERVICE_DOMAIN') {
            const data = await fetchFromCMS('news', 5);
            if (data && data.contents && data.contents.length > 0) {
                renderNews(data.contents, 'newsList', isTopPage);
            }
            // If no data or fetch failed, static HTML placeholders remain visible
        }
    }

    // Check if we are on a page that needs works list
    const worksGrid = document.getElementById('worksGrid');
    if (worksGrid && CMS_CONFIG.serviceDomain !== 'YOUR_SERVICE_DOMAIN') {
        const limit = isTopPage ? 6 : 50;

        const data = await fetchFromCMS('works', limit);
        if (data) {
            allWorksData = data.contents;
            renderWorks(allWorksData, 'worksGrid');

            // Initialize filters if on works page (not top page)
            if (!isTopPage) {
                initWorkFilters();
            }
        }
    }

    // Initialize Client-side Pagination for News List
    // This ensures pagination only appears if items exceed the limit (default 10)
    initPagination('newsList', 10);
});

const initWorkFilters = () => {
    const buttons = document.querySelectorAll('.filter-btn');
    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.textContent.trim();

            if (filterValue === 'All') {
                renderWorks(allWorksData, 'worksGrid');
            } else {
                const filtered = allWorksData.filter(item => {
                    const categoryName = item.category ? (Array.isArray(item.category) ? item.category[0] : item.category.name) : '';
                    // Case-insensitive inclusion check, handling potentially slightly different naming
                    // e.g. "Web Design" should match "Web" filter
                    return categoryName && categoryName.toLowerCase().includes(filterValue.toLowerCase());
                });
                renderWorks(filtered, 'worksGrid');
            }
        });
    });
};

/**
 * Client-side Pagination Utility
 * Automatically paginates a list of items if they exceed the perPage limit.
 */
const initPagination = (containerId, perPage = 10) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Get all news items
    const items = Array.from(container.querySelectorAll('.news-item'));
    if (items.length <= perPage) return;

    // Create Pagination Container
    const paginationNav = document.createElement('nav');
    paginationNav.className = 'pagination-container text-center fade-in-up visible';
    paginationNav.style.marginTop = '3rem';
    paginationNav.setAttribute('aria-label', 'Page navigation');

    const ul = document.createElement('ul');
    ul.style.display = 'flex';
    ul.style.justifyContent = 'center';
    ul.style.gap = '10px';
    paginationNav.appendChild(ul);

    // Insert after container
    container.parentNode.insertBefore(paginationNav, container.nextSibling);

    const totalPages = Math.ceil(items.length / perPage);
    let currentPage = 1;

    const showPage = (page) => {
        currentPage = page;
        const start = (page - 1) * perPage;
        const end = page * perPage;

        items.forEach((item, idx) => {
            if (idx >= start && idx < end) {
                item.style.display = 'flex';
                item.classList.add('visible');
            } else {
                item.style.display = 'none';
            }
        });

        renderControls();
    };

    const renderControls = () => {
        ul.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            const btn = document.createElement('a');
            btn.href = '#';
            btn.textContent = i;
            btn.style.display = 'block';
            btn.style.padding = '8px 16px';
            btn.style.border = i === currentPage ? '1px solid #333' : '1px solid #ddd';
            btn.style.background = i === currentPage ? '#333' : '#fff';
            btn.style.color = i === currentPage ? '#fff' : '#333';
            btn.style.borderRadius = '4px';
            btn.style.textDecoration = 'none';
            btn.style.transition = 'all 0.2s';

            if (i !== currentPage) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    showPage(i);
                    // Smooth scroll to top of list
                    const rect = container.getBoundingClientRect();
                    const scrollTop = window.pageYOffset + rect.top - 120;
                    window.scrollTo({ top: scrollTop, behavior: 'smooth' });
                });
                btn.addEventListener('mouseenter', () => {
                    btn.style.background = '#f4f4f4';
                });
                btn.addEventListener('mouseleave', () => {
                    btn.style.background = '#fff';
                });
            } else {
                btn.style.pointerEvents = 'none';
            }

            li.appendChild(btn);
            ul.appendChild(li);
        }
    };

    // Initialize
    showPage(1);
};
