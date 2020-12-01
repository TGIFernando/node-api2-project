const express = require("express")
const Util = require("../../data/db")

const router = express.Router()

//post endpoints

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

router.post('/', async (req, res) => {
    const post = req.body
    if (!post.title || !post.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Util.insert(post)
         .then(id => {
             res.status(201).json(id)
         }) .catch (error => {
             console.log(error.message)
             res.status(500).json({ error: "There was an error while saving the post to the database" })
         })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Util.remove(id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({message: `Post has been nuked`})
            } else {
                res.status(404).json({message: `user not found`})
            }
        }).catch(error => {
            console.log(error.message)
            res.status(500).json({ error: "The post could not be removed" })
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    if (!changes.title || !changes.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Util.update(id, changes)
            .then(posts => {
                if (posts) {
                    res.status(200).json(posts)
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
            }) .catch (error => {
                console.log(error.message)
                res.status(500).json({ error: "The post information could not be modified." })
            })
    }

})

//post/comment endpoints
router.get('/:id/comments', (req, res) => {
    const id = req.params.id
    Util.findPostComments(id)
        .then(comments => {
            if(!comments){
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(comments)
            }
        }) .catch (error => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})


//export
module.exports = router