const express = require('express')
const path = require('path')
const  hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app  = express()

app.use('/js', express.static(__dirname + './../public/js'))
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Siddharth'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Do u have any quires',
        title: 'Weather App',
        name: 'Siddharth'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Weather App',
        name: 'Siddharth'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You have not provided address'
        })
    }
        geocode(req.query.address, (error, { longitude, latitude, location} = { }) => {
            if(error){
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, foreCastData)=>{
                if(error){
                    return res.send({ error })
                }
                res.send({
                    forecast: foreCastData,
                    location,
                    address: req.query.address 
                })
            })
        })
    })

app.get('/*', (req, res) => {
    res.send('Looks like your lost!!')
})
app.listen(3000, () => {
    console.log('server is up!! port 3000')
})