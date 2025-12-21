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
    url.searchParams.append('limit', limit);
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

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
};

// Render Functions
const renderNews = (contents, containerId, isTop = false) => {
    const container = document.getElementById(containerId);
    if (!container || !contents) return;

    container.innerHTML = contents.map(item => `
        <a href="news.html?id=${item.id}" class="news-item fade-in-up visible">
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

// Auto-run on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Check if we are on a page that needs news list
    const newsList = document.getElementById('newsList');
    if (newsList && CMS_CONFIG.serviceDomain !== 'YOUR_SERVICE_DOMAIN') {
        const data = await fetchFromCMS('news', 5);
        if (data) renderNews(data.contents, 'newsList');
    }

    // Check if we are on a page that needs works list
    const worksGrid = document.getElementById('worksGrid');
    if (worksGrid && CMS_CONFIG.serviceDomain !== 'YOUR_SERVICE_DOMAIN') {
        const isTopPage = document.querySelector('.hero-section') !== null;
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
