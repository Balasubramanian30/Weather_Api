const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');
const app = express();
// For using css ...
app.use(express.static("public"));   
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});
app.post("/", function (req, res) {
    console.log("post recieved");
    const query = req.body.cityName;
    const apiKey = "fcd8df09f72ee264e03d79de77119f71";
    const unit = " metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = " http://openweathermap.org/img/wn/" + icon + "@2x.png "
            res.write("<h2> The weather is currently " + description + "</h2>");
            res.write(" <h1> The temperature in chennai is " + temp + " degree Celcius </h1>");
            res.write("<img src=" + iconUrl + ">");
            res.send();
        })
    });
});



app.listen(3000, function () {
    console.log("Your server is started");
});