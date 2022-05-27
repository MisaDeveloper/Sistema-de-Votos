const CreateEnquete = require('../models/Create')

module.exports = {
    getCreate: (req, res) => {
        res.render('create')
    },
    create: async (req, res) => {
        
        const novaEnquete = await CreateEnquete.Enquete.create({
            titulo: req.body.title,
            dataAbertura: req.body.openDate,
            dataEncerramento: req.body.closeDate
        });

        var obj = req.body;
        var count = (Object.keys(obj).length) - 3;
        
        for(var i=1; i<=count; i++) {
            const novaOpcao = await CreateEnquete.Opcoes.create({
                textoOpcao: req.body['option'+i],
                idEnquete: novaEnquete.id
            });
        }

        res.redirect('/app/');
    }
}