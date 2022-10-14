const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if( pokemon === null ){
          const message = `le pokemon demandé n'existe pas. Veuillez réessayez avec un autre identifiant`
          return res.status(404).json({message, data: error})
      }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = `La liste des pokemons n'a pas pu etre trouvé. Réessayer dans quelques instants`
        res.status(500).json({message, data: error})
      })
  })
}