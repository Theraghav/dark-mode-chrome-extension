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
var dmEnabled = false;

function callbackfunction(msg, callback) {
  console.log(`in the callback function called ${msg}`);
  callback();
}

function changeMode() {
  try {
    if (!dmEnabled) {
      console.log(`current badge: ${dmEnabled} | Enabling darkening mode`);
      enableDarkMode();
      document.getElementById("msg").innerHTML = "Dark mode is enabled";
    }
  } catch (error) {
    console.log('Error occurred while change color', error);
  }
}


function enableDarkMode() {
  try {
    dmEnabled = true;
    console.log('executing darkening script');
    // wherever is background color change it dark
    // font color white, change it to dark
    // this is will by default act on the active tab only. removed query of tab
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

// To be used in the next version

// function setBadgeTextAndStore(colorValue, textValue) {
//   chrome.browserAction.setBadgeBackgroundColor({ color: colorValue });
//   chrome.browserAction.setBadgeText({ text: textValue });
// }

// var onTabLoadingComplete = function (tabId, changeInfo, tab) {
//   if (tab.status === 'complete') {
//     console.log('tab loading is completed');
//     enableDarkMode();
//   }
// }

// function callbackfunctionOnTabComplete(msg, callback) {
//   console.log(`in the callback function on tab complete n called ${msg}`);
//   callback(args1, args2, arg3);
// }

// function addBrowserUpdateEventListener() {
//   chrome.tabs.onUpdated.addListener(callbackfunctionOnTabComplete('bac', onTabLoadingComplete,tabId, changeInfo, tab));
// }

// function disableBrowserUpdateEventListener() {
//   setBadgeTextAndStore('#000000', 'N');
//   chrome.tabs.onUpdated.removeListener(callbackfunctionOnTabComplete('disloading', onTabLoadingComplete));
// }