"use strict"
const db = require('../db');
const Branch = require('./Branch');

class BranchDB {

    static addBranch(branch) {
        var sql = "INSERT INTO eatdb.branch (restID, address, contactNumber, openingHrs, lat, branch.long) VALUES (?,?,?,?,?,?)";
        var values = [branch.restID, branch.address, branch.contactNumber, branch.openingHrs, branch.lat, branch.long];
        db.query(sql, values, function (error, result) {
            console.log(this.sql);
            if (error) {
                throw error;
            }
            else {
                console.log(result);
            }
        });
    }

}

module.exports = BranchDB;