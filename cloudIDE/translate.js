//translate setting
var lang, lang1, lang2, lang3, lang4;
var api1 = 'AIzaSyBSpuXyxIVjzO0Jodh4gQhFO1zppKvRIjQ';



function gtl(text, lng){

  console.log("tra_strt", text);
  let xhr = new XMLHttpRequest(); 
  // 翻訳
  const URL = "https://translation.googleapis.com/language/translate/v2?key="+api1+
      "&q="+encodeURI(text)+"&source=ja&target="+lng+"";
  console.log(URL);
  xhr.open("POST", URL, true);
  // xhr.responseType = 'json';
  xhr.onload = (e) => {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              const res = JSON.parse(xhr.responseText); 
              console.log(res["data"]["translations"][0]["translatedText"]);
              scr = res["data"]["translations"][0]["translatedText"];
              reValue(scr);
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

/*

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