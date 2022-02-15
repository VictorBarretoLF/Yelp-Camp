const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const { Campground } = require('../models/campground')
const cities = require('./cities')
const { descriptors, places} = require('./seedHelpers')

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

const randomTitle = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++){
        let random1000 = Math.floor(Math.random() * 1000)

        const camp = Campground({
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${randomTitle(descriptors)} ${randomTitle(places)}`
        })
        await camp.save()
    }
}


seedDB()
.then( () => {
    mongoose.connection.close()
})