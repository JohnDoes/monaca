
function getLang() {
    lang = document.getElementById("lng").value;
    console.log(lang);
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



function trans(t, b) {
    getLang();
    console.log("tr_start",lang1, lang2, lang3, lang4);
    document.getElementById("origin").innerHtml = "";
    var j = 0;
    for(let i = 0; i < t.length; i++) {
        console.log("tr_start_title");
        let dt = document.createElement('p');
        dt.insertAdjacentHTML('beforeend',t[i]);
        dt.id = j;
        dt.class = lang3;
        // 翻訳用原稿取得
        text = dt.textContent;
        j++;
        //もともとifなし
        if(lang1 = "ja"){
            console.log("tr_start_title_ja");
            document.getElementById("origin").appendChild(dt);
        }
        //翻訳文記入
        if(lang2 != "ja"){
            console.log("tr_start_title_foreign");


            let xhr = new XMLHttpRequest(); 
            // 翻訳
            const URL = "https://translation.googleapis.com/language/translate/v2?key="+api1+
                "&q="+encodeURI(text)+"&source=ja&target="+lang2+"";
            console.log(URL);
            xhr.open("POST", URL, true);
            // xhr.responseType = 'json';
            xhr.onload = (e) => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const res = JSON.parse(xhr.responseText); 
                        console.log(res["data"]["translations"][0]["translatedText"]);
                        scr = res["data"]["translations"][0]["translatedText"];
                        let tx = scr;
                        let dt = document.createElement('p');
                        dt.insertAdjacentHTML('beforeend', tx);
                        dt.id = j;
                        dt.class = lang4;
                        console.log("title_foreign", tx, dt);
                        //text = dt.textContent;
                        j++;
                        document.getElementById("origin").appendChild(dt);            
                    } else {
                        console.error(xhr.statusText);
                        break;
                    }
                }
            };
            xhr.onerror = (e) => {
                console.error(xhr.statusText);
                break;
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
        console.log("tr_honbun_start");

        let dt = document.createElement('p');
        dt.insertAdjacentHTML('beforeend',b[i]);
        dt.id = j;
        dt.class = lang3;
        // 翻訳用原稿取得
        text = dt.textContent;
        j++;
        //もともとifなし
        if(lang1 = "ja"){
            console.log("honbun_ja");
            document.getElementById("origin").appendChild(dt);
        }
        //翻訳文記入
        if(lang2 != "ja"){
            console.log("tr_honbun_foreign");


            let xhr = new XMLHttpRequest(); 
            // 翻訳
            const URL = "https://translation.googleapis.com/language/translate/v2?key="+api1+
                "&q="+encodeURI(text)+"&source=ja&target="+lang2+"";
            console.log(URL);
            xhr.open("POST", URL, true);
            // xhr.responseType = 'json';
            xhr.onload = (e) => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const res = JSON.parse(xhr.responseText); 
                        console.log(res["data"]["translations"][0]["translatedText"]);
                        scr = res["data"]["translations"][0]["translatedText"];
                        let tx = scr;
                        let dt = document.createElement('p');
                        dt.insertAdjacentHTML('beforeend', tx);
                        dt.id = j;
                        dt.class = lang4;
                        console.log("honbun_foreign", tx, dt);
                        //text = dt.textContent;
                        j++;
                        document.getElementById("origin").appendChild(dt);            
                    } else {
                        console.error(xhr.statusText);
                        break;
                    }
                }
            };
            xhr.onerror = (e) => {
                console.error(xhr.statusText);
                break;
            };
            xhr.send(null);

        }
    }
}
