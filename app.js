const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
// HTTPS module is native module hence doesnt need installation

const app=express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
    const query = req.body.cityName;
    const key = "e4ca4f643dc0272edbd0a8ce722eeabf"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+key+"&units=metric";
    https.get(url, function(response){
        // console.log(response.statusCode);
        response.on("data",function(data){
                const weatherData= JSON.parse(data);
                const temp = weatherData.main.temp;
                const placename = weatherData.name;
                const description = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                res.write('<head><meta charset="utf-8"></head>');
                // IMG TAG WONT WORK WITHOUT HTML BOILER PLATE ABOVE
                const imgUrl = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";
                res.write("<img src = "+imgUrl+">");
                res.write("temerature of "+placename+" is: "+temp);
                res.write(" and the weather is "+description)
            
                res.send();
                    
            })
    })
})

// const query ="London";
    
   
//         

    // res.send("server is running...");
    // we cannot have more than 1 res.send

app.listen(3000, function(){
    console.log("Server on port 3000");
})