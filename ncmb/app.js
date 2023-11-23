const request = require('superagent');

module.exports = async (req, res) => {
  const response = await request
    .get(req.query.url)
    .send();
  res.send({
    status: response.status,
    body: response.text
  });
}