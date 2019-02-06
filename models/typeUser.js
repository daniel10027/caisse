const  sequelize = require('../config/config')

var typeUsers = sequelize.define('type_user', {
    nom: {
        type: sequelize.Sequelize.STRING
    }
});

typeUsers.sync()

module.exports = typeUsers;