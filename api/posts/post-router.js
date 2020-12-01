const express = require("express")
const Util = require("../../data/db")

const router = express.Router()

router.get('/', async (req,res) => {
    const { query } = req
    try {
        const posts = await Util.find(query)
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    Util.findById(id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        }).catch (error => {
            console.log(error)
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

module.exports = router