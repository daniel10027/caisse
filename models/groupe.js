const  sequelize = require('../config/config')

var Groupes = sequelize.define('groupe', {
    nom: {
        type: sequelize.Sequelize.STRING
    },
    ristourne: {
        type: sequelize.Sequelize.INTEGER
    }
});

Groupes.sync()

module.exports = Groupes;