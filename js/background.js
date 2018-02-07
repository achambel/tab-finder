chrome.commands.onCommand.addListener(function (command) {
  if (command === 'open-query-form') {
    window.open("../popup.html", "extension_popup", "width=800,height=600,status=no,scrollbars=yes,resizable=no");
  }
});