const getEnquetes = require('../models/Create');
const { Opcoes } = require('../models/Create');

module.exports = {
    getEdit: async (req, res) => {
        const enquete = await getEnquetes.Enquete.findByPk(req.params.id, {include: Opcoes});
        res.render('update', {enquetes: enquete});
    },

    edit: async (req, res) => {
        const enquete = await getEnquetes.Enquete.findByPk(req.params.id);
        const options = await getEnquetes.Opcoes.findAll({
            attributes: ['id', 'textoOpcao'],
            where: {
                idEnquete: req.params.id
            }
        })
        const optionOne = await getEnquetes.Opcoes.findByPk(options[0].dataValues.id);
        const optionTwo = await getEnquetes.Opcoes.findByPk(options[1].dataValues.id);
        const optionThree = await getEnquetes.Opcoes.findByPk(options[2].dataValues.id);
        

        enquete.set({
            titulo: req.body.title,
            dataAbertura: req.body.openDate,
            dataEncerramento: req.body.closeDate
        })

        optionOne.textoOpcao = req.body.option1
        optionTwo.textoOpcao = req.body.option2
        optionThree.textoOpcao = req.body.option3

        await enquete.save()
        await optionOne.save()
        await optionTwo.save()
        await optionThree.save()
        

        res.redirect('/app/getEdit/' + req.params.id);

    },

    delete: async (req, res) => {
        const enquete = await getEnquetes.Enquete.findByPk(req.params.id);
        const options = await getEnquetes.Opcoes.findAll({
            attributes: ['id', 'textoOpcao'],
            where: {
                idEnquete: req.params.id
            }
        })
        const optionOne = await getEnquetes.Opcoes.findByPk(options[0].dataValues.id);
        const optionTwo = await getEnquetes.Opcoes.findByPk(options[1].dataValues.id);
        const optionThree = await getEnquetes.Opcoes.findByPk(options[2].dataValues.id);

        await enquete.destroy();
        await optionOne.destroy()
        await optionTwo.destroy()
        await optionThree.destroy()

        res.redirect('/app/');
    }
}