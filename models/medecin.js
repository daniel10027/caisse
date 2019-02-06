const  sequelize = require('../config/config')

var Medecins = sequelize.define('medecin', {
    nom: {
        type: sequelize.Sequelize.STRING
    },
    prenoms: {
        type: sequelize.Sequelize.STRING
    },
    cni: {
        type: sequelize.Sequelize.STRING
    },
    contact: {
        type: sequelize.Sequelize.STRING
    },
    poste: {
        type: sequelize.Sequelize.STRING
    },
    email: {
        type: sequelize.Sequelize.STRING
    },
    ville: {
        type: sequelize.Sequelize.STRING
    }
});

Medecins.sync()

module.exports = Medecins;