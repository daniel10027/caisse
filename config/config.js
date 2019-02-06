const Sequelize = require("sequelize");

var db_config = {
    host: 'localhost',
    user:  'root',
    password: '',
    port: 3306,
    database: 'electron'
}

var sequelize = new Sequelize('mysql://' + db_config.user + ':' + db_config.password + '@' + db_config.host+ ':' + db_config.port + '/' + db_config.database+ ''); 

sequelize.authenticate().then(() => {
    console.log('-----------------------------------------------------------------------------------------------------')
    console.log('database: '+ db_config.database + ' connected')
    console.log('-----------------------------------------------------------------------------------------------------')
}).catch((err) => {
    console.log('-----------------------------------------------------------------------------------------------------')
    console.log('error connecting '+ err)
    console.log('-----------------------------------------------------------------------------------------------------')
})

module.exports = sequelize;