const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')


const app = express()
const port = process.env.PORT || 3000
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialPath)

//Setup handlers engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{  //First argument is the PATH and the second is the FUNCTIO, when the PATH IS VISITED.
    res.render('index',{
      title : 'Weather app',
      name: 'Konstantinos R'
    })
})

app.get('/about', (req, res) =>{
  if(!req.query.address){
    return res.send({
      error : 'You have to enter address'
    })
  }
  res.render('about', {
    title: 'About me',
    name: 'Konstantinos R'
  })
})

app.get('/help', (req, res) =>{
  res.render('help',{
    title: 'Help page',
    name: 'Konstatinos R'
  })
})

app.get('/help/*', (req, res) =>{
  res.render('404',{
    title : '404 page',
    message :'Help article not found',
    name : 'Konstantinos R'
  })
})

app.get('/products',(req, res) =>{
  console.log(req.query)
  res.send({
    products :[]
  })
})

app.get('/weather', (req, res) =>{
  if(!req.query.address){
    return res.send({
      error : 'You must enter an address.'
    })
  }else{
    geocode(req.query.address, (error, {longitude, latitude, location}) => {
      if(error){
        return res.send({error})
      }

      forecast(longitude, latitude,(error, forecastData) =>{
        res.send({
          location : location,
          forecastData : forecastData,
          address : req.query.address
        })
      })
    })
  }

})

app.get('*', (req, res) =>{
  res.render('404',{
    title : '404 page',
    message :'Page not found',
    name :'Konstantinos R'
  })
})



app.listen(port, () =>{
  console.log('Your server is now up, on port' +port)
})
