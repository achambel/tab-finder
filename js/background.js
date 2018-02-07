chrome.commands.onCommand.addListener(function (command) {
  console.log('Command:', command);
  window.open("../popup.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=no");
});