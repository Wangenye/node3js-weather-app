const request = require('request');


const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmV0c2hhZG93IiwiYSI6ImNrZDYwczZzdDBtY2UycW56dmRjZmJlMnIifQ.tqaHc5NBjqKcjDbajI5wdA'


    request({ url, json: true }, (error, { body } = {}) => {

        if (error) {
            callback('Please Network connectivity is neededed', undefined)
        } else if (body.features.length === 0) {
            callback('Unknown Location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
                //         console.log(latitude, longitude)
            })
        }

    })

}

module.exports = geoCode