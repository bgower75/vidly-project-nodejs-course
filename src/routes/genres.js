const express = require('express')
const router = express.Router()

//set the genres
const genres = [
    {genreId: 1, genre: "Horror"},
    {genreId: 2, genre: "Drama"},
    {genreId: 3, genre: "Musical"},
    {genreId: 4, genre: "Comedy"},
    {genreId: 5, genre: "Sci-fi"}
]

//get all the genres
router.get('/', (req, res) => {
    res.send(genres)
})

//get a single genre
router.get('/:genreId', (req, res) => {
    const genre = genres.find(g => g.genreId === parseInt(req.params.genreId))
    if(!genre) {
        res.status(404).send('genre not found')
    }
        res.send(genre)
}) 

//add a genre
router.post('/', (req, res) => {
    const {error} = validateGenre(req.body)
    if(error) {
        return res.status(400).send('genre is required')
    }

    const genre = {
        genreId: genres.length + 1,
        genreName: req.body.genreName
    }
    genres.push(genre)
    res.send(genre)
})

router.put('/:genreId', (req, res) => {
    const genre = genres.find(g => g.genreId === parseInt(req.params.genreId))
    if(!genre) {
        return res.status(404).send('genre doesn\'t exist')
    }
    const {error} = validateGenre(req.body)
    if(error) {
        return res.status(400).send(error)
    }
    genre.genreName = req.body.genreName
    return res.send(genre)
})

router.delete('/:genreId', (req, res) => {
    const genre = genres.find(g => g.genreId === parseInt(req.params.genreId))
    if(!genre) {
        return res.status(404).send('genre not there')
    }
    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    return res.send(`genre ${genre.genreName} deleted`)
})

function validateGenre(genre) {
    const schema = joi.object().keys({
        genreId: joi.number().integer(),
        genreName: joi.string().required()
    })
    return schema.validate(genre)
}

module.exports = router
