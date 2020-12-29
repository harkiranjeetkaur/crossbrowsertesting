const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/'));

// Serve only the static files form the dist directory
app.use(express.static('./dist/crossbrowsertesting'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/crossbrowsertesting/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
