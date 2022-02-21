// const { default: axios } = require('axios')
const axios = require('axios')
// const res = require('express/lib/response')
// const fetch = require('node-fetch')
const url = 'https://picsum.photos/v2/list?page=2&limit=50'

async function getData(){
    try {
        const res = await axios({
            url : url,
            // method : 'get',
            // responseType : 'json'
        })
        // const data = await res.json()

        return await res.data
    } catch (err){
        console.log('not ok')
    }
    
}

async function picturesLinks(){
    const data = await getData()
    
    let arrLink = []
    for (let img of data){
        arrLink.push(img.download_url)
    }
    
    return arrLink
}

module.exports = {
    picturesLinks,
}

// fetchData()