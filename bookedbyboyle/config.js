// ============================================================
// BOOKED BY BOYLE — SUPABASE CONFIG
// ============================================================
const SUPABASE_URL      = 'https://txunusbzlapvkwgsftil.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4dW51c2J6bGFwdmt3Z3NmdGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4NzI2OTEsImV4cCI6MjA5MzQ0ODY5MX0.woJcvNJIQBNHAibRTRRWV5kq-G90qM7OpV6E-OSyS0E';

// ============================================================
// SITE NAVIGATION
// ============================================================
const NAV = {
  residential:  'index.html',
  commercial:   'commercial.html',
  contractor:   'contractor.html',
  login:        'login.html',
  dashboard:    'contractor-dashboard.html',
  terms:        'contractor-terms.html',
};



// ============================================================
// REFERRAL CREDITS
// Unified to $100 flat across all trades.
// ============================================================
const REFERRAL_CREDITS = {
  high: { label: '$50 off next booking', amount: 50, fullWaiver: false },
  mid:  { label: '$50 off next booking', amount: 50, fullWaiver: false },
  low:  { label: '$50 off next booking', amount: 50, fullWaiver: false },
};

// ============================================================
// UNIVERSAL NAV HTML
//
// Usage:
//   renderNav('residential')
//   renderNav('commercial')
//   renderNav('contractor')
//
// Optional page-anchor links (shown before the | separator):
//   renderNav('commercial', [
//     { href: '#how-it-works', label: 'How It Works' },
//     { href: '#why-us',       label: 'Why Booked by Boyle?' },
//     { href: '#faq',          label: 'FAQ' },
//   ])
//
// Any page can pass anchors — they appear before the | divider.
// If no anchors passed, the | divider is hidden automatically.
// ============================================================
function renderNav(activePage, anchors = []) {
  const pages = [
    { key: 'residential', label: 'Residential',     href: NAV.residential },
    { key: 'commercial',  label: 'Commercial',      href: NAV.commercial  },
    { key: 'contractor',  label: 'For Contractors', href: NAV.contractor  },
  ];

  const anchorLinks = anchors.map(a => `
    <a href="${a.href}" class="nav-link hover:text-orange-500 transition-colors">
      ${a.label}
    </a>`).join('');

  const separator = anchors.length
    ? `<span class="nav-sep">|</span>`
    : '';

  const siteLinks = pages.map(p => `
    <a href="${p.href}"
       class="nav-link hover:text-orange-500 transition-colors ${activePage === p.key ? 'text-orange-500' : ''}">
      ${p.label}
    </a>`).join('');

  const topBarCopy = activePage === 'contractor'
    ? '🔨 JOIN FREE — NO MONTHLY FEES. PAY ONLY WHEN YOU GET BOOKED.'
    : activePage === 'commercial'
    ? '🏢 100% FREE FOR PROPERTY OWNERS & MANAGERS — NO HIDDEN FEES.'
    : '🏠 100% FREE FOR HOME OWNERS — NO HIDDEN FEES. EVER.';

  const ctaCopy = activePage === 'contractor'
    ? 'Apply for the Network'
    : activePage === 'commercial'
    ? 'Request Vetted Bids'
    : 'Schedule Free Quotes';

  const ctaHref = activePage === 'contractor' ? '#signup' : '#request';

  return `
  <div class="brand-orange-bg text-white text-center py-1.5 text-xs font-bold uppercase tracking-widest px-4 flex flex-row justify-center gap-8 flex-wrap">
    <span>${topBarCopy}</span>
    <div class="flex gap-4 justify-center items-center">
      <a href="tel:6318001602" class="hover:underline">📞 (631) 800-1602</a>
      <a href="mailto:Declan@BookedByBoyle.com" class="hover:underline">✉️ Declan@BookedByBoyle.com</a>
    </div>
  </div>
  <nav class="w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center flex-wrap gap-4">
      <a href="${NAV.residential}">
        <img src="https://res.cloudinary.com/dkmlcoqjn/image/upload/Untitled_3_uw5hxn.png"
             alt="Booked by Boyle" class="logo-img">
      </a>
      <div class="flex gap-6 nav-font text-[13px] flex-wrap items-center">
        ${anchorLinks}
        ${separator}
        ${siteLinks}
        <a href="${NAV.login}"
           class="nav-link text-slate-500 hover:text-orange-500 transition-colors ${activePage === 'login' ? 'text-orange-500' : ''}">
          Login
        </a>
      </div>
      <a href="${ctaHref}"
         class="brand-orange-bg hover:bg-[#e85a20] text-white px-7 py-3 rounded-xl nav-font transition-all shadow-lg text-base">
        ${ctaCopy}
      </a>
    </div>
  </nav>`;
}

// ============================================================
// UNIVERSAL FOOTER HTML
// ============================================================
function renderFooter() {
  return `
  <footer class="bg-slate-900 py-12 px-6 border-t border-slate-800">
    <div class="flex justify-center mb-8">
      <a href="${NAV.residential}">
        <div class="inline-block bg-white p-2 px-4 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300">
          <img src="https://res.cloudinary.com/dkmlcoqjn/image/upload/Untitled_3_uw5hxn.png"
               alt="Booked by Boyle" class="h-10 w-auto mx-auto block">
        </div>
      </a>
    </div>
    <p class="text-center text-slate-400 font-bold italic uppercase tracking-widest text-sm mb-8">
      Free for Property Owners · Vetted Contractors · Your Schedule · Your Terms · Zero Spam
    </p>
    <div class="flex flex-wrap justify-center gap-6 mb-8 text-xs font-bold uppercase tracking-widest">
      <a href="${NAV.residential}"  class="text-slate-500 hover:text-orange-500 transition-colors">Residential</a>
      <a href="${NAV.commercial}"   class="text-slate-500 hover:text-orange-500 transition-colors">Commercial</a>
      <a href="${NAV.contractor}"   class="text-slate-500 hover:text-orange-500 transition-colors">For Contractors</a>
      <a href="${NAV.login}"        class="text-slate-500 hover:text-orange-500 transition-colors">Login</a>
      <a href="${NAV.terms}"        class="text-slate-500 hover:text-orange-500 transition-colors">Contractor Terms</a>
    </div>
    <div class="flex flex-row justify-center gap-4 mb-8 text-sm flex-wrap">
      <a href="tel:6318001602"
         class="text-slate-500 hover:text-orange-500 transition-colors font-medium">📞 (631) 800-1602</a>
      <span class="text-slate-700">·</span>
      <a href="mailto:Declan@BookedByBoyle.com"
         class="text-slate-500 hover:text-orange-500 transition-colors font-medium">✉️ Declan@BookedByBoyle.com</a>
    </div>
    <p class="text-slate-600 text-xs text-center">© 2026 Booked by Boyle. All rights reserved.</p>
  </footer>`;
}

// ============================================================
// SUPABASE CLIENT INIT
// ============================================================
function initSupabase() {
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    return supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  console.warn('Supabase CDN not loaded. Add the script tag before config.js');
  return null;
}