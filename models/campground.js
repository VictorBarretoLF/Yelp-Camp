const mongoose = require('mongoose')

const CampgroundSchema = mongoose.Schema({
    title: String,
    price: Number,
    description : String,
    location : String,
    image : String,
})

const Campground = mongoose.model('Campground', CampgroundSchema)

module.exports = {
    Campground,
}