
const event = window.cordova ? 'deviceready' : 'DOMContentLoaded';
document.addEventListener(event, () => {

    // getnovel variation
    // novelUrl
    var nUrl = "";
    var nNum = 1;
    var kc = /kakuyomu/;
    var nc = /ncode/;
    // ncmbAPIキー
    // console.log("load ncmb api key");
    var applicationKey = "0d5966f480263439a4ab14a28a26cd0d074c4448b12e7554043d9c479ab745a3";
    var clientKey = "6425a24f12ad75095143739f261570511c979a78753fe2a590f5297ba902c0b2";
    // SDKの初期化
    // console.log("new ncmb");
    var ncmb = new NCMB(applicationKey, clientKey);

    //speaking setting
    var api2 = "AIzaSyB2gSUJrtuVm6U7Dh_-idq19KL7RtBpvAg";
    var text = '吾輩は猫である';
    var fromLang = 'ja';
    var toLang = 'ru';
    var readNum = 0;
    var speaking = false;
    var numCng = false;

    //translate setting
    var lang, lang1, lang2, lang3, lang4;
    var api1 = 'AIzaSyBSpuXyxIVjzO0Jodh4gQhFO1zppKvRIjQ';



    //set lang
    function getLang() {
        lang = document.getElementById("lng").value;
        //console.log("set language:", lang);
        switch(lang){
           case "ja":
               lang1 = "ja";
               lang2 = "ja";
               lang3 = "ja-JP";
               lang4 = "ja-JP";
               break;
           case "en-ja":
               lang1 = "ja";
               lang2 = "en";
               lang3 = "ja-JP";
               lang4 = "en-US";
               break;
           case "fr-ja":
               lang1 = "ja";
               lang2 = "fr";
               lang3 = "ja-JP";
               lang4 = "fr-FR";
               break;
           case "du-ja":
               lang1 = "ja";
               lang2 = "du";
               lang3 = "ja-JP";
               lang4 = "du-DU";
               break;
           case "ru-ja":
               lang1 = "ja";
               lang2 = "ru";
               lang3 = "ja-JP";
               lang4 = "ru-RU";
               break;
           case "zh-ja":
               lang1 = "ja";
               lang2 = "zh";
               lang3 = "ja-JP";
               lang4 = "zh-CN";
               break;
           case "kr-ja":
               lang1 = "ja";
               lang2 = "kr";
               lang3 = "ja-JP";
               lang4 = "kr-KR";
               break;
           case "ar-ja":
               lang1 = "ja";
               lang2 = "ar";
               lang3 = "ja-JP";
               lang4 = "ar-EG";
               break;
           case "it-ja":
               lang1 = "ja";
               lang2 = "it";
               lang3 = "ja-JP";
               lang4 = "it-IT";
               break;
           case "fi-ja":
               lang1 = "ja";
               lang2 = "fi";
               lang3 = "ja-JP";
               lang4 = "fi-FI";
           case "en":
               lang1 = "en";
               lang2 = "en";
               lang3 = "en-US";
               lang4 = "en-US";
           case "fr":
               lang1 = "fr";
               lang2 = "fr";
               lang3 = "fr-FR";
               lang4 = "fr-FR";
           case "du":
               lang1 = "du";
               lang2 = "du";
               lang3 = "du-DU";
               lang4 = "du-DU";
           case "ru":
               lang1 = "ru";
               lang2 = "ru";
               lang3 = "ru-RU";
               lang4 = "ru-RU";
           case "zh":
               lang1 = "zh";
               lang2 = "zh";
               lang3 = "zh-CN";
               lang4 = "zh-CN";
           case "kr":
               lang1 = "kr";
               lang2 = "kr";
               lang3 = "kr-KR";
               lang4 = "kr-KR";
           case "ar":
               lang1 = "ar";
               lang2 = "ar";
               lang3 = "ar-EG";
               lang4 = "ar-EG";
           case "it":
               lang1 = "it";
               lang2 = "it";
               lang3 = "it-IT";
               lang4 = "it-IT";
           case "fi":
               lang1 = "fi";
               lang2 = "fi";
               lang3 = "fi-FI";
               lang4 = "fi-FI";
       }
    }
    
    
    //get data and write novel

    function trans(t, b) {
        getLang();
        //console.log("tr_start",lang1, lang2, lang3, lang4);
        document.getElementById("origin").innerHtml = "";
        var j = 0;
        for(let i = 0; i < t.length; i++) {
            //console.log("tr_start_title");
            let dt = document.createElement('p');
            dt.insertAdjacentHTML('beforeend',t[i]);
            dt.id = j;
            dt.className = lang3;
            // 翻訳用原稿取得
            text = dt.textContent;
            j++;
            //もともとifなし
            if(lang1 = "ja"){
                //console.log("tr_start_title_ja");
                document.getElementById("origin").appendChild(dt);
            }
            //翻訳文記入
            if(lang2 != "ja"){
                //console.log("tr_start_title_foreign");
    
    
                let xhr = new XMLHttpRequest(); 
                // 翻訳
                const URL = "https://translation.googleapis.com/language/translate/v2?key="+api1+
                    "&q="+encodeURI(text)+"&source=ja&target="+lang2+"";
                //console.log(URL);
                xhr.open("POST", URL, false);
                // xhr.responseType = 'json';
                xhr.onload = (e) => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            const res = JSON.parse(xhr.responseText); 
                            //console.log(res["data"]["translations"][0]["translatedText"]);
                            scr = res["data"]["translations"][0]["translatedText"];
                            let tx = scr;
                            let dt = document.createElement('p');
                            dt.insertAdjacentHTML('beforeend', tx);
                            dt.id = j;
                            dt.className = lang4;
                            //console.log("title_foreign", tx, dt);
                            //text = dt.textContent;
                            j++;
                            document.getElementById("origin").appendChild(dt);            
                        } else {
                            console.error(xhr.statusText);
                        }
                    }
                };
                xhr.onerror = (e) => {
                    console.error(xhr.statusText);
                };
                xhr.send(null);
            
    
                /*
                let tx = gtl(text, lang2);
                let dt = document.createElement('p');
                dt.insertAdjacentHTML('beforeend', tx);
                dt.id = j;
                dt.class = lang4;
                console.log("title_foreign", tx, dt);
                //text = dt.textContent;
                j++;
                document.getElementById("origin").appendChild(dt);
                */
            }
        }
        for(let i = 0; i < b.length; i++) {
            //console.log("tr_honbun_start");
    
            let dt = document.createElement('p');
            dt.insertAdjacentHTML('beforeend',b[i]);
            dt.id = j;
            dt.className = lang3;
            // 翻訳用原稿取得
            text = dt.textContent;
            j++;
            //もともとifなし
            if(lang1 = "ja"){
                //console.log("honbun_ja");
                document.getElementById("origin").appendChild(dt);
            }
            //翻訳文記入
            if(lang2 != "ja"){
                //console.log("tr_honbun_foreign");
    
    
                let xhr = new XMLHttpRequest(); 
                // 翻訳
                const URL = "https://translation.googleapis.com/language/translate/v2?key="+api1+
                    "&q="+encodeURI(text)+"&source=ja&target="+lang2+"";
                //console.log(URL);
                xhr.open("POST", URL, false);
                // xhr.responseType = 'json';
                xhr.onload = (e) => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            const res = JSON.parse(xhr.responseText); 
                            //console.log(res["data"]["translations"][0]["translatedText"]);
                            scr = res["data"]["translations"][0]["translatedText"];
                            let tx = scr;
                            let dt = document.createElement('p');
                            dt.insertAdjacentHTML('beforeend', tx);
                            dt.id = j;
                            dt.className = lang4;
                            //console.log("honbun_foreign", tx, dt);
                            //text = dt.textContent;
                            j++;
                            document.getElementById("origin").appendChild(dt);            
                        } else {
                            console.error(xhr.statusText);
                        }
                    }
                };
                xhr.onerror = (e) => {
                    console.error(xhr.statusText);
                };
                xhr.send(null);
    
            }
        }
    }
            

    //getNoveldata
    function kakuload() {
        //console.log("kakuload_start", nUrl, nNum);
        // メソッドチェーンでクエリストリングを付与し実行
        ncmb.Script
            .query({"url": nUrl, "num": nNum.toString()})      // クエリストリングを指定
            .exec("GET", "kakuI.js")
            .then(function(res){
                //console.log("kakuI_end", JSON.parse(res.body).body);
                // console.log("ck3", JSON.parse(res.body).body[parseInt(nNum) - 1]);
    
                // メソッドチェーンでクエリストリングを付与し実行
                ncmb.Script
                    //.query({"url": "https://kakuyomu.jp" + JSON.parse(res.body).body[parseInt(nNum) - 1]})      // クエリストリングを指定
                    .query({"url": "https://kakuyomu.jp" + JSON.parse(res.body).body})      // クエリストリングを指定
                    .exec("GET", "kaku.js")
                    .then(function(res){
                        // console.log("kaku_end", JSON.parse(res.body).title, JSON.parse(res.body).body);
                        trans(JSON.parse(res.body).title, JSON.parse(res.body).body);
                    })
                    .catch(function(err){
                        console.log("kaku_error", err);
                    });
            })
            .catch(function(err){
                console.log("kakuI_error", err);
            });
    
    }
        
    function narouload() {
        // console.log("narouload_start");
    
        // メソッドチェーンでクエリストリングを付与し実行
        ncmb.Script
            .query({"url": nUrl + "/" + nNum.toString() + "/"})      // クエリストリングを指定
            .exec("GET", "narou.js")
            .then(function(res){
                // console.log("narou_end", JSON.parse(res.body).body);
                trans(JSON.parse(res.body).title, JSON.parse(res.body).body);
            })
            .catch(function(err){
                // console.log("narou", err);
            });
    }
    
    function loadPage() {
        // console.log("load get novels");
        nUrl = document.getElementById("url").value;
        nNum = parseInt(document.getElementById("num").value);
        nUrl = nUrl.toString();
        // console.log("loadPage_start");
        //console.log(kc.exec(nUrl));
        //console.log(nc.exec(nUrl));
        if(nUrl.match(kc)) {
            kakuload();
        }
    
        if(nUrl.match(nc)){
            narouload();
        }
    }
    



    //読み上げ
    // 音声合成
    function speak() {
        console.log("speak_start");
        var l = "ja-JP";
        var t = "読み上げられません";
        var s = "1.00";

        try {
            var l = document.getElementById(String(readNum)).getAttribute("class");
            // l = l.toString();
            var t = document.getElementById(String(readNum)).textContent;
            // t = t.toString();
            var s = document.getElementById("pitch").value;
            // s = s.toString();
            console.log("set script", l, t, s);
        } catch (error) {
            console.error(error);
            speaking = false;
            next();
        }

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
            console.log("speech res");
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
        console.log("play");
        speaking = true;
        speak();
    }
    function fore() {
        console.log("fore");
        numCng = true;
        readNum = readNum + 1;
    }
    function back() {
        console.log("back");
        numCng = true;
        readNum = readNum - 1;
    }
    function stop() {
        console.log("stop");
        speaking = false;
    }
    function next() {
        console.log("next");
        speaking = false;
        nNum = nNum + 1;
        document.getElementById("num").value = nNum;
        nUrl = document.getElementById("url").value;
        nNum = document.getElementById("num").value;
        loadPage();
    }




    document.getElementById("ck").addEventListener("click", loadPage(), false);

    document.getElementById("sw1").addEventListener("click", play, false);
    document.getElementById("sw2").addEventListener("click", back, false);
    document.getElementById("sw3").addEventListener("click", fore, false);
    document.getElementById("sw4").addEventListener("click", next, false);
    document.getElementById("sw5").addEventListener("click", stop, false);
    
    
});


