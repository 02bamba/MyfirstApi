const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3948


app
.use(favicon(__dirname + '/favicon.ico'))
.use(morgan('dev'))
.use(bodyParser.json())

sequelize.initDb()

// ici nous placerons nos futurs points de terminaisons
require('./src/routes/findAllpokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

//On ajoute la gestio des erreurs 404
app.use(({res}) => {
    const message = `impossible de trouver la page demandée ! Veuillez revoir l'URL saisie`
    res.status(404).json({message})
})

// A suprimer car on en a plus besion

// app.get('/', (req,res) => res.send('Hello again, Express !'))

// const express = require('express')
// const {sequelize} = require('sequelize')
// const { success, getUniqueId } = require('./helper.js')
// let pokemons = require('./src/db/mock-pokemon')
 
// // On retourne la liste des pokémons au format JSON, avec un message :
// app.get('/api/pokemons', (req, res) => {
//   const message = 'La liste des pokémons a bien été récupérée.'
//   res.json(success(message, pokemons)) 
// })

// //rechercher un pokemon
// app.get('/api/pokemons/:id', (req, res) => {
//   const id = parseInt(req.params.id)
//   const pokemon = pokemons.find(pokemon => pokemons.id === id)
//   const message = 'Un pokémon a bien été trouvé.'
//   res.json(success(message, pokemon))
// })

// //ajout d'un nouveau pokemon
// app.post('/api/pokemons', (req, res) => {
//   const id = getUniqueId(pokemons)
//   const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
//   pokemons.push(pokemonCreated)
//   const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`
//   res.json(success(message, pokemonCreated))
// })

// //modification d'un pokemon
// app.put('/api/pokemons/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const pokemonUpdated = { ...req.body, id: id }
//   pokemons = pokemons.map(pokemon => {
//    return pokemon.id === id ? pokemonUpdated : pokemon
//   })
   
//   const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
//   res.json(success(message, pokemonUpdated))
// });

// // suppression d'un pokemon
// app.delete('/api/pokemons/:id', (req,res) =>{
//   const id = parseInt(req.params.id)
//   const pokemonDelete = pokemons.find(pokemon => pokemons.id === id)
//   pokemons.filter(pokemon => pokemon.id !== id)
//   constmessage = `Le pokemon ${pokemonDelete.name} a été bien supprimé`
//   res.json(success(message, pokemonDelete))
// })


app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))