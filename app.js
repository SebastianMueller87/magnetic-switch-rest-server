const express = require('express')
const app = express()
const path = require("path")
const dotenv = require('dotenv').config({ path: './.env' }).parsed
const dns = require('dns')
const Gpio = require('onoff').Gpio
const magnetPin = 4
const ledPin = 16


/**
 * ################################
 * Server
 */
app.use(express.static('public'))

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
 * ################################
 *  GPIO watchter
 */

initWatcher()

function initWatcher() {
  var magnetSensorPin = new Gpio(magnetPin, 'in', 'both')
  var ledPin = new Gpio(ledPin, 'out')

  magnetSensorPin.watch(function(err, value) {
    console.log('new Value: ', value)
    ledPin.writeSync(value)
  })
}
