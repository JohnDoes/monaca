// getnovel variation
// novelUrl
var nUrl = "";
var nNum = "1";
var kc = /kakuyomu/;
var nc = /ncode/;
// ncmbAPIキー
// console.log("load ncmb api key");
var applicationKey = "0d5966f480263439a4ab14a28a26cd0d074c4448b12e7554043d9c479ab745a3";
var clientKey = "6425a24f12ad75095143739f261570511c979a78753fe2a590f5297ba902c0b2";
// SDKの初期化
// console.log("new ncmb");
var ncmb = new NCMB(applicationKey, clientKey);


    //getNoveldata
    function kakuload() {
        console.log("kakuload_start", nUrl, nNum);
        // メソッドチェーンでクエリストリングを付与し実行
        ncmb.Script
            .query({"url": nUrl, "num": nNum.toString()})      // クエリストリングを指定
            .exec("GET", "kakuI.js")
            .then(function(res){
                console.log("kakuI_end", JSON.parse(res.body).body,  JSON.parse(res.body).body[0]);
                // console.log("ck3", JSON.parse(res.body).body[parseInt(nNum) - 1]);
    
                // メソッドチェーンでクエリストリングを付与し実行
                ncmb.Script
                    //.query({"url": "https://kakuyomu.jp" + JSON.parse(res.body).body[parseInt(nNum) - 1]})      // クエリストリングを指定
                    .query({"url": "https://kakuyomu.jp" + JSON.parse(res.body).body[0]})      // クエリストリングを指定
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
    console.log("narouload_start");

    // メソッドチェーンでクエリストリングを付与し実行
    ncmb.Script
        .query({"url": nUrl + "/" + nNum.toString() + "/"})      // クエリストリングを指定
        .exec("GET", "narou.js")
        .then(function(res){
            console.log("narou_end", JSON.parse(res.body).body);
            trans(JSON.parse(res.body).title, JSON.parse(res.body).body);
        })
        .catch(function(err){
            console.log("narou", err);
        });
}

function loadPage() {
    // console.log("load get novels");
    nUrl = document.getElementById("url").value;
    nNum = parseInt(document.getElementById("num").value);
    nUrl = nUrl.toString();
    console.log("loadPage_start");
    //console.log(kc.exec(nUrl));
    //console.log(nc.exec(nUrl));
    if(nUrl.match(kc)) {
        kakuload();
    }

    if(nUrl.match(nc)){
        narouload();
    }
}
document.getElementById("ck").addEventListener("click", loadPage(), false);



