
const path = require('path')
const express = require('express')
var hbs = require('hbs');
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')

const app = express()



//define paths for express config

const public_Dir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//setub nandlebars engine and views location

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static dir
app.use(express.static(public_Dir))





app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Simeon'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Simeon'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Simeon'
    })
})


app.get('/weather', (req, res) => {
    const addressSearch = req.query.address
    // addressSearch.capitalize()/
    if (!addressSearch) {
        return res.send({
            error: 'Provide a Valid address'
        })
    } else {
        geoCode(addressSearch, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            // console.log('Error', error)
            // console.log('Data', data)


            foreCast(latitude, longitude, (error, forecastdata) => {
                if (error) {
                    return res.send({ error })
                }
                // console.log(location)
                // res.send(forecastdata)
                // console.log('Error', error)
                // console.log('Data', data)

                console.log(req.query.address)
                res.send({
                    location: 'You Searched for ' + location,
                    forecast: forecastdata,
                    // location: 'Kenya',
                    // address: addressSearch

                })
            })
        })
    }

})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Provide a Search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })



})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: '404 eroor..Help Article not found',
        name: 'Simeon',
        title: 'Error Page'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: '404 eroor...Page Not Found',
        name: 'Simeon',
        title: 'Error Page'
    })
})

app.listen(3000, (error) => {
    if (!error) {
        console.log('Server is Up at port 3000')
    } else {
        console.log('Error')
    }
})