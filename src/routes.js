const express = require('express');
const routes = express.Router();
const multer = require('multer');
const multerConfig = require('./config/multer')

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

//rota de healthCheck
routes.get('/healthCheck', (req, res) => {
    return res.send("I'm Health! TY - deploy 13_01");
})

//rotas Box
//rota criacao de box
routes.post('/boxes', BoxController.store);

//rota get todos os box
routes.get('/box', BoxController.getBox);

//rota get box pelo id
routes.get('/box/:id', BoxController.getBoxById);

//rota get files de uma box
routes.get('/box/:id/files',BoxController.show);

//rotas files
//rota criacao de file generico
routes.post('/files', multer(multerConfig).single('file'), FileController.storeTest);

//rota criacao de file associado a uma box
routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);

//exportando as rotas
module.exports = routes;