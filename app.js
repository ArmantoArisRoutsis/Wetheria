const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs");
app.use(express.static("public"))

let searchedCity = 'Athens'


app.get("/", function(req,res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+searchedCity+"&appid=13681865bcbc80f73dcefc13ea69f96e&units=metric"
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherApi = JSON.parse(data)
            const temperature = weatherApi.main.temp
            const weatherDescription = weatherApi.weather[0].description
            const icon = weatherApi.weather[0].icon
            const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.render("main",{cityName:searchedCity ,temp: temperature, desc:weatherDescription, imgUrl: imgUrl}) 
        })
    })
})

app.post("/",function(req,res){
    searchedCity = req.body.cityName
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("Server is running on port 3000")
})