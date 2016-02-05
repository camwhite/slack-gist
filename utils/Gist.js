'use strict';

const GitHub = require('github');

class Gist {
  constructor(opts) {
    this.opts = opts;

    this.github = new GitHub({
      version: '3.0.0',
    });
    this.github.authenticate({
      type: 'basic',
      username: this.opts.username,
      password: this.opts.password
    });
  }
  init(params) {
    let promise = new Promise((resolve, reject) => {
      let splitParams = params.split(' ');
      let parsedParams = {
        user: splitParams[0],
        repo: splitParams[1],
        path: splitParams[2],
        ref: splitParams[3]
      };
      this.getContentsAndPostGist(parsedParams).then((url) => {
        resolve(url);
      })
      .catch((err) => {
        reject(err);
      });
    });
    return promise;
  }
  getContentsAndPostGist(params) {
    let promise = new Promise((resolve, reject) => {
      this.github.repos.getContent({
        headers: {
          Accept: 'application/vnd.github.v3.full'
        },
        user: params.user,
        repo: params.repo,
        path: params.path,
        ref: params.ref ? params.ref : 'master'
      }, (err, res) => {
        if(err) return reject(err);

        let content = new Buffer(res.content, 'base64');

        let file = {};
        file[res.name] = {
          content: content.toString()
        };

        this.github.gists.create({
          public: true,
          files: file
        }, (err, res) => {
          if(err) return reject(err);
          let url = `https://gist.github.com/${res.owner.login}/${res.id}`
          resolve(url);
        });
      });
    });
    return promise;
  }
}

module.exports = Gist;
