var express = require('express')
var app = express()
var path = require("path")
var dotenv = require('dotenv').config({ path: './.env' }).parsed
var dns = require('dns')
var magnetPin = 4
var ledPin = 16

app.use(express.static('public'))

/**
 * Server
 */
app.get('/', function (req, res) {
  console.log('index route')
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.listen(dotenv.PORT, function () {
  console.log('Server started')
  dns.lookup(require('os').hostname(), function (err, add, fam) {
    console.log(`Listening on ${add}:${dotenv.PORT}`)
  })
})


/**
 *  Init watchter
 */

initWatcher()

function initWatcher() {
  var Gpio = require('onoff').Gpio
  var magnetSensorPin = new Gpio(magnetPin, 'in', 'both')
  var ledPin = new Gpio(ledPin, 'out')

  magnetSensorPin.watch(function(err, value) {
    console.log('new Value: ', value)
    ledPin.writeSync(value)
  })
}
