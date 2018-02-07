function searchInTabs (tabs) {
  const query = document.querySelector('#query');
  const tabsFound = tabs.filter(tab => {
    const regex = new RegExp(query.value, 'i');
    return regex.test(tab.url) || regex.test(tab.title)
  });
  renderResults(tabsFound);
}

function renderResults (tabsFound) {
  let list = `<div class="card-panel teal">
                <h5 class="center-align white-text">
                <i class="medium material-icons">sentiment_very_dissatisfied</i>
                Title or URL not found.
                </h5>
              </div>`;
  if (tabsFound.length) {
    list = tabsFound.map(t => {
      return `<a href="#!" class="collection-item avatar tab"
                  data-tab-window-id="${t.windowId}"
                  data-tab-id="${t.id}">
                <img src="${t.favIconUrl || ''}" class="circle">
                <span class="title">${t.title}</span>
                <p><small>${t.url}</small></p>
              </a>`
    });
    list = `<div class="collection">
              ${list.join('')}
            </div>`;
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