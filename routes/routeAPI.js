"use strict"

const API = require("../Models/API");
const RestaurantsDB = require("../Models/RestaurantsDB");
const ReviewsDB = require("../Models/ReviewsDB");
function routeAPI(app){
    app.route('/register').post(API.doRegister);
    app.route('/login').post(API.doLogin);
    app.route('/logout').get(API.doLogout);
    app.route('/getrestaurants').get(RestaurantsDB.getRestaurants);
    app.route('/getrestaurant').get(RestaurantsDB.getRestaurant);
    app.route('/getbranch').get(RestaurantsDB.getBranch);
    app.route('/review').put(ReviewsDB.addReview);
    app.route('/review').get(ReviewsDB.getReviews);
    app.route('/review').delete(ReviewsDB.delReview);
}
module.exports = {routeAPI};


