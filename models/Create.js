const { sequelize } = require('./db');
const db = require('./db');

const Enquete = db.sequelize.define('tb_enquetes', {
    titulo: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    dataAbertura: {
        type: db.Sequelize.DATEONLY,
        allowNull: false
    },
    dataEncerramento: {
        type: db.Sequelize.DATEONLY,
        allowNull: false
    }
});

const Opcoes = db.sequelize.define('tb_opcoes', {
    textoOpcao: {
        type: db.Sequelize.STRING,
        allowNull: false
    },

    votos: {
        type: db.Sequelize.INTEGER,
        defaultValue: 0
    }
});

Opcoes.belongsTo(Enquete, {
    constraint: true,
    foreignKey: 'idEnquete'
})

Enquete.hasMany(Opcoes, {
    foreignKey: 'idEnquete'
})

module.exports = {
    Enquete: Enquete,
    Opcoes: Opcoes
}