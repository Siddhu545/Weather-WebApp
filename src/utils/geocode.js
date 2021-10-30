const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWxleHJhamE1NDUiLCJhIjoiY2t1d3FpN3RhMmQ3ZzJuczdldnpqbDRsdCJ9.O6s3i6bN0AmW9ZkZcZklDA'

    request({url, json: true}, (error ,{ body }) => {
         if(error){
             callback('Unable to connect services!', undefined)
         }else if(body.features.length === 0){
             callback('Unable find location, Try other search!', undefined)
         }else{
             callback(undefined, {
                 longitude: body.features[0].center[1],
                 latitude:  body.features[0].center[0],
                 location: body.features[0].place_name
             }
                )
         }
    })
} 


module.exports = geocode