const mongoose = require('mongoose')
const { Campground } = require('../models/campground')
const cities = require('./cities')
const { descriptors, places} = require('./seedHelpers')
const { picturesLinks } = require('./getImage')

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
    const picLinks = await picturesLinks()
    
    for (let i = 0; i < 50; i++){
        let random1000 = Math.floor(Math.random() * 1000)
        let randomPrice = Math.floor(Math.random() * 50) + 10
        
        const camp = Campground({
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${randomTitle(descriptors)} ${randomTitle(places)}`,
            image : picLinks[i],
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas molestias, impedit omnis expedita totam hic dolorum sit.',
            price : randomPrice,
        })
        await camp.save()
    }
}

seedDB()
.then( () => {
    mongoose.connection.close()
})