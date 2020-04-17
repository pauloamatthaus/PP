const express = require('express');

const OngController = require('./controller/ongController');
const IncidentController = require('./controller/incidentController')
const SessionController = require('./controller/SessionController')

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.get('/incidents/ongs', IncidentController.listarIncidentEspecifico)
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes;
