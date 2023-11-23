function narouBrowse () {
    var ref = cordova.InAppBrowser.open('https://yomou.syosetu.com/search.php', '_blank', 'location=yes');
    ref.addEventListener('loadstop', loadStopCallBack);
    
    function loadStopCallBack() {

        if (inAppBrowserRef != undefined) {
    
            inAppBrowserRef.executeScript({ code: "\
                var button = document.createElement('button');\
                var messageObj = {my_message: message};\
                var stringifiedMessageObj = JSON.stringify(messageObj);\
                webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj);"
            });
    
            $('#status-message').text("");
    
            inAppBrowserRef.show();
        }
    
    }

}

function kakuBrowse () {
    var ref = cordova.InAppBrowser.open('https://kakuyomu.jp/explore', '_blank', 'location=yes');

}