//Imports for server
const express = require('express')
const cors = require('cors')
const server = express()

//imports for routes
const postsRouter = require('./posts/post-router')


//server configuration
server.use(cors())
server.use(express.json())
server.use('/api/posts', postsRouter)






//Catch all end point
server.get('/', (req,res) => {
    res.send(`
        <h2>Welcome to my api</h2>
    `)
})

module.exports = server