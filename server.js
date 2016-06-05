const path = require('path');
const express = require('express');

module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, 'index.html');
    const publicPath = express.static(path.join(__dirname, 'public'));

    console.log(__dirname);
    app.use('/public', publicPath);
    app.get('/', function (_, res) { res.sendFile(indexPath) });

    return app;
  }
};
