const request = require('request');


const foreCast = (lat, lon, callback) => {
    const url = 'https://api.weatherbit.io/v2.0/current?&key=48c59ecc99774438bca4b7cc3bb190c0&lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(lon)

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('No Network Connectivity', undefined)
        } else if (body.error) {
            callback('Unknown Location.Please Input a valid Location', undefined)
        } else {
            callback(undefined, 'Temperature = ' + body.data[0].temp + ' Description -- ' + body.data[0].weather.description)
        }
    })







}

module.exports = foreCast