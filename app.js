const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const { Campground } = require('./models/campground')

async function main(){
    try {
        await mongoose.connect('mongodb://localhost:27017/yelp-camp');
        console.log('Connected to the dabase')
    } catch (err) {
        console.log('Error connecting to the database')
        console.log(err)
    }
}
main()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/views'))

app.get('/', (request, response) => {
    response.render('home.ejs')
})

app.get('/make', async (request, response) => {
    response.render('home')
})

app.get('/campgrounds', async (request, response) => {
    const campgrounds = await Campground.find({})
    response.render('campgrounds/index', {campgrounds})
})

app.get('/campgrounds/:id', async (request, response) => {
    const campground = await Campground.findById(request.params.id)
    response.render('campgrounds/show', {campground})
})

app.listen(8000, () => {
    console.log('Listening on port 8000')
})