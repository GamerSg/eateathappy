"use strict"

const API = require("../Models/API");

//const movidedb = require('../Models/MovieDB');


function routeAPI(app){
    app.route('/register').post(API.doRegister);
    app.route('/login').post(API.doLogin);
    app.route('/logout').get(API.doLogout);
}
module.exports = {routeAPI};


