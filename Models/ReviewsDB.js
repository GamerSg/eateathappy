"use strict"
const db = require('../db');
const Restaurants = require('./Restaurants');
const Reviews = require('./Reviews');

class ReviewsDB {

    static getReviews(req, res) {
        console.log(req.query);
        var sql = "SELECT eatdb.users.firstName, eatdb.users.lastName, eatdb.reviews.userID, eatdb.reviews.reviewTxt, eatdb.reviews.score, eatdb.reviews.dateCreated FROM eatdb.reviews INNER JOIN eatdb.users ON eatdb.reviews.userID=eatdb.users.id WHERE restID="+req.query.restID;
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

    static delReview(req, res) {
        console.log(req.body);
        var sql = "DELETE FROM eatdb.reviews WHERE userID="+req.body.userID+" AND restID="+req.body.restID;
        return db.query(sql, function (error, result) {
            console.log(this.sql);
            if (error) {
                throw error;
            }
            else {
                res.send("success");
            }
        });
    }

    static addReview(req, res) {
        var sql2 = "SELECT * FROM eatdb.reviews WHERE userID=? AND restID=?";
        var values2 = [req.body.userID, req.body.restID];
        return db.query(sql2, values2, function (error2, result2) {
            if (error2) {
                throw error2;
            }
            else {
                console.log(result2);
                var sql ="";
                var values;
                var rT = req.body.heading +":"+req.body.review;
                if(result2.length > 0)
                {
                    sql = "UPDATE eatdb.reviews SET reviewTxt=?,score=?, dateCreated=now() WHERE userID=? AND restID=?";
                    values = [rT, req.body.score, req.body.userID, req.body.restID,];
                }
                else
                {
                    sql = "INSERT INTO eatdb.reviews (userID, restID, reviewTxt, score, dateCreated) VALUES (?,?,?,?,now())";
                    values = [req.body.userID, req.body.restID, rT, req.body.score];
                }
                
              
                return db.query(sql, values, function (error, result) {
                    if (error) {
                        throw error;
                    }
                    else {
                        console.log("Review submitted");
                        res.send("success");
                    }
                });
            }
        });
       
    }
}

module.exports = ReviewsDB;