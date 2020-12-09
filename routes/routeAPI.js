"use strict"

const API = require("../Models/API");
const RestaurantsDB = require("../Models/RestaurantsDB");
function routeAPI(app){
    app.route('/register').post(API.doRegister);
    app.route('/login').post(API.doLogin);
    app.route('/logout').get(API.doLogout);
    app.route('/getrestaurants').get(RestaurantsDB.getRestaurants);
    app.route('/getrestaurant').get(RestaurantsDB.getRestaurant);
}
module.exports = {routeAPI};


