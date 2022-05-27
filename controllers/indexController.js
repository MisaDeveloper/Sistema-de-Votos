const getEnquetes = require('../models/Create');

module.exports = {
    getIndex : async (req, res) => {
        const allEnquetes = await getEnquetes.Enquete.findAll();
        res.render('index', {enquetes: allEnquetes})
    }
}