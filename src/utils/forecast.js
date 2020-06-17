const request= require('request')

const forecast = (longitude,latitude,callback) =>{
    const url ='http://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=522cd7b4331ed2125da7b724c044622b'
    //console.log(url)
    //http://api.openweathermap.org/data/2.5/onecall?lat=30.489772&lon=-99.771335&units=metric&appid=522cd7b4331ed2125da7b724c044622b

    //summary:response.body.hourly[0].weather.description
   // +' ! It is currently ' + response.body.current.temp +' degree out. There is a ' 
   //+ response.body.minutely[0].precipitation +'% chance of rain')
    request({url, json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to weather service ! ',undefined)
        }
        else if( body.error)
        {
            callback('Unable to find location',undefined)
        }
        else{
            
            summary = body.current.weather[0].description,
            temp = body.current.temp ,
            clouds = body.current.clouds,
            humidity = body.current.humidity,
            minTemp=body.daily[0].temp.min,
            maxTemp=body.daily[0].temp.max,
            str = 'Current  Temperature :  '+temp+'   Minimum Temperature of the day : '+minTemp+ ' Maximum Temperature of the day : '+maxTemp+ ' Humidity : '+ humidity +'% Cloudiness : '+clouds+ '% Summary : '+summary
            
            callback(undefined,str)
        }
    })
}

module.exports=forecast