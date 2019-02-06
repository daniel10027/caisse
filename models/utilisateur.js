const  sequelize = require('../config/config')

var Utilisateurs = sequelize.define('utilisateur', {
    email: {
        type: sequelize.Sequelize.STRING
    },
    password: {
        type: sequelize.Sequelize.STRING
    },
    type_user_id: {
        type: sequelize.Sequelize.INTEGER
    }
});

Utilisateurs.sync()

module.exports = Utilisateurs;