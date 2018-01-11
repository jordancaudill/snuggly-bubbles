const express = require('express');
const app = express();
const port = 80;

app.get('/', express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.listen(port);