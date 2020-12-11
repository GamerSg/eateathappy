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
        console.log(req.query);
        var cuisines="";
        if (typeof req.query.cuisine !== 'undefined') {
            cuisines = " AND (";
            if (typeof req.query.cuisine === 'string') {
                cuisines += "cuisine LIKE '%" + req.query.cuisine + "%')";
            }
            else {
                for (var c of req.query.cuisine) {
                    cuisines += "cuisine LIKE '%" + c + "%' OR ";
                }
                cuisines = cuisines.slice(0, -3) + ")";
            }
        }
        var filter = "(name LIKE '%"+req.query.filter+"%' OR cuisine LIKE '%"+req.query.filter+"%')";
        var sql = "SELECT * FROM eatdb.restaurants WHERE " + filter + cuisines + " ORDER BY name";
        return db.query(sql, function (error, result) {
            console.log(this.sql);
            if (error) {
                throw error;
            }
            else {
                res.json(result);
            }
        });
    }

    static getRestaurant(req, res) {
        console.log(req.query);
        var sql = "SELECT * FROM eatdb.restaurants WHERE id=" + req.query.id;
        return db.query(sql, function (error, result) {
            console.log(this.sql);
            if (error) {
                throw error;
            }
            else {
                res.json(result);
            }
        });
    }

    static getBranch(req, res) {
        console.log(req.query);
        var sql = "SELECT * FROM eatdb.branch WHERE restID=" + req.query.id;
        return db.query(sql, function (error, result) {
            console.log(this.sql);
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