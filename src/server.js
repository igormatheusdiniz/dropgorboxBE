const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })

});

app.use((req,res,next) => {
    req.io = io;    
    return next();
});

//trata com requisicoes JSON
app.use(express.json());

mongoose.connect("mongodb+srv://default:default@cluster0.whqvo.mongodb.net/omnistack?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

//trata upload de arquivos
app.use(express.urlencoded({ extended: true }));

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

//importando o arquivo de rotas
app.use(require('./routes'));

//porta do aplicativo
server.listen(3333);