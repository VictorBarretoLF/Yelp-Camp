const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/views'))

app.get('/', (request, response) => {
    response.render('home.ejs')
})

app.listen(8000, () => {
    console.log('Listening on port 8000')
})