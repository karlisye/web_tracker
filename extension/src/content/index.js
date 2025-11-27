// import { runtime, storage } from "webextension-polyfill";

const initAuthMonitoring = () => {
  const isAuthorizeForm = (form) => {
    const inputs = Array.from(form.querySelectorAll('input'));
    const hasPassword = inputs.some((input) => input.type === 'password');
    const hasUser = inputs.some((input) => {
      return ['email','text'].includes(input.type) ||
      /(email|user|login|username)/i.test(input.name || input.id || '')
    });
    return hasPassword && hasUser;
  };

  document.addEventListener('submit', (event) => {
    const form = event.target;
    if(isAuthorizeForm(form)){
      chrome.runtime.sendMessage({
        type: 'auth-form-submitted',
        host: location.host,
        url: location.href,
      });
    }
  }, true);

  // const originalFetch = window.fetch;
  // window.fetch = function (...args) {
  //   const url = typeof args[0] === 'string' ? args[0] : args[0].url;
  //   if(/login|register|signin|signup|auth/i.test(url)){
  //     runtime.sendMessage({
  //       type: 'auth-network-call',
  //       host: location.host,
  //       url,
  //     });
  //   }
  //   return originalFetch.apply(this, args);
  // };

  const observer = new MutationObserver(() => {
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
      if(isAuthorizeForm(form)) {
        console.log('Auth detected on: ', location.href);
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
};

chrome.storage.sync.get('isActive').then(({ isActive }) => {
  if (isActive) {
    initAuthMonitoring();
  } else {
    console.log("Auth monitoring is disabled.");
  }
});
