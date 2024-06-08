const { getAll, create, getOne, remove, update } = require('../controllers/city.controllers');
const express = require('express');

const cityRouter = express.Router();

cityRouter.route('/cities')
    .get(getAll)
    .post(create);

cityRouter.route('/cities/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = cityRouter;