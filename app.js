'use strict';

const express = require('express');
const config = require('./config');
const Gist = require('./utils/Gist');

const app = express();

const { token, username, password } = config
const gist = new Gist(username, password);

app.get('/', (req, res) => {
  console.log(req.query)

  if (req.query.token !== token) {
    return sendStatus(401)
  }

  gist.init(req.query.text)
    .then(url => {
      const message = {
        response_type: 'in_channel',
        text: `<${url}>`
      };
      res.json(message);
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(err.code);
    });
});

app.listen(1337, ()=> console.log(`Express server listening 1337`));
