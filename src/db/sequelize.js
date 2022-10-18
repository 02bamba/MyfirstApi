const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/User')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')  //encryptage de données(mdp invisible)

const sequelize = new Sequelize('pokedex', 'root', 'passer', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Etc/GMT',
  },
  logging: false
})
  
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes) // Istancier le model au pres de sequlize
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types.join()
      }).then(pokemon => console.log(pokemon.tojson()))
    })

    bcrypt.hash('pikatchu', 10)
    .then(hash => {
      User.create({
        username: 'pikatchu',
        password: hash
      })
    })
    .then(user => console.log(user.tojson()))

    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Pokemon, User //on expose nos models pour pouvoir l'utiliser ailler dans l'API
}