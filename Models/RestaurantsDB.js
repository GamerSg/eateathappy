"use strict"
const db = require('../db');
const Restaurants = require('./Restaurants');
const Branch = require('./Branch');
const BranchDB = require('./BranchDB');

class RestaurantsDB {

    static addRestaurant(rest, branch) {
        var sql = "INSERT INTO eatdb.restaurants (name, description, cuisine, website, img1, img2, img3, priceRange) VALUES (?,?,?,?,?,?,?,?)";
        var values = [rest.name, rest.description, rest.cuisine, rest.website, rest.img1, rest.img2, rest.img3, rest.priceRange];
        return db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                branch.restID = result.insertId;
                BranchDB.addBranch(branch);
            }
        });
    }

    static getRestaurants(req, res) {
        var sql = "SELECT * FROM eatdb.restaurants LIMIT 9";
        return db.query(sql,function (error, result) {
            if (error) {
                throw error;
            }
            else {
                res.json(result);
            }
        });
    }



}

module.exports = RestaurantsDB;