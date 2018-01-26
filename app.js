var express = require('express')
var app = express()
var path = require("path")
var dotenv = require('dotenv').config({ path: './.env' }).parsed
var dns = require('dns')

app.use(express.static('public'))

app.get('/', function (req, res) {
  console.log('index route')
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.get('/blink', function (req, res) {
  console.log('blink route')
  watchButton()
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.listen(dotenv.PORT, function () {
  console.log('Server started')
  dns.lookup(require('os').hostname(), function (err, add, fam) {
    console.log(`Listening on ${add}:${dotenv.PORT}`)
  })
})

function watchButton() {
  var Gpio = require('onoff').Gpio
  var led = new Gpio(16, 'out')
  var button = new Gpio(4, 'in', 'both')

  button.watch(function(err, value) {
    led.writeSync(value)
  })
}
