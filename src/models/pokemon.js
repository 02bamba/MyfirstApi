const validTypes = ['Plantes', 'Poisson', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrix', 'Fee']

module.exports = (sequelize, DataTypes) => { //le parametre sequelize represente la connexion a la base de donnée
    return sequelize.define('Pokemon', { //nom du models(table) avec la proprièté define
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {  //permet d'eviter les contraintes  d'unicité dans la BD
          msg: 'Ce nom existe dans la base de donnée'
        },
        validate: {
          isEmpty: {msg: 'Merci de ne pas laissez de champsvide pour le nom'},
          notNull: {msg: `Le nom est une propriété requises.`}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg: 'Utilisez uniquement des nombres entiers pour les points de vie'},
          notNull: {msg: 'Les points de vie sont une propriétés requises'},
          max: {
            args : [100],
            msg: 'les points de vie sont limités à 100'
          },
          min: {
            args : [0],
            msg: 'aucune valeurs négative n\'est requise'
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg: 'Utilisez uniquement des nombres entiers svp.'},
          notNull: {msg: 'Les points de dégats sont une propriété requises'},
          max: {
            args : [200],
            msg: 'les points de dégats sont limités à 200'
          },
          min: {
            args : [0],
            msg: 'aucune valeurs négative n\'est requise'
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {msg: `l'Url saisie est invalide`},
          notNull: {msg: 'Une valeurs est requises'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')
        },
        set(types){
          this.setDataValue('types', types.join())
        },
        validate:{
          isTypesvalid(value){ //Ce sont des validateurs implémenté par nous meme (L68-L80)
            if (!value) {
              throw new Error('Un pokémon doit au moins avoir un type.')
            }
            if (value.split(',').lenght > 3) {
              throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
            }
            value.split(',').forEach(type => {
              if (!validTypes.includes(type)) {
                throw new Error(`le type d'un pokémon doit appartenir à la liste suivante: ${validTypes}`)
              }
            });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }