const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const { Campground } = require('./models/campground')
const methodOverride = require('method-override')

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

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/views'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get('/', (request, response) => {
    response.render('home.ejs')
})

// SEE THE LIST OF CAMPGROUNDS
app.get('/campgrounds', async (request, response) => {
    const campgrounds = await Campground.find({})
    response.render('campgrounds/index', {campgrounds})
})

// CREATE NEW CAMPGROUNDS
app.get('/campgrounds/new', async (request, response) => {
    response.render('campgrounds/new')
})

app.post('/campgrounds', async (request, response) => {
    const {title, location, image, price, description} = request.body.campground

    if (title && location && image && price && description){
        const campground = await Campground(request.body.campground)
        await campground.save()
        response.redirect(`/campgrounds/${campground._id}`)
    } else {
        console.log('Missing Data')
        response.redirect(`/campgrounds`)
    }
})

// SEE JUST ONE CAMPGROUND INFORMATIONS
app.get('/campgrounds/:id', async (request, response) => {
    const campground = await Campground.findById(request.params.id)
    response.render('campgrounds/show', {campground})
})

// EDIT
app.get('/campgrounds/:id/edit', async (request, response) => {
    const campground = await Campground.findById(request.params.id)
    response.render('campgrounds/edit', {campground})
})

app.patch('/campgrounds/:id', async (request, response) => {
    const {title, location, image, price, description} = request.body.campground

    if (title && location && image && price && description){
        console.log(request.body.campground)
        await Campground.updateOne({_id : request.params.id}, {$set : request.body.campground})
        response.redirect(`/campgrounds/${request.params.id}`)
    } else {
        console.log('An error ocurred')
        response.redirect(`/campgrounds`)
    }   
})

// DELETE ROUTE
app.delete('/campgrounds/:id', async (request, response) => {
    await Campground.findByIdAndDelete(request.params.id)
    response.redirect('/campgrounds')
})



app.listen(8000, () => {
    console.log('Listening on port 8000')
})