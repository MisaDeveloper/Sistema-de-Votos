const { Opcoes } = require('../models/Create');
const getEnquetes = require('../models/Create');

module.exports = {
    getIndView: async (req, res) => {
        const enquete = await getEnquetes.Enquete.findByPk(req.params.id, {include: Opcoes});
        res.render('indView', {enquetes: enquete})
    }
}