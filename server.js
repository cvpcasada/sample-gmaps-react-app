const path = require('path');
const express = require('express');

module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, 'index.html');
    const publicPath = express.static(path.join(__dirname, 'public'));

    app.get('/', function (_, res) { res.sendFile(indexPath) });

    process.env.PWD = process.cwd();
    app.use(express.static(path.join(process.env.PWD, 'public')));


    return app;
  }
};
