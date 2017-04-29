# Usage
`/gist [user] [path] [repo]`

### Installation & Setup


Add a `config.json` file containing your unique token provided by Slack

```json
{
  "username": "<your-github-username>",
  "password": "<your-github-password>"
}
```

Run the following

`npm i`

`node app`

You can install [ngrok](http://ngrok.io), or via `npm i -g ngrok`, to forward the server on your local machine to the web. 

`ngrok http 1337` once installed should do it

Create and configure a [slash command](https://api.slack.com/slash-commands)

The outputted `https` url is what you want to point your slash command towards. . 
