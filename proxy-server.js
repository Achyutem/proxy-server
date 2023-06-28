const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/', (req, res) => {
  let targetUrl = req.body.url;

  // Check if the URL starts with 'http://' or 'https://'
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = 'https://' + targetUrl; // Prepend 'https://'
  }

  const proxyUrl = `http://localhost:${port}/proxy?url=${encodeURIComponent(targetUrl)}`;
  res.redirect(proxyUrl);
});

app.get('/proxy', (req, res) => {
  const targetUrl = decodeURIComponent(req.query.url);
  req.pipe(request(targetUrl)).pipe(res);
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});


