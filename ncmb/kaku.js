const request = require('superagent');
var title = /<p class="widget-episodeTitle js-vertical-composition-item">.*<\/p>/;
var honbun = /<p id="p[0-9]+">.*<\/p>/g;
var pattern = /[0-9a-zA-Zぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠_]/
var textList = [];
module.exports = async (req, res) => {
  const response = await request
    .get(req.query.url)
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
