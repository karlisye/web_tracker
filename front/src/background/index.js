// import { runtime } from "webextension-polyfill";

// const postToBackend = async (record) => {
//     try {
//         const response = await fetch('http://127.0.0.1:8000/api/store-url', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//             },
//             body: JSON.stringify(record),
//         });

//         if (!response.ok) {
//             console.error('Backend rejected site record', response.status, await response.text());
//         } else {
//             console.log('Site recorded on backend:', record);
//         }
//     } catch (error) {
//         console.error('Error sending to backend:', error);
//     }
// };

// runtime.onMessage.addListener(async (message, sender) => {
//     if (!message.type || !message.type.startsWith('auth-')) return;

//     const { host, url } = message;

//     const record = {
//         host,
//         page_url: url,
//         method: message.type,
//         detected_at: new Date().toISOString().slice(0, 19).replace("T", " "),
//     };

//     postToBackend(record);
// });

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    if (request.token) {
      chrome.storage.local.set({ authToken: request.token }, () => {
        console.log("Token stored in extension");
        sendResponse({ status: "Token saved" });
      });
    } else {
      sendResponse({ status: "No token received" });
    }
    return true;
});
  