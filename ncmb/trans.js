const request = require('superagent');

module.exports = async (req, res) => {
  const response = await request
    .get(req.query.url)
    .send();
  var urlList = response.text.match(pattern);
  console.log(response.data);
  res.send({
    status: response.status,
    body: response
  });
}
