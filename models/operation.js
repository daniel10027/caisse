const  sequelize = require('../config/config')

var Operations = sequelize.define('operation', {
    nom: {
        type: sequelize.Sequelize.STRING
    },
    montant_normal: {
        type: sequelize.Sequelize.INTEGER
    },
    montant_rabbais: {
        type: sequelize.Sequelize.INTEGER
    },
    quantity: {
        type: sequelize.Sequelize.INTEGER
    },
    montant_encaisse: {
        type: sequelize.Sequelize.INTEGER
    },
    groupe: {
        type: sequelize.Sequelize.INTEGER
    },
    montant_payer: {
        type: sequelize.Sequelize.INTEGER
    },
    rabbais: {
        type: sequelize.Sequelize.INTEGER
    }
});

Operations.sync()

module.exports = Operations;