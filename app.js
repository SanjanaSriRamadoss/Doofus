/* ──────────────────────────────────────────
   Amazon × Doofus  –  app.js  (v2)
   New: working search bar, "Why recommended" panels
   ────────────────────────────────────────── */

'use strict';

/* ── DATA ───────────────────────────────── */

const PICKS_PRODUCTS = [
  {
    id: 'p1',
    emoji: '🎧',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    stars: '★★★★★', reviews: '12,840', price: '$279.00', prime: true,
    tags: ['headphone', 'earphone', 'audio', 'noise cancelling', 'sony', 'wireless', 'music'],
    showReason: true,
    reasonSummary: 'Highest spec-review consistency (94%) in its category across 12,840 verified reviews.',
    reasonPoints: [
      '94% spec-review match — top score in wireless headphones',
      '30h battery life confirmed by manufacturer spec sheet',
      'Zero OCR conflicts or review contradictions detected',
      'USB-C inclusion verified — overrides one incorrect FAQ entry'
    ]
  },
  {
    id: 'p2',
    emoji: '💻',
    name: 'Apple MacBook Air 13" M2 Chip, 8GB RAM, 256GB',
    stars: '★★★★★', reviews: '8,230', price: '$1,099.00', prime: true,
    tags: ['laptop', 'macbook', 'apple', 'computer', 'student', 'm2', 'notebook'],
    showReason: true,
    reasonSummary: 'Top-rated student laptop with 91% RAG confidence. All FAQ conflicts resolved via official Apple & Microsoft docs.',
    reasonPoints: [
      '91% confidence — FAQ conflict re: Office 365 overridden by official docs',
      '18hr battery life spec-confirmed by Apple product page',
      'Best price-to-performance ratio for students in verified catalog',
      'No review poisoning or OCR discrepancies in product listing'
    ]
  },
  {
    id: 'p3',
    emoji: '☕',
    name: "De'Longhi Magnifica Evo Bean-to-Cup Coffee Machine",
    stars: '★★★★☆', reviews: '3,620', price: '$549.99', prime: true,
    tags: ['coffee', 'espresso', 'bean', 'machine', 'delonghi', 'barista', 'grinder'],
    showReason: false,
    reasonSummary: "Best bean-to-cup pick — 15-bar pressure spec-confirmed. Minor flag: 3 unverified descaling sensor reports noted.",
    reasonPoints: [
      '15-bar pressure & integrated grinder confirmed by spec sheet',
      '82% confidence — 3 unverified descaling sensor reports flagged',
      'Highest review volume in the premium coffee machine category'
    ]
  },
];

const ALL_PRODUCTS = [
  ...PICKS_PRODUCTS,
  {
    id: 's1', emoji: '🎧',
    name: 'AcousticMaster Ultra-V9 – Professional Studio Series',
    stars: '★★★★☆', reviews: '12,403', price: '$349.00', prime: false, bestseller: true,
    tags: ['headphone', 'studio', 'audio', 'professional', 'recording'],
    reasonSummary: 'Highest review count in studio headphones. Specs verified against manufacturer listings — no conflicts found.',
    reasonPoints: ['Most reviewed studio headphone in catalog', 'Frequency response spec matches manufacturer claim', 'No OCR or review conflicts detected']
  },
  {
    id: 's2', emoji: '⌚',
    name: 'Chronos X Smart Intelligence Health Tracker',
    stars: '★★★★☆', reviews: '5,901', price: '$189.99', prime: true, bestseller: false,
    tags: ['watch', 'smartwatch', 'fitness', 'health', 'tracker', 'wearable'],
    reasonSummary: 'Top-rated health tracker with verified heart-rate accuracy. Water-resistance rating (IP68) confirmed via spec sheet.',
    reasonPoints: ['IP68 water resistance confirmed by spec sheet', 'Heart-rate accuracy cross-validated with 5,901 reviews', 'Battery life spec of 7 days matches user reports']
  },
  {
    id: 's3', emoji: '⌨️',
    name: 'Vertex RGB Mechanical Precision Keyboard',
    stars: '★★★★★', reviews: '9,110', price: '$129.00', prime: true, bestseller: false,
    tags: ['keyboard', 'mechanical', 'gaming', 'rgb', 'typing', 'office'],
    reasonSummary: 'Highest-rated mechanical keyboard in catalog. Switch type verified against Cherry MX spec docs.',
    reasonPoints: ['Cherry MX switch type verified against spec docs', 'RGB lighting spec confirmed — no OCR conflicts', '9,110 reviews with 94% positive sentiment']
  },
  {
    id: 's4', emoji: '🖥️',
    name: 'Elevate Pro Ergonomic Aluminum Stand',
    stars: '★★★★☆', reviews: '3,402', price: '$45.50', prime: true, bestseller: false,
    tags: ['stand', 'desk', 'ergonomic', 'laptop stand', 'monitor', 'aluminum'],
    reasonSummary: 'Best-value ergonomic stand. Weight capacity (10kg) verified; no quantity or spec conflicts in listings.',
    reasonPoints: ['10kg weight capacity verified by manufacturer spec', 'Aluminum build confirmed — no material conflicts in reviews', 'Adjustable height spec matches user reports']
  },
  {
    id: 's5', emoji: '📷',
    name: 'Vision4K Stream Ultra HD Webcam',
    stars: '★★★☆☆', reviews: '1,740', price: '$159.00', prime: false, bestseller: false,
    tags: ['webcam', 'camera', 'streaming', '4k', 'video', 'conference'],
    reasonSummary: 'RAG-verified 4K resolution. Note: 2 reviews flag autofocus lag — flagged as unconfirmed; manufacturer spec does not address this.',
    reasonPoints: ['4K resolution confirmed by manufacturer spec sheet', 'Moderate confidence (78%) — autofocus lag reported in 2 reviews', 'Compatible with Zoom & Teams per verified compatibility doc']
  },
  {
    id: 's6', emoji: '🖱️',
    name: 'GlideX Pro Wireless Ergonomic Mouse',
    stars: '★★★★☆', reviews: '6,882', price: '$89.99', prime: true, bestseller: false,
    tags: ['mouse', 'wireless', 'ergonomic', 'office', 'gaming', 'bluetooth'],
    reasonSummary: 'Top ergonomic wireless mouse — DPI range and battery life (70 days) fully spec-confirmed with no data conflicts.',
    reasonPoints: ['70-day battery life confirmed by spec sheet', 'DPI range 200–4000 verified — no OCR discrepancies', 'Ergonomic grip shape confirmed across 6,882 reviews']
  },
  {
    id: 's7', emoji: '🔋',
    name: 'FluxPack 30000mAh Portable Charger',
    stars: '★★★★★', reviews: '21,050', price: '$39.99', prime: true, bestseller: false,
    tags: ['charger', 'power bank', 'portable', 'battery', 'usb', 'travel'],
    reasonSummary: 'Most-reviewed portable charger. Capacity (30,000mAh) and output wattage fully spec-confirmed — best value in category.',
    reasonPoints: ['30,000mAh capacity verified by manufacturer spec', 'Most reviews (21,050) of any portable charger in catalog', 'USB-C & USB-A output specs confirmed — no conflicts']
  },
  {
    id: 's8', emoji: '💡',
    name: 'LuminoArc Smart Desk Lamp with USB-C',
    stars: '★★★★☆', reviews: '4,217', price: '$54.99', prime: true, bestseller: false,
    tags: ['lamp', 'desk lamp', 'smart', 'light', 'usb', 'office', 'led'],
    reasonSummary: 'Verified smart lamp with confirmed USB-C charging spec. Colour temperature range and dimming confirmed via spec sheet.',
    reasonPoints: ['USB-C 18W charging confirmed by spec sheet', 'Colour temp range 2700K–6500K verified', 'App compatibility (iOS & Android) confirmed via FAQ']
  },
  {
    id: 's9', emoji: '🎮',
    name: 'Nexus Edge Pro Gaming Controller',
    stars: '★★★★☆', reviews: '7,340', price: '$79.99', prime: true, bestseller: false,
    tags: ['controller', 'gaming', 'gamepad', 'xbox', 'ps5', 'joystick'],
    reasonSummary: 'Top cross-platform controller. PC/PlayStation/Xbox compatibility verified via official compatibility docs.',
    reasonPoints: ['Cross-platform compatibility verified via official docs', 'Haptic feedback spec confirmed — no OCR conflicts', '40hr battery life spec-confirmed by manufacturer']
  },
  {
    id: 's10', emoji: '📱',
    name: 'Samsung Galaxy S24 FE 128GB',
    stars: '★★★★☆', reviews: '9,880', price: '$499.00', prime: false, bestseller: false,
    tags: ['phone', 'samsung', 'galaxy', 'smartphone', 'android', 'mobile'],
    reasonSummary: 'Best-value flagship phone. Storage/RAM spec confirmed; no conflicting OCR data in product listings.',
    reasonPoints: ['128GB storage & 8GB RAM confirmed by spec sheet', 'IP68 water resistance verified against Samsung spec', 'Camera spec (50MP main) confirmed — no review conflicts']
  },
  {
    id: 's11', emoji: '🖨️',
    name: 'Epson EcoTank ET-2850 Wireless Printer',
    stars: '★★★★☆', reviews: '5,612', price: '$299.99', prime: true, bestseller: false,
    tags: ['printer', 'epson', 'inkjet', 'wireless', 'office', 'printing'],
    reasonSummary: 'Verified EcoTank with confirmed page yield (7,500 black/6,000 colour). No ink quantity OCR conflicts detected.',
    reasonPoints: ['Page yield figures verified against Epson spec sheet', 'Wi-Fi Direct & AirPrint confirmed via compatibility docs', 'Low cost-per-page confirmed across 5,612 reviews']
  },
  {
    id: 's12', emoji: '🎵',
    name: 'Sonos Era 100 Smart Speaker',
    stars: '★★★★★', reviews: '3,991', price: '$249.00', prime: true, bestseller: false,
    tags: ['speaker', 'smart speaker', 'sonos', 'audio', 'bluetooth', 'wifi'],
    reasonSummary: 'Best premium smart speaker. Trueplay calibration and Bluetooth 5.0 confirmed via Sonos spec sheet.',
    reasonPoints: ['Bluetooth 5.0 confirmed by spec sheet', 'Trueplay adaptive audio verified — not just a marketing claim', 'No conflicting data: OCR, reviews, and spec align']
  },
];

const DOOFUS_RESPONSES = [
  {
    triggers: ['headphone', 'earphone', 'earbud', 'audio', 'sony'],
    body: 'Based on verified product data, the <strong>Sony WH-1000XM5</strong> scores highest for noise cancellation. 98% of 12,840 reviewers confirm real-world performance matches specs. Battery life is verified at <strong>30 hours</strong> — spec-sheet confirmed, no OCR conflicts detected. One older FAQ entry claimed "USB-C not included" — this was overridden by the current manufacturer listing confirming USB-C is included.',
    confidence: 94,
    sources: ['Product spec sheet', '12,840 verified reviews', 'Amazon FAQ (2024)', 'Manufacturer page'],
    hasUncertainty: false,
  },
  {
    triggers: ['laptop', 'macbook', 'computer', 'pc', 'student'],
    body: 'For students, the <strong>Apple MacBook Air M2 (8GB/256GB)</strong> is RAG-verified as the top-rated pick with 8,230 reviews at 4.8★. Manufacturer specs confirm up to <strong>18 hours battery</strong>. One FAQ entry suggested "not compatible with Microsoft Office 365" — overridden by verified product data showing full compatibility.',
    confidence: 91,
    sources: ['Apple product page', '8,230 verified reviews', 'Microsoft compatibility doc', 'Amazon Q&A'],
    hasUncertainty: false,
  },
  {
    triggers: ['coffee', 'espresso', 'bean', 'barista', 'machine', 'delonghi'],
    body: "The <strong>De'Longhi Magnifica Evo</strong> is our verified top pick for bean-to-cup machines. Spec sheet confirms <strong>15-bar pressure</strong> and an integrated grinder. However, 3 reviews mention a 'descaling light stays on' issue — I cannot confirm whether this affects all units.",
    confidence: 82,
    sources: ["De'Longhi spec sheet", '3,620 reviews', '2 manufacturer FAQs'],
    hasUncertainty: true,
    uncertaintyNote: '3 reviews flag a descaling sensor fault. Cannot verify scope — check with manufacturer before purchasing.',
  },
  {
    triggers: ['air fryer', 'fryer', 'fry', 'frying'],
    body: 'Top 3 verified air fryers by spec-review consistency: <strong>(1) Ninja AF300UK</strong> — 94%, <strong>(2) Cosori Pro LE</strong> — 91%, <strong>(3) Philips NA231</strong> — 88%. Note: 2 listings showed OCR conflicts and were excluded from this ranking.',
    confidence: 89,
    sources: ['Product catalog', 'Sanitised review database', 'OCR conflict log'],
    hasUncertainty: false,
  },
  {
    triggers: ['speaker', 'sonos', 'smart speaker'],
    body: 'The <strong>Sonos Era 100</strong> leads our verified smart speaker rankings. Trueplay calibration and Bluetooth 5.0 are both spec-confirmed. All product claims are aligned — no OCR conflicts or review poisoning detected.',
    confidence: 93,
    sources: ['Sonos spec sheet', '3,991 verified reviews', 'Amazon compatibility doc'],
    hasUncertainty: false,
  },
  {
    triggers: ['phone', 'samsung', 'galaxy', 'smartphone', 'android'],
    body: 'The <strong>Samsung Galaxy S24 FE</strong> is our top RAG-verified mid-range phone. 128GB storage, 8GB RAM, and IP68 water resistance are all spec-confirmed with no conflicting OCR data. Camera specs (50MP main) cross-validated against Samsung\'s official product page.',
    confidence: 90,
    sources: ['Samsung spec sheet', '9,880 verified reviews', 'Official Samsung product page'],
    hasUncertainty: false,
  },
  {
    triggers: ['gaming', 'controller', 'gamepad', 'keyboard', 'mouse'],
    body: 'Top verified gaming peripherals: <strong>Vertex RGB Keyboard</strong> (94% confidence — Cherry MX specs confirmed), <strong>GlideX Pro Mouse</strong> (92% — 70-day battery verified), <strong>Nexus Edge Pro Controller</strong> (90% — cross-platform compatibility doc-verified).',
    confidence: 92,
    sources: ['Cherry MX spec doc', 'Manufacturer pages', 'Compatibility database'],
    hasUncertainty: false,
  },
  {
    triggers: ['charger', 'power bank', 'battery', 'portable charger'],
    body: 'The <strong>FluxPack 30000mAh</strong> is our top-rated portable charger with 21,050 verified reviews — the most in the category. 30,000mAh capacity, USB-C & USB-A outputs are all spec-confirmed with zero conflicts.',
    confidence: 97,
    sources: ['Product spec sheet', '21,050 verified reviews', 'USB-IF certification records'],
    hasUncertainty: false,
  },
  {
    triggers: ['printer', 'epson', 'printing', 'inkjet'],
    body: 'The <strong>Epson EcoTank ET-2850</strong> is our top verified printer pick. Page yield (7,500 black / 6,000 colour) is manufacturer-confirmed. AirPrint and Wi-Fi Direct compatibility verified via official docs. Best cost-per-page in category.',
    confidence: 88,
    sources: ["Epson spec sheet", '5,612 verified reviews', 'Wi-Fi Direct certification doc'],
    hasUncertainty: false,
  },
];

const DEFAULT_RESPONSE = {
  body: 'I searched the verified product catalogue for your query. All data is RAG-grounded — cross-checked against product specs, manufacturer info, and sanitised customer reviews. If I am uncertain, I will tell you explicitly rather than guess. Could you provide more detail so I can give you a fully verified answer?',
  confidence: 72,
  sources: ['Product catalog', 'Sanitised review database'],
  hasUncertainty: true,
  uncertaintyNote: 'Insufficient product data matched your query. Try a more specific product name or category.',
};

/* ── DOM REFS ───────────────────────────── */
const aiToggle          = document.getElementById('ai-toggle');
const toggleStateLabel  = document.getElementById('toggle-state-label');
const aiOnState         = document.getElementById('ai-on-state');
const aiOffState        = document.getElementById('ai-off-state');
const reEnableBtn       = document.getElementById('reenable-btn');
const chatInput         = document.getElementById('chat-input');
const chatSendBtn       = document.getElementById('chat-send-btn');
const chatResponse      = document.getElementById('chat-response');
const responseBubble    = document.getElementById('response-bubble');
const responseMeta      = document.getElementById('response-meta');
const prefsBtn          = document.getElementById('prefs-btn');
const prefsPanel        = document.getElementById('prefs-panel');
const prefsCloseBtn     = document.getElementById('prefs-close-btn');
const productList       = document.getElementById('product-list');
const standardGrid      = document.getElementById('standard-grid');
const toast             = document.getElementById('toast');
const searchInput       = document.getElementById('search-input');
const searchBtn         = document.getElementById('search-btn');
const chipBtns          = document.querySelectorAll('.chip');

let searchResultsSection = null;

const getShowSources    = () => (document.getElementById('pref-sources') || {checked:true}).checked;
const getShowConfidence = () => (document.getElementById('pref-flag')    || {checked:true}).checked;

let lastMatched = null;
let toastTimer;
let activeSearchQuery = '';

/* ── INIT ───────────────────────────────── */
function init() {
  renderPicksProducts();
  renderStandardProducts();
  injectSearchResultsSection();
  bindEvents();
}

/* ── SEARCH RESULTS SECTION ─────────────── */
function injectSearchResultsSection() {
  searchResultsSection = document.createElement('section');
  searchResultsSection.id = 'search-results-section';
  searchResultsSection.className = 'search-results-section';
  searchResultsSection.style.display = 'none';
  searchResultsSection.innerHTML = `
    <div class="sr-header">
      <div class="sr-title-row">
        <span class="sr-icon">🔍</span>
        <h2 class="sr-title" id="sr-title">Search Results</h2>
        <span class="sr-count" id="sr-count"></span>
        <span class="rag-badge" style="margin-left:8px">RAG-VERIFIED</span>
      </div>
      <button class="sr-clear-btn" id="sr-clear-btn">✕ Clear search</button>
    </div>
    <div class="sr-grid" id="sr-grid"></div>
    <div class="sr-no-results" id="sr-no-results" style="display:none">
      <div class="sr-no-icon">🤔</div>
      <div class="sr-no-text">No verified products found for this query.</div>
      <div class="sr-no-sub">Try a different keyword — or ask Doofus directly using the chat input above.</div>
    </div>
  `;

  const bottomGrid = document.querySelector('.bottom-grid');
  if (bottomGrid) {
    bottomGrid.parentNode.insertBefore(searchResultsSection, bottomGrid);
  }

  document.getElementById('sr-clear-btn').addEventListener('click', clearSearch);
}

function searchProducts(query) {
  if (!query.trim()) return [];
  var q = query.toLowerCase().trim();
  var words = q.split(/\s+/);

  return ALL_PRODUCTS.filter(function(p) {
    var nameMatch  = p.name.toLowerCase().includes(q);
    var tagMatch   = p.tags && p.tags.some(function(t) {
      return words.some(function(w) { return t.toLowerCase().includes(w) || w.includes(t.toLowerCase()); });
    });
    var wordMatch  = words.some(function(w) {
      return p.name.toLowerCase().includes(w);
    });
    return nameMatch || tagMatch || wordMatch;
  });
}

function renderSearchResults(query) {
  if (!searchResultsSection) return;
  activeSearchQuery = query;

  var results = searchProducts(query);
  var grid    = document.getElementById('sr-grid');
  var noRes   = document.getElementById('sr-no-results');
  var title   = document.getElementById('sr-title');
  var count   = document.getElementById('sr-count');

  title.textContent = 'Results for "' + query + '"';
  searchResultsSection.style.display = 'block';

  if (results.length === 0) {
    grid.innerHTML = '';
    noRes.style.display = 'block';
    count.textContent = '';
  } else {
    noRes.style.display = 'none';
    count.textContent = results.length + ' product' + (results.length !== 1 ? 's' : '') + ' found';

    grid.innerHTML = results.map(function(p) {
      var priceDisplay = p.price || ('$' + (p.priceNum || '—'));
      return `
        <div class="sr-card">
          <div class="sr-card-img">
            ${p.bestseller ? '<span class="badge-bestseller">BESTSELLER</span>' : ''}
            <span>${p.emoji}</span>
          </div>
          <div class="sr-card-body">
            <div class="sr-card-name">${p.name}</div>
            <div class="sr-card-stars">${p.stars} <span class="sr-card-reviews">(${p.reviews || '—'})</span></div>
            <div class="sr-card-price">${priceDisplay}</div>
            ${p.prime ? '<div class="sr-card-prime">✓ Prime</div>' : ''}
          </div>
          <div class="sr-why-box">
            <div class="sr-why-header">
              <span class="sr-why-icon">🐶</span>
              <span class="sr-why-label">Why Doofus recommends this</span>
              <span class="sr-why-badge">RAG</span>
            </div>
            <div class="sr-why-text">${p.reasonSummary || 'Verified against the sanitised product catalog with no data conflicts detected.'}</div>
            ${p.reasonPoints && p.reasonPoints.length ? `
            <ul class="sr-why-points">
              ${p.reasonPoints.map(function(pt) { return '<li>' + pt + '</li>'; }).join('')}
            </ul>` : ''}
          </div>
          <button class="sr-card-btn">View Details</button>
        </div>
      `;
    }).join('');
  }

  searchResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearSearch() {
  activeSearchQuery = '';
  if (searchResultsSection) searchResultsSection.style.display = 'none';
  searchInput.value = '';
  showToast('✕ Search cleared — showing all picks.');
}

/* ── PICKS RENDER ───────────────────────── */
function renderPicksProducts() {
  productList.innerHTML = PICKS_PRODUCTS.map(function(p) {
    var whyHtml = '';
    if (p.showReason) {
      whyHtml = `
        <div class="why-accordion">
          <button class="why-toggle-btn" data-id="${p.id}">
            <span class="why-toggle-icon">🐶</span>
            Why Doofus recommends this
            <svg class="why-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="why-body" id="why-${p.id}" style="display:none">
            <p class="why-summary">${p.reasonSummary}</p>
            ${p.reasonPoints && p.reasonPoints.length ? `<ul class="why-points">${p.reasonPoints.map(function(pt) { return '<li>' + pt + '</li>'; }).join('')}</ul>` : ''}
          </div>
        </div>
      `;
    }
    return `
      <div class="product-card-wrap">
        <div class="product-card">
          <div class="product-img">${p.emoji}</div>
          <div class="product-info">
            <div class="product-name">${p.name}</div>
            <div class="product-stars">${p.stars} <span class="product-review-count">${p.reviews} reviews</span></div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div class="product-price">${p.price}</div>
            ${p.prime ? '<div class="product-prime">✓ Prime</div>' : ''}
          </div>
        </div>
        ${whyHtml}
      </div>
    `;
  }).join('');

  productList.querySelectorAll('.why-toggle-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var id   = btn.getAttribute('data-id');
      var body = document.getElementById('why-' + id);
      var chev = btn.querySelector('.why-chevron');
      if (!body) return;
      var isOpen = body.style.display !== 'none';
      body.style.display = isOpen ? 'none' : 'block';
      btn.classList.toggle('open', !isOpen);
      if (chev) chev.style.transform = isOpen ? '' : 'rotate(180deg)';
    });
  });
}

/* ── STANDARD GRID RENDER ───────────────── */
function renderStandardProducts() {
  var STANDARD_PRODUCTS = ALL_PRODUCTS.filter(function(p) { return p.id.startsWith('s'); });
  standardGrid.innerHTML = STANDARD_PRODUCTS.map(function(p) {
    return `
      <div class="std-card">
        <div class="std-card-img">
          ${p.bestseller ? '<span class="badge-bestseller">BESTSELLER</span>' : ''}
          ${p.emoji}
        </div>
        <div class="std-card-body">
          <div class="std-card-name">${p.name}</div>
          <div class="std-card-stars">${p.stars} <span class="std-card-review">(${p.reviews})</span></div>
          <div class="std-card-price">${p.price}</div>
          ${p.prime ? '<div class="std-card-prime">✓ Prime</div>' : ''}
        </div>
        <button class="std-card-btn">View Details</button>
      </div>
    `;
  }).join('');
}

/* ── AI STATE ───────────────────────────── */
function setAIState(on) {
  if (on) {
    aiOnState.style.display  = 'block';
    aiOffState.style.display = 'none';
    toggleStateLabel.textContent = 'ON';
    toggleStateLabel.classList.remove('off');
    aiToggle.checked = true;
    showToast('🐶 Doofus AI is back — RAG-verified answers enabled.');
  } else {
    aiOnState.style.display  = 'none';
    aiOffState.style.display = 'block';
    toggleStateLabel.textContent = 'OFF';
    toggleStateLabel.classList.add('off');
    aiToggle.checked = false;
    showToast('ℹ️ Doofus AI paused — showing standard keyword results.');
  }
}

/* ── TOGGLE SYNC ────────────────────────── */
function syncToggles(changedId) {
  var pairs = {
    'pref-sources': 'auto-sources', 'auto-sources': 'pref-sources',
    'pref-flag':    'auto-flag',    'auto-flag':    'pref-flag',
    'pref-history': 'auto-history', 'auto-history': 'pref-history'
  };
  var dest = document.getElementById(pairs[changedId]);
  var src  = document.getElementById(changedId);
  if (dest && src) dest.checked = src.checked;
}

/* ── RESPONSE RENDER ────────────────────── */
function renderResponse(matched) {
  var showSources    = getShowSources();
  var showConfidence = getShowConfidence();

  var bodyHtml = matched.body;
  if (showConfidence && matched.hasUncertainty && matched.uncertaintyNote) {
    bodyHtml += '<div class="uncertainty-flag">⚠ Uncertain — ' + matched.uncertaintyNote + '</div>';
  }
  responseBubble.innerHTML = bodyHtml;

  var metaHtml = '<span class="verified" style="font-family:var(--font-mono);font-size:12px;color:var(--teal)">✓ RAG-Verified</span>';

  if (showConfidence) {
    var pct   = matched.confidence;
    var color = pct >= 90 ? '#22c55e' : pct >= 75 ? '#f5a623' : '#ef4444';
    var label = pct >= 90 ? 'High confidence' : pct >= 75 ? 'Moderate confidence' : 'Low confidence';
    metaHtml += '<div class="confidence-block">' +
      '<div class="confidence-header">' +
        '<span class="confidence-label">Confidence Score</span>' +
        '<span class="confidence-value" style="color:' + color + '">' + pct + '% — ' + label + '</span>' +
      '</div>' +
      '<div class="confidence-track">' +
        '<div class="confidence-fill" style="width:' + pct + '%;background:' + color + '"></div>' +
      '</div>' +
    '</div>';
  }

  if (showSources && matched.sources && matched.sources.length) {
    var pills = matched.sources.map(function(s) {
      return '<span class="source-pill">' + s + '</span>';
    }).join('');
    metaHtml += '<div class="sources-block"><span class="sources-label">Sources:</span>' + pills + '</div>';
  }

  responseMeta.innerHTML = metaHtml;
}

/* ── CHAT QUERY ─────────────────────────── */
function handleQuery(query) {
  if (!query.trim()) return;
  chatResponse.style.display = 'block';
  responseBubble.innerHTML   = '<div class="typing-dots"><span></span><span></span><span></span></div>';
  responseMeta.innerHTML     = '';

  var lower   = query.toLowerCase();
  var matched = DEFAULT_RESPONSE;
  for (var i = 0; i < DOOFUS_RESPONSES.length; i++) {
    var r = DOOFUS_RESPONSES[i];
    for (var j = 0; j < r.triggers.length; j++) {
      if (lower.indexOf(r.triggers[j]) !== -1) { matched = r; break; }
    }
    if (matched !== DEFAULT_RESPONSE) break;
  }
  lastMatched = matched;
  setTimeout(function() { renderResponse(matched); }, 900 + Math.floor(Math.random() * 400));
  chatInput.value = '';
}

function onToggleChange() {
  if (lastMatched && chatResponse.style.display !== 'none') {
    renderResponse(lastMatched);
  }
}

/* ── SEARCH HANDLER ─────────────────────── */
function handleSearch() {
  var q = searchInput.value.trim();
  if (!q) return;

  if (aiToggle.checked) {
    handleQuery(q);
    renderSearchResults(q);
    showToast('🔍 Doofus is verifying results for "' + q + '"…');
  } else {
    renderSearchResults(q);
    showToast('🔍 Showing standard results for "' + q + '"');
  }
}

/* ── TOAST ──────────────────────────────── */
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() { toast.classList.remove('show'); }, 3200);
}

/* ── EVENTS ─────────────────────────────── */
function bindEvents() {
  aiToggle.addEventListener('change', function() { setAIState(aiToggle.checked); });
  reEnableBtn.addEventListener('click', function() { setAIState(true); });

  chatSendBtn.addEventListener('click', function() { handleQuery(chatInput.value); });
  chatInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') handleQuery(chatInput.value); });

  prefsBtn.addEventListener('click', function() {
    prefsPanel.style.display = prefsPanel.style.display !== 'none' ? 'none' : 'block';
  });
  prefsCloseBtn.addEventListener('click', function() { prefsPanel.style.display = 'none'; });

  chipBtns.forEach(function(chip) {
    chip.addEventListener('click', function() {
      var q = chip.textContent.replace(/^[^\w]+/, '').trim();
      chatInput.value = q;
      handleQuery(q);
      renderSearchResults(q);
    });
  });

  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') handleSearch(); });

  ['pref-sources', 'auto-sources'].forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', function() {
      syncToggles(id);
      onToggleChange();
      showToast(el.checked
        ? '✅ Source citations ON — sources shown beneath every answer.'
        : '🔕 Source citations OFF — sources hidden from responses.');
    });
  });

  ['pref-flag', 'auto-flag'].forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', function() {
      syncToggles(id);
      onToggleChange();
      showToast(el.checked
        ? '✅ Confidence scores ON — uncertainty flags shown in answers.'
        : '🔕 Confidence scores OFF — uncertainty hidden from responses.');
    });
  });

  ['pref-history', 'auto-history'].forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', function() {
      syncToggles(id);
      var titleEl = document.querySelector('.picks-section .section-title');
      if (titleEl) {
        var icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
        titleEl.innerHTML = el.checked
          ? icon + ' Doofus Picks — Personalised for You'
          : icon + ' Doofus Picks — Verified Results';
      }
      showToast(el.checked
        ? '✅ Purchase history ON — picks tailored to your habits.'
        : '🔒 Purchase history OFF — showing generic verified picks.');
    });
  });

  document.addEventListener('click', function(e) {
    var card = e.target.closest('.product-card');
    if (card) {
      var name = card.querySelector('.product-name');
      if (name) showToast('📦 Viewing: ' + name.textContent.substring(0, 50) + '…');
    }
    var stdBtn = e.target.closest('.std-card-btn, .sr-card-btn');
    if (stdBtn) {
      var parentCard = stdBtn.closest('.std-card, .sr-card');
      var pName = parentCard && parentCard.querySelector('.std-card-name, .sr-card-name');
      if (pName) showToast('📦 Viewing: ' + pName.textContent.substring(0, 50) + '…');
    }
  });
}

document.addEventListener('DOMContentLoaded', init);