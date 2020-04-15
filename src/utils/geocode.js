const request = require('request')

const geocode = (address, callback) =>{
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoia29uc3RhbnRpbm9zOTciLCJhIjoiY2s4YnB5ODg1MDhkMTNmcDlrNTNmMDZkNCJ9.lks-A-M1SJNL-hZao7tzQw'

  request({url:url, json:true},(error, response)=>{
    if(error){
      callback("Unable to connect to location services.", undefined)
    }
    else if(response.body.features ===0){
      callback(undefined,"Unable to find the location you've entered")
    }
    else{
      callback(undefined,{
        latitude : response.body.features[0].center[1],
        longitude :response.body.features[0].center[0],
        location : response.body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
