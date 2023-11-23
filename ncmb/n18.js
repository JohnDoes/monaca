const request = require('superagent');
var title = /<p class="novel_subtitle">.*<\/p>/;
var honbun = /<p id="L[0-9]+">.*<\/p>/g;


var textList = [];
module.exports = async (req, res) => {
  console.log(req.query.url);
  const response = await request
    .get(req.query.url)
    .set({"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0", 'Cookie':'over18=yes'})
    .send();

    var txt = String(response.text);
    var titleList = txt.match(title);
    var textList1 = txt.match(honbun);
    for(let i = 0; i < textList1.length; i++) {
      textList1[i] = textList1[i].replace(/(<([^>]+)>)/gi, '');
      var textList2 = textList1[i].split(/(?<=[。、？！?!]+)(?![。、？！?!])/);
      for(let j = 0; j < textList2.length; j++) {
        textList.push(textList2[j]);
      }
    }


  res.send({
    status: response.status,
    title: titleList,
    body: textList
  });
}

/*
{"url":"https://novel18.syosetu.com/n9112ef/1/"}
{"url":"https://ncode.syosetu.com/n2273dh/1/"}
 */