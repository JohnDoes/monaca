const request = require('superagent');
var pattern = /\/works\/[0-9]+\/episodes\/[0-9]+/g;

module.exports = async (req, res) => {
  const response = await request
    .get(req.query.url)
    .send();
    var num = parseInt(req.query.num);
  var urlList = response.text.match(pattern);
  console.log(urlList);
  res.send({
    status: response.status,
    body: urlList[num]
  });
}
