var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello Bebelush and poodle puppy!')
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
