const request = require('request')

const forecast = (longitude, latitude, callback) =>{
  const url = 'https://api.darksky.net/forecast/04fd5363ce932e25f11018ea7442fb4c/'+longitude+','+latitude

  request({ url, json:true}, (error, {body})=>{
    if(error){
      callback("Unable to connect to location services.", undefined)
    }
    else if(body.error){
      callback("Unable to find the location.", undefined)
    }
    else{
      callback(undefined,body.daily.data[0].summary + "It is currently "+ body.currently.temperature+" degrees out. There is a "+body.currently.precipProbability+" chance of rain.")
    }
  })
}

module.exports = forecast
