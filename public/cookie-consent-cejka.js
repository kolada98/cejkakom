/**
 * Cookie Consent — cejkakominy.cz
 * GDPR compliant — uses gtag Consent Mode v2
 * Google tag loads immediately but sends NO data until consent
 */

(function () {
  var CONSENT_KEY = 'cookie_consent_v1';
  var CONSENT_ACCEPTED = 'accepted';
  var CONSENT_REJECTED = 'rejected';

  var GA_ID = 'G-732SMBTBH8';

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
    try { localStorage.setItem(CONSENT_KEY + '_date', new Date().toISOString()); } catch (e) {}
  }

  // Consent Mode v2 — loads gtag immediately, blocks data until consent
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    analytics_storage: 'denied',
    wait_for_update: 500
  });

  var gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(gtagScript);

  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });

  function acceptAll() {
    setConsent(CONSENT_ACCEPTED);
    gtag('consent', 'update', { analytics_storage: 'granted' });
    hideBanner();
  }

  function rejectAll() {
    setConsent(CONSENT_REJECTED);
    hideBanner();
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(function () { banner.style.display = 'none'; }, 300);
    }
  }

  if (getConsent() === CONSENT_ACCEPTED) {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }

  function createBanner() {
    if (getConsent()) return;

    var banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Souhlas s cookies');
    banner.innerHTML = [
      '<div style="max-width:680px;margin:0 auto;display:flex;flex-direction:column;gap:12px;">',
        '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">',
          '<div style="flex:1;min-width:200px;">',
            '<p style="margin:0 0 6px;font-weight:700;font-size:15px;color:#0B1F3A;">Pou\u017e\xedv\xe1me cookies \ud83c\udf6a</p>',
            '<p style="margin:0;font-size:13px;line-height:1.5;color:#555;">',
              'Tento web pou\u017e\xedv\xe1 Google Analytics ke sledov\xe1n\xed n\xe1v\u0161t\u011bvnosti. ',
              'Analytick\xe9 cookies pou\u017eijeme pouze s va\u0161\xedm souhlasem.',
            '</p>',
          '</div>',
          '<div style="display:flex;gap:8px;align-items:center;flex-shrink:0;flex-wrap:wrap;">',
            '<button id="cookie-reject" style="padding:9px 16px;border:1px solid #ccc;background:#fff;color:#555;border-radius:6px;font-size:13px;cursor:pointer;font-family:inherit;transition:all 0.2s;white-space:nowrap;">Odm\xednout</button>',
            '<button id="cookie-accept" style="padding:9px 20px;border:none;background:#F0A500;color:#fff;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:all 0.2s;white-space:nowrap;">P\u0159ijmout</button>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');

    banner.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%) translateY(0);width:calc(100% - 32px);max-width:780px;background:#fff;border:1px solid #e8e8e8;box-shadow:0 4px 24px rgba(0,0,0,0.12);border-radius:12px;padding:16px 20px;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;transition:opacity 0.3s ease,transform 0.3s ease;box-sizing:border-box;';

    document.body.appendChild(banner);
    document.getElementById('cookie-accept').addEventListener('click', acceptAll);
    document.getElementById('cookie-reject').addEventListener('click', rejectAll);
  }

  if (document.body) { createBanner(); }
  else { document.addEventListener('DOMContentLoaded', createBanner); }

})();
