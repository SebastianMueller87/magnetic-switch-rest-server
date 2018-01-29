const express = require('express')
const app = express()
const path = require("path")
const dotenv = require('dotenv').config({ path: './.env' }).parsed
const dns = require('dns')
const Gpio = require('onoff').Gpio
const magnetPinNumber = 15
const ledPinNumber = 27
const jsonfile = require('jsonfile')
const jsonDataFile = './public/data.json'

/**
 * ################################
 * Server
 */
app.use(express.static('public'))

app.get('/', function (req, res) {
  console.log('index route')
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.get('/store', function (req, res) {
  console.log('store route')
  storeToJson(0)
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
  var magnetSensorPin = new Gpio(magnetPinNumber, 'in', 'both')
  var ledPin = new Gpio(ledPinNumber, 'out')

  magnetSensorPin.watch(function(err, value) {
    console.log('new Value: ', value)
    ledPin.writeSync(value)
    storeToJson(value)
  })
}

/**
 * ################################
 *  Store
 */
function storeToJson(status) {
  jsonfile.readFile(jsonDataFile, (err, obj) => {
    if (err) {
      console.log('Error while reading settings', err)
      return
    }

    obj[Date.now()] = status

    jsonfile.writeFile(jsonDataFile, obj, {spaces: 2}, (err) => {
      if (err) {
        console.log('Error while writing settings', err)
        return
      }

      console.log('Data stored');
    })
  })
}
