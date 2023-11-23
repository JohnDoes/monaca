//translate setting
var lang, lang1, lang2, lang3, lang4;
var api1 = 'AIzaSyBSpuXyxIVjzO0Jodh4gQhFO1zppKvRIjQ';

function gtl(text, lng){
    console.log("tra_strt", text);
    // 翻訳
    const URL = "https://translation.googleapis.com/language/translate/v2?key="+api1+
        "&q="+encodeURIComponent(text)+"&source=ja&target="+lng+"";
    console.log(URL);
    ncmb.Script
        .query({"url": nUrl})      // クエリストリングを指定
        .exec("GET", "kakuI.js")
        .then(function(res){
            console.log("ck3", JSON.parse(res.body));
            console.log("ck3", JSON.parse(res.body).body[0]);
            var scr = JSON.parse(res.body).body[0];
        })
        .catch(function(err){
            console.log("error1", err);
        });
    return scr;
}

/*
"https://translation.googleapis.com/language/translate/v2?key=AIzaSyBSpuXyxIVjzO0Jodh4gQhFO1zppKvRIjQ&q=こんにちは&source=ja&target=en"


const xhr = new XMLHttpRequest();
xhr.open("GET", "/bar/foo.txt", true);
xhr.onload = (e) => {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.onerror = (e) => {
  console.error(xhr.statusText);
};
xhr.send(null);

*/