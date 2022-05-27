//Carregando modulos
    const express = require('express');
    const ejs = require('ejs');
    const expressLayouts = require('express-ejs-layouts');
    const bodyParser = require('body-parser');
    const routes = require('./routes/routes');
    const path = require('path');
    const opcao = require('./models/Create');

    const app = express();
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);

//Configurações
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

    //Ejs
        app.use(expressLayouts);
        app.set('layout', './layouts/main');
        app.set('view engine', 'ejs')

    //Public
        app.use(express.static(path.join(__dirname, "public")))

//Rotas
    app.use('/app', routes)

//Outros

    //Voto Real Time

        io.on('connection', (socket) => {
            console.log('Socket conectado: '+socket.id);

            socket.on('sendId', async (id) => {
                
                const option = await opcao.Opcoes.findByPk(id);
                const incrementOption = await option.increment('votos');
                await option.reload();

                socket.broadcast.emit('receivedVoto', {
                    id: id,
                    votos: option.votos
                })

            })

        });

const PORT = 8081;
server.listen(PORT, () => {
    console.log('Servidor rodando na porta 8081!');
});
