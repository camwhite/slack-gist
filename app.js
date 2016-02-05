'use strict';

const express = require('express');
const config = require('./config');
const Gist = require('./utils/Gist');

let app = express();
let gist = new Gist(config);

app.get('/', (req, res) => {
  gist.init(req.query.text).then((url) => {
    let message = {
      response_type: 'in_channel',
      text: `<${url}>`,
      unfurl_media: true
    }
    res.json(message);
  })
  .catch((err) => {
    res.sendStatus(err.code);
  });
});

app.listen(1337);
