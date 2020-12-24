const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geoCode')


const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirPath));


app.get('',(req,res)=>{
    //res.send('hello express...')
    res.render('index',{
        'title':'Weather App',
        'name':'Gaurav Sengar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'gaurav'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help text..',
        name:'gaurav..'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'address key not found'
        })
    }
    
    geoCode(req.query.address,(error, {latitute, longitude, location}={})=>{
        if(error){
            return req.send({error})
        }
         
        forecast(latitute, longitude, (error, forecastData)=>{
            if(error){
                return req.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        } )
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 error',
        name:'gaurav sengar',
        errorMessage:'help router not found'
    })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
       return res.send('404',{
            errorMessage:'please provide search key'
        })
    }

    res.send('404',{
        
    })
    
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 error',
        name:'gaurav sengar',
        errorMessage:'404 page not found..'
    })
})

app.listen(port,()=>{
    console.log('server is up on server  '+port)
})