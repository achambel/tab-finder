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
    list = tabsFound.map((t, index) => {
      return `<a href="#!" class="collection-item avatar tab"
                  tabindex="${index}"
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

function selectTabItem (event, itemSelected, itemsTab) {
  switch (event.key) {
    case 'ArrowDown':
      nextTabItem(itemSelected, itemsTab);
      break;
    case 'ArrowUp':
      previousTabItem(itemSelected, itemsTab);
      break;
  }
}

function previousTabItem (itemSelected, itemsTab){
  if (itemSelected) {
    const previous = itemSelected.tabIndex === 0 ? itemsTab.length - 1 : itemSelected.tabIndex - 1;
    itemsTab[previous].focus();
  }
  else if (itemsTab.length) {
    itemsTab[itemsTab.length - 1].focus();
  }
}

function nextTabItem (itemSelected, itemsTab) {
  if (itemSelected) {
    const next = itemSelected.tabIndex === itemsTab.length - 1 ? 0 : itemSelected.tabIndex + 1;
    itemsTab[next].focus();
  }
  else if (itemsTab.length) {
    itemsTab[0].focus();
  }
}

function selectFirstTabItem (itemsTab) {
  if (itemsTab.length) {
    itemsTab[0].focus();
  }
}

document.querySelector('#query-form').addEventListener('submit', e => {
  e.preventDefault();
  const itemsTab = document.querySelectorAll('.tab');
  if (itemsTab.length) {
    itemsTab[0].focus();
  }
})

document.querySelector('#query').addEventListener('input', e => {
  e.preventDefault();
  chrome.tabs.query({}, searchInTabs);
});

document.addEventListener('keydown', e => {
  const eventsAllowed = ['ArrowDown', 'ArrowUp'];
  if (eventsAllowed.includes(e.key)) {
    const itemSelected = document.querySelector('.tab:focus');
    const itemsTab = document.querySelectorAll('.tab');
    selectTabItem(e, itemSelected, itemsTab);
  }
});
