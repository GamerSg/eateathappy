"use strict";
const db = require('../db');
const crypto = require('crypto');
class API {
    static doLogout(request, respond) {
        respond.clearCookie('user');
        respond.clearCookie('id');
        respond.redirect('/index.html');
    }

    static doRegister(request, respond) {
        var req = request.body;
        console.log(req.pwd);
        var pwdSHA = crypto.createHash('sha256').update(req.pwd).digest('hex');

        var sql = "INSERT INTO eatdb.users (firstName, lastName, email, gender, address, mobile,password, img, dateCreated) VALUES (?,?,?,?,?,?,?,?, now())";
        var values = [req.fname, req.lname, req.email, req.gender, req.address + ',' + req.address2, req.mobile, pwdSHA, 'default.png'];
            db.query(sql, values, function (error, result) {
                console.log(this.sql);
                if (error) {
                    console.log("Registration failed");
                    respond.status(500).send("error");
                }
                else {
                    respond.send("success");
                    console.log(result);
                }
            });
        console.log(request.body);
    }

    static doLogin(request, respond) {
        var req = request.body;
        console.log(req.pwd);
        var pwdSHA = crypto.createHash('sha256').update(req.pwd).digest('hex');

        var sql = "SELECT * FROM eatdb.users WHERE email=? AND password=?";
        var values = [req.email,pwdSHA];
            db.query(sql, values, function (error, result) {
                console.log(this.sql);
                console.log(result);
                if (error) {
                    console.log("Login failed");
                    respond.status(500).send("error");
                }
                else {
                    if(result.length == 0)
                    {
                        respond.send("invalid");
                    }
                    else
                    {
                        respond.cookie('user', result[0].firstName, {maxAge: 3600000});
                        respond.cookie('id', result[0].id, {maxAge: 3600000});
                        respond.send("success")
                    }
                    console.log(result);
                }
            });
        console.log(request.body);
    }
}
module.exports = API;