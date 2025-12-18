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

  const detectedForms = new WeakSet();
  
  const observer = new MutationObserver(() => {
    document.querySelectorAll('form').forEach((form) => {
      if (detectedForms.has(form)) return;

      if (isAuthorizeForm(form)) {
        detectedForms.add(form);

        console.log('Auth detected on:', location.href);
        chrome.runtime.sendMessage({
          type: 'auth-form-detected',
          host: location.host,
          url: location.href,
        });

        observer.disconnect();
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
