// 点击插件栏图标即可打开插件内置index.html
chrome.browserAction.onClicked.addListener(function () {
    const index = chrome.extension.getURL('index.html');
    chrome.tabs.query({ url: index }, function (tabs) {
        if (tabs.length) {
            chrome.tabs.update(tabs[0].id, { active: true });
            chrome.windows.update(tabs[0].windowId, { focused: true });
        } else {
            chrome.tabs.create({ url: index });
        }
    });
});