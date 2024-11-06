const router = require('express').Router()


const userController = require("../controllers/userController")
//rotas userController
router.post('/user',userController.createUser);
router.get('/user',userController.getAllUsers);
router.put('/user',userController.updateUser);
router.delete('/user/:cpf',userController.deleteUser);

const organizadorController = require("../controllers/organizadorController")
//rotas organizadorController
router.post('/organizador',organizadorController.createOrganizador);
router.get('/organizador', organizadorController.getAllOrganizadores);
router.put('/organizador', organizadorController.updateOrganizador);
router.delete('/organizador/:id', organizadorController.deleteOrganizador);

const eventoController = require("../controllers/eventoController")
//rotas eventoController
router.post('/evento',eventoController.createEvento);
router.get('/evento',eventoController.getAllEventos);
router.put('/evento',eventoController.updateEvento);

module.exports = router