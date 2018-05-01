document.addEventListener('DOMContentLoaded', function () {
  var checkPageButton = document.getElementById('changeColor')
  checkPageButton.addEventListener('click',changeColor, false)
}, false)

function changeColor() {
  console.log('from extension inside add event listener')
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    console.log('tabs', tabs)
 

    //TRY2: wherever is background color change it dark
    //font color white, change it to dark
    
    chrome.tabs.executeScript(
      tabs[0].id,
      {code:
        '      for (var i = 0; i < document.getElementsByTagName("*").length; i++) {\n' +
        '        document.getElementsByTagName("*")[i].style.backgroundColor = \'#222233\'\n' +
        '        document.getElementsByTagName("*")[i].style.color = \'#AACCFF\' }'
      })
  })
}