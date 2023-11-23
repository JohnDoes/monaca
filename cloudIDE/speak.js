//speaking setting
var api2 = "AIzaSyB2gSUJrtuVm6U7Dh_-idq19KL7RtBpvAg";
var text = '吾輩は猫である';
var fromLang = 'ja';
var toLang = 'ru';
var readNum = 0;
var speaking = false;
var numCng = false;

    //読み上げ
    // 音声合成
    function speak() {
        //console.log("speak_start");
        var l = "ja-JP";
        var t = "読み上げられません";
        var s = "1.00";
        var pattern = /[0-9a-zA-Zぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠_]/;


        try {
            var l = document.getElementById(String(readNum)).getAttribute("class");
            // l = l.toString();
            var t = document.getElementById(String(readNum)).textContent;
            // change backgroud color
            if(readNum != 1){
                document.getElementById(String(readNum-1)).style.backgroundColor = "white";
            }
            document.getElementById(String(readNum)).style.backgroundColor = "#88CC88";
            // t = t.toString();
            var s = document.getElementById("pitch").value;
            // s = s.toString();
            // console.log("set script", l, t, s);
        } catch (error) {
            console.error(error);
            speaking = false;
            next();
        }
        if(t.match(pattern)){
            const url = "https://texttospeech.googleapis.com/v1/text:synthesize?key="+api2+"";
            const data = {
                "input": {
                "text": t
                },
                "voice": {
                "languageCode": l
                },
                "audioConfig": {
                "audioEncoding": "MP3",
                "speaking_rate": s,
                "pitch": "0.00"               
                }
            }
            const otherparam={
                headers: {
                "content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(data),
                method: "POST"
            }
            fetch(url, otherparam)
                .then(data=>{return data.json()})
                .then(res=>{
                    //console.log("speech res");
                try {
                    var blobUrl = base64ToBlobUrl(res.audioContent)
                    var audio = new Audio()
                    audio.src = blobUrl
                    audio.play()
                    audio.onended = (event) => {
                        if(numCng && speaking) {
                            numCng = false;
                            speak();
                        }else if(speaking){
                            readNum = readNum + 1;
                            speak();
                        }
                    };
                } catch(e) {
                    console.log(e)
                }
                })
                .catch(error=>alert(error))  

                }else{
                if(numCng && speaking) {
                    numCng = false;
                    speak();
                }else if(speaking){
                    readNum = readNum + 1;
                    speak();
                }
        }
    }

    // Base64 → BlobUrl
    function base64ToBlobUrl(base64) {
        var bin = atob(base64.replace(/^.*,/, ''))
        var buffer = new Uint8Array(bin.length)
        for (let i = 0; i < bin.length; i++ ) {
            buffer[i] = bin.charCodeAt(i)
        }
        return window.URL.createObjectURL(new Blob([buffer.buffer], {type: "audio/wav"}))
    }
    function play() {
        //console.log("play");
        if(speaking){
            speak();
        }else {
            speaking = true;
            speak();
        }
    }
    function fore() {
        //console.log("fore");
        numCng = true;
        readNum = readNum + 1;
    }
    function back() {
        //console.log("back");
        numCng = true;
        readNum = readNum - 1;
    }
    function stop() {
        //console.log("stop");
        speaking = false;
    }
    function next() {
        // console.log("next");
        // speaking = false;
        nNum = nNum + 1;
        document.getElementById("num").value = nNum;
        nUrl = document.getElementById("url").value;
        nNum = document.getElementById("num").value;
        loadPage();
    }




document.getElementById("sw1").addEventListener("click", play, false);
document.getElementById("sw2").addEventListener("click", back, false);
document.getElementById("sw3").addEventListener("click", fore, false);
document.getElementById("sw4").addEventListener("click", next, false);
document.getElementById("sw5").addEventListener("click", stop, false);


