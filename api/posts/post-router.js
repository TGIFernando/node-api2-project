const express = require("express")
const Util = require("../../data/db")

const router = express.Router()

router.get('/', async (req,res) => {
    const { query } = req
    try {
        const posts = await Util.find(query)
        res.json(posts)
    } catch (error) {
        res.json(error.message)
    }
})

module.exports = router