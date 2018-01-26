var express = require('express')
var app = express()
var path = require("path")
var dotenv = require('dotenv').config({ path: './.env' }).parsed
var dns = require('dns')
var gpio = require("pi-gpio")

app.use(express.static('public'));

app.get('/', function (req, res) {
  console.log('index route')
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/blink', function (req, res) {
  console.log('blink route')
  toggle(16)
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(dotenv.PORT, function () {
  console.log('Server started')
  dns.lookup(require('os').hostname(), function (err, add, fam) {
    console.log(`Listening on ${add}:${dotenv.PORT}`)
  })
});

function toggle(pin) {
  if (!opened) {
    gpio.open(pin, "input", function (err) {
    console.log('GPIO: ' + pin + ' opened')
    opened = true
    togglePin(pin)
    })
  } else {
    togglePin(pin)
  }

  res.send('Pin ' + pin + ' should be toggled')
}

function togglePin(pin) {
  gpio.read(pin, function(err, value) {
    console.log('GPIO: ' + pin + ' is currently ' + value)
    gpio.setDirection(pin, 'output', function(err) {
      console.log('GPIO: ' + pin + ' changed to output')
      const newValue = value === 0 ? 1 : 0
      gpio.write(pin, newValue, function() {
          console.log('GPIO: ' + pin + ' wrote ' + newValue)
          // gpio.close(pin)
      })
    })
  })
}
