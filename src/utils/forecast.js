const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0b446c32f12ea3b1f3917a4f3d3c2d07&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to check services', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined,'It is currently ' + body.current.temperature + '° out there. ' + body.current.precip + '% chance of rain.')
        }
    })
}


module.exports = forecast