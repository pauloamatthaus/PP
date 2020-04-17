const express = require('express');
const cors = require('cors')
const routes = require('./routes');

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);

/**
 * Rotas (URL completa) / Recursos (o que vêm depois da barra, associado a entidades).
 */

/**
 * Métodos HTTP
 * 
 * GET - Buscar uma informação do Back;
 * POST - Criar uma informação no Back;
 * PUT - Alterar uma informação no Back;
 * DELETE - Deleta uma informação no Back;
 */

 /**
  * Tipos de Paramêtros
  * 
  * Query Params: Paramêtros nomeados enviados na rota, após o símbolo de "?" para 
  * (filtros, paginação), se quiser adicionar mais de um paramêtro coloca-se eles entre "&"
  * Ex: localhost:3333/users?page=2&nome=Matheus&idade=24
  * 
  * Route Params: Paramêtros utilizados para identificar recursos
  * 
  * Request Body: Corpo da requisição utilizado para criar/alterar recursos.
  */

app.listen(3333);