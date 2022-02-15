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
    const camp = Campground({
        title : 'My Backyard',
        description : 'cheap camping',
    })
    await camp.save()
    response.send(camp)
})

app.listen(8000, () => {
    console.log('Listening on port 8000')
})