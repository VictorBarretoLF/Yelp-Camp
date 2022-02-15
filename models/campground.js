const mongoose = require('mongoose')

const CampgroundSchema = mongoose.Schema({
    title: String,
    price: String,
    description : String,
    location : String,
})

const Campground = mongoose.model('Campground', CampgroundSchema)

module.exports = {
    Campground,
}