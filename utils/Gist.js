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
        path: splitParams[2]
      };
      this.getContentsAndPostGist(parsedParams).then((url) => {
        resolve(url);
      });
    });
    return promise;
  }
  getContentsAndPostGist(params) {
    let promise = new Promise((resolve, reject) => {
      this.github.repos.getContent({
        headers: {
          Accept: 'application/vnd.github.v3.raw+json'
        },
        user: params.user,
        repo: params.repo,
        path: params.path
      }, (err, res) => {
        if(err) return reject(err);

        let file = {};
        file[params.path] = {
          content: res
        };

        this.github.gists.create({
          public: true,
          files: file
        }, (err, res) => {
          if(err) return reject(err);
          resolve(res.html_url);
        });
      });
    });
    return promise;
  }
}

module.exports = Gist;
