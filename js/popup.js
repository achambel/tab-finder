function searchInTabs (tabs) {
  const query = document.querySelector('#query');
  const tabsFound = tabs.filter(tab => {
    const regex = new RegExp(query.value, 'i');
    return regex.test(tab.url) || regex.test(tab.title)
  });
  renderResults(tabsFound);
}

function renderResults (tabsFound) {
  let list = 'Title or URL not found.';
  if (tabsFound.length) {
    list = tabsFound.map(t => {
      return `<li class="tab"
                  data-tab-window-id="${t.windowId}"
                  data-tab-id="${t.id}">
                ${t.title} (${t.url})
              </li>`
    });
    list = `<ul>${list.join('')}</ul>`;
  }
  document.querySelector('#results').innerHTML = list;
  document.querySelectorAll('.tab').forEach(li => {
    li.addEventListener('click', function () {
      const windowId = parseInt(this.dataset.tabWindowId);
      const id = parseInt(this.dataset.tabId);
      chrome.windows.update(windowId, {focused: true});
      chrome.tabs.update(id, {active: true});
    });
  });
}

var query = document.querySelector('#query');
query.addEventListener('input', function (e) {
  e.preventDefault();
  chrome.tabs.query({},  searchInTabs);
});