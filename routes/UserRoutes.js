const express = require('express');
const axios = require('axios');
const routes = express.Router();
const UserController = require('../controllers/UserController');



routes.get('/signIn', UserController.getAuthentification);

routes.get('/signUp', UserController.getSignUp);

routes.post('/signUp', UserController.signUp);

routes.post('/signIn', UserController.signIn);

routes.get('/profile', UserController.getProfile);

routes.get('/signout', UserController.signOut);

module.exports = routes;
