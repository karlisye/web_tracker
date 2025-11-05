import browser from "webextension-polyfill";

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if(changeInfo.status === 'complete'){
        try {
            const { isActive } = await browser.storage.sync.get('isActive');

            if (!isActive) {
                console.log('Background script is inactive. Skipping...');
                return;
            }

            console.log('Tab updated: ', tab.url);
            const tabName = new URL(tab.url);
    
            const response = await fetch('http://127.0.0.1:8000/api/store-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name: tabName.hostname,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.message);
    
            //strada ar majaslapas DOM
            browser.scripting.executeScript({
                target: { tabId },
                func: () => {
                    console.log('page finished loading')

                    const keywords = ['sign out', 'signout', 'log out', 'logout', 'beigt darbu'];

                    const elements = document.querySelectorAll('a, button');

                    elements.forEach(el => {
                        const text = el.innerText?.toLowerCase() || el.value?.toLowerCase() || '';
                        
                        if (keywords.some(keyword => text.includes(keyword))) {
                            console.log("Found a log-out button: ", el);
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error on tab update:', error);
        }

    }
});
browser.runtime.onInstalled.addListener(() => {
    browser.storage.sync.set({ isActive: false });
});