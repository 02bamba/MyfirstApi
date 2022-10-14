const { Pokemon } = require('../db/sequelize')
const {Op} = require('sequelize') //Operateur de sequelize qui permet de fairedes recherche plus complexe


module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if (req.query.name) {
      const name = req.query.name
      return pokemon.findAll({
        where : {
          name : { // 'name' est la propriété du model pokemons
            [Op.like]: `%${name}%` //name est la critère de recherche 
            //et on fait de sort que le resultat fournit aie une/plusieurs lettre du mot fournit lors de la recherche
          }
        }
      })
      .then (pokemon => {
        const message = `il y a ${pokemons.lenght} pokémons qui correspondent aux termes recherché: ${name}.`
        res.json({message, data: pokemons})
      })
    }
    else{
      Pokemon.findAll()
        .then(pokemons => {
          const message = 'La liste des pokémons a bien été récupérée.'
          res.json({ message, data: pokemons })
        })
        .catch(error => {
          const message = `La liste des pokemons n'a pas pu etre trouvé. Réessayer dans quelques instants`
          res.status(500).json({message, data: error})
        })
    }
  })
}