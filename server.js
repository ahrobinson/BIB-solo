var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'main')));
app.listen(process.env.PORT || 3000);