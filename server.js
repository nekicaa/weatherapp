const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = 'dbb281de6497fc87a869a028b4aa038c';
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {

let city = req.body.city;
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    res.render('index', {weather: null, error: 'Greška, molimo Vas pokušajte ponovo'});
  } else {
    let weather = JSON.parse(body)
    if(weather.main == undefined){
      res.render('index', {weather: null, error: 'Greška, molimo Vas pokušajte ponovo'});
    }else{
      let weatherText = `Sada je ${weather.main.temp} stepeni u ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
    }
  }
});
})

app.listen(3000, function () {
  console.log('Weather app listening on port 3000!')
})