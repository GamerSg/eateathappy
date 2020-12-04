"use strict";

var sleep = require('system-sleep');

const fs = require('fs');
const connection = require('../db');
const Restaurants = require('../Models/Restaurants');
const RestaurantsDB = require('../Models/RestaurantsDB');
const Branch = require('../Models/Branch');
var request = require('request');
const { resolve } = require('path');
const BranchDB = require('../Models/BranchDB');

let rawdata = fs.readFileSync('./bsns.json');
let bsns = JSON.parse(rawdata);

for(let bs of bsns.businesses)
{
    var apiURL = "https://api.yelp.com/v3/businesses/" + bs.id;
    
    var options = {
      'method': 'GET',
      'url': apiURL,
      'headers': {
        'Authorization': 'Bearer aG9iIxWDRweVBG-kfqoo74eo_TjGu1DPEDjcHEbu8yczK5Hy1T6i11HS_9-LuMLZ_YVezScQU03YSVWoeNbDIWxMrcUeECerM_JrJ9y992EWesbnmoEB_EYXOjTHX3Yx'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      var resJS = JSON.parse(response.body);
      console.log(resJS.name);

      var newR = new Restaurants();
      newR.name = resJS.name;
      newR.description = "Yummy yummy restaurant, come eat eat and happy!";
      newR.img1 = resJS.photos[0];
      newR.img2 = resJS.photos[1];
      newR.img3 = resJS.photos[2];
      newR.website = "https://www.lovehandleburgers.com/";
      if(typeof resJS.price === 'undefined')
      {
        newR.priceRange = 0;
      }
      else
      {
        newR.priceRange = resJS.price.length;
      }
      var cui = "";
      for( let c of resJS.categories)
      {
         cui += c.title+","; 
      }
      newR._cuisine = cui.slice(0, cui.length-1);
      var newB = new Branch();
      newB.lat = resJS.coordinates.latitude; 
      newB.long = resJS.coordinates.longitude;
      newB.address = resJS.location.display_address.join();
      newB.contactNumber = resJS.display_phone;

      var OH = "";
      for( let d of resJS.hours[0].open)
      {
         OH += d.day+1 + ":" + d.start + "," + d.end + ";"
      }
      newB.openingHrs = OH;
      console.log(newR);
      console.log(newB);

      RestaurantsDB.addRestaurant(newR, newB);      
    });
    sleep(300); // 5 seconds
}
