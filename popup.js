/*call chromeBrowserAction on click event.
    if the badge is not equal to 'Y' 
        set the badge to 'Y'
        darken the page
        set tabs updated event listener
    else if the badge is 'Y'
        set the badge to 'N'
        refresh the page
        destroy tabs updated event listener.*/


chrome.browserAction.onClicked.addListener(callbackfunction('browser action on clicked event', changeMode))

function callbackfunction(msg, callback) {
  console.log(`in the callback function called ${msg}`);
  callback();
}

function changeMode() {
  try {
    chrome.browserAction.getBadgeText({}, function (result) {
      if (result !== 'Y') {
        console.log(`current badge: ${result} | Enabling darkening mode`);
        setBadgeTextAndStore('#32a852', 'Y');
        enableDarkMode();
        addBrowserUpdateEventListener();
      }
      else if (result === 'Y') {
        console.log('Disabling dark mode');
        setBadgeTextAndStore('#000000', 'N');
        chrome.tabs.reload();
        disableBrowserUpdateEventListener();
      }
    });
  } catch (error) {
    console.error('Error occurred while change color', error);
  }
}

function setBadgeTextAndStore(colorValue, textValue) {
  chrome.browserAction.setBadgeBackgroundColor({ color: colorValue });
  chrome.browserAction.setBadgeText({ text: textValue });
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

var onTabLoadingComplete = function (tabId, changeInfo, tab) {
  if (tab.status === 'complete') {
    console.log('tab loading is completed');
    enableDarkMode();
  }
}

function callbackfunctionOnTabComplete(msg, callback) {
  console.log(`in the callback functio on tab complete n called ${msg}`);
  callback(args1, args2, arg3);
}

function addBrowserUpdateEventListener() {
  chrome.tabs.onUpdated.addListener(callbackfunctionOnTabComplete('bac', onTabLoadingComplete,tabId, changeInfo, tab));
}

function disableBrowserUpdateEventListener() {
  setBadgeTextAndStore('#000000', 'N');
  chrome.tabs.onUpdated.removeListener(callbackfunctionOnTabComplete('disloading', onTabLoadingComplete));
}