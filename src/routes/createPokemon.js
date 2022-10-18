const { Pokemon } = require('../db/sequelize')
const {ValidationError, UniqueConstrainteError} = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.post('/api/pokemons',auth, (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({message: error.message, data: error})
        }
        if (error instanceof UniqueConstrainteError) {
          return res.status(400).json({message: error.message, data: error})
        }
        const message = `La liste des pokemons n'a pas pu etre trouvé. Réessayer dans quelques instants`
        res.status(500).json({message, data: error})
      })
  })
}