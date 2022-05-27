const Sequelize = require('sequelize');
const sequelize = new Sequelize('db_sistemaDeVotacao', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Conectado com Sucesso')
}).catch((err) => {
    console.log('Erro ao se conectar: '+err)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}