chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    if(!message.type) return;

    switch (message.type) {
        case "auth-token":
            console.log("Received token:", message.token);
            chrome.storage.local.set({ authToken: message.token });
            sendResponse({ status: "Token saved" });
            break;

        case 'remove-token':
            chrome.storage.local.remove('authToken', () => {
                console.log("Token removed from storage");
                sendResponse({ status: "Token removed" });
            });
            break;

        default:
            console.log("Unknown message type received:", message.type);
            sendResponse({ error: "Unknown message type" });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(!message.type) return;

    switch (message.type) {
        case 'redirect-to-login':
            chrome.tabs.create({ url: "http://localhost:5173/login" }, () => {
                console.log('redirected')
                sendResponse({ status: 'redirected' })
            });
            // need to return true to sendResponse work since create is asyncrnous
            return true;

        case 'auth-form-submitted':
            const { host, url } = message;
            const record = {
                host,
                page_url: url,
                method: message.type,
                detected_at: new Date().toISOString().slice(0, 19).replace("T", " "),
            };
            postToBackend(record);

        default:
            console.log("Unknown message type received:", message.type);
            sendResponse({ error: "Unknown message type" });
    }

});

const postToBackend = async (record) => {
    try {
        const { authToken } = await chrome.storage.local.get('authToken');
        if(!authToken) return
        const response = await fetch('http://127.0.0.1:8000/api/store-url', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(record),
        });

        if (!response.ok) {
            console.error('Backend rejected site record', response.status, await response.text());
        } else {
            console.log('Site recorded on backend:', record);
        }
    } catch (error) {
        console.error('Error sending to backend:', error);
    }
};