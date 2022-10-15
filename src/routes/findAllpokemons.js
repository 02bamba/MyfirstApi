const { Pokemon } = require('../db/sequelize')
const {Op} = require('sequelize') //Operateur de sequelize qui permet de fairedes recherche plus complexe


module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if (req.query.name) {
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5

      if (name.lenght <2) {
        const message = 'le terme recherché doit contenir au moins 2 caractères.'
        return res.status(400).json({message})
      }

      return Pokemon.findAndCountAll({ //findAndCountAll recherche le nbrs total de resultats et les results dmdé
        where : {
          name : { // 'name' est la propriété du model pokemons
            [Op.like]: `%${name}%` //name est la critère de recherche 
            //et on fait de sort que le resultat fournit aie une/plusieurs lettre du mot fournit lors de la recherche
          }
        },
        order: ['name'],
        limit: limit //La limite du nbrs de results dynamique 
      })
      .then (({count, rows}) => {
        const message = `il y a ${count} pokémons qui correspondent aux termes recherché: ${name}.`
        res.json({message, data: rows})
      })
    }
    else{
      Pokemon.findAll({ order: ['name'] })
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