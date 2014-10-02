Hubot HTTP Code Script
=============================

Hubot script that displays information about http status codes. Helpful during API development and you don't remember a HTTP status code.

Usage
-----
```sh
npm install --save hubot-http-code
```

Open `external-scripts.json` and enable the module, by putting it's name into it:

```javascript
["your-other", "external-script", "hubot-http-code"]
```

Then you can use the `hubot http code <code>` command to ask for http code.
