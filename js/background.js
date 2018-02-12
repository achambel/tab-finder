chrome.commands.onCommand.addListener(function (command) {
  if (command === 'open-query-form') {
    var left = (window.screen.availWidth - 800) / 2;
    var top = (window.screen.availHeight - 600) / 2;

    window.open("../popup.html", "Tab Finder", `width=800,height=600,status=no,scrollbars=yes,resizable=no,left=${left},top=${top}`);
  }
});

chrome.tabs.onUpdated.addListener(tabsBadgeCounter);
chrome.tabs.onRemoved.addListener(tabsBadgeCounter);

function tabsBadgeCounter () {
  chrome.tabs.query({}, tabs => {
    chrome.browserAction.setBadgeText({ text: tabs.length + '' });
    chrome.browserAction.setBadgeBackgroundColor({ color: 'red'});
  })
}