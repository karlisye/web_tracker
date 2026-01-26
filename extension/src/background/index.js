let authDetected = false;

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

        case "auth-check":
            chrome.storage.local.get("authToken")
                .then(({ authToken }) => {
                    if (authToken) sendResponse(true);
                    else sendResponse(false);
                })
                .catch(() => sendResponse({ error: true }));

            return true;

        case "toggle-website-reader":
            sendResponse(message);
            chrome.storage.sync.set({ isActive: message.status });
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

        case 'auth-form-detected':
            authDetected = true;
            postToBackend(message);

        case 'auth-form-submitted':
            authDetected ? !authDetected : postToBackend(message);

        default:
            console.log("Unknown message type received:", message.type);
            sendResponse({ error: "Unknown message type" });
    }

});

const postToBackend = async (msg) => {
    const { host, url } = msg;
    const record = {
        host,
        page_url: url,
        method: msg.type,
        detected_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

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