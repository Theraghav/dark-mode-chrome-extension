document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('isDarkMode').addEventListener('change', changeMode, false);
}, false);


function changeMode() {
  try {
    if (document.getElementById('isDarkMode').checked) {
      console.log('from extension inside add event listener');
      setBadgeTextAndStore('#32a852', 'Y');
      enableDarkMode();
    }
    else {
      console.log('Checkbox is not checked');
      setBadgeTextAndStore('#000000', 'N');
      chrome.tabs.reload();
    }
  } catch (error) {
    console.error('Error occurred while change color', error);
  }
}

function setBadgeTextAndStore(colorValue, textValue) {
  chrome.browserAction.setBadgeBackgroundColor({ color: colorValue });
  chrome.browserAction.setBadgeText({ text: textValue });
  chrome.storage.local.set({ isDarkModeEnabled: textValue }, function () {
    console.log('isDarkModeEnabled is set to ' + textValue);
  });
}

function enableDarkMode() {
  try {
    console.log('executing darkening script');
    // TRY2: wherever is background color change it dark
    // font color white, change it to dark
    // removed the querying of the tabs
    chrome.tabs.executeScript(
      {
        code: '      for (var i = 0; i < document.getElementsByTagName("*").length; i++) {\n' +
          '        document.getElementsByTagName("*")[i].style.backgroundColor = \'#222233\'\n' +
          '        document.getElementsByTagName("*")[i].style.color = \'#AACCFF\' }'
      });
  } catch (error) {
    console.error('Error occurred in enableDarkMode', error);
  }
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.status === 'complete') {
    chrome.storage.local.get(['isDarkModeEnabled'], function (result) {
      if (result.isDarkModeEnabled === 'Y') {
        document.getElementById('isDarkMode').setAttribute("checked", "true");
        enableDarkMode();
      }
    });
  }
});
