const express = require('express')
const joi = require("@hapi/joi")
const app = express()

const port = process.env.PORT || 3000
app.use(express.json())

//set the genres
const genres = [
    {genreId: 1, genre: "Horror"},
    {genreId: 2, genre: "Drama"},
    {genreId: 3, genre: "Musical"},
    {genreId: 4, genre: "Comedy"},
    {genreId: 5, genre: "Sci-fi"}
]

//get all the genres
app.get('/api/genres', (req, res) => {
    res.send(genres)
})

//get a single genre
app.get('/api/genres/:genreId', (req, res) => {
    const genre = genres.find(g => g.genreId === parseInt(req.params.genreId))
    if(!genre) {
        res.status(404).send('genre not found')
    }
        res.send(genre)
    
}) 

//add a genre
app.post('/api/genres', (req, res) => {
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

app.put('/api/genres/:genreId', (req, res) => {
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

app.delete('/api/genres/:genreId', (req, res) => {
    const genre = genres.find(g => g.genreId === parseInt(req.params.genreId))
    if(!genre) {
        return res.status(404).send('genre not there')
    }
    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    return res.send(`genre ${genre.genreName} deleted`)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

function validateGenre(genre) {
    const schema = joi.object().keys({
        genreId: joi.number().integer(),
        genreName: joi.string().required()
    })
    return schema.validate(genre)
}

