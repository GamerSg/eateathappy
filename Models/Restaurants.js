const connection = require('../db');

class Restaurants {

	constructor() {
	}

	get id() {
		return this._id;
	}

	set id(id) {
		this._id = id;
	}

	get name() {
		return this._name;
	}

	set name(name) {
		this._name = name;
	}

	get description() {
		return this._description;
	}

	set description(description) {
		this._description = description;
	}

	get cuisine() {
		return this._cuisine;
	}

	set cuisine(cuisine) {
		this._cuisine = cuisine;
	}

	get website() {
		return this._website;
	}

	set website(website) {
		this._website = website;
	}

	get img1() {
		return this._img1;
	}

	set img1(img1) {
		this._img1 = img1;
	}

	get img2() {
		return this._img2;
	}

	set img2(img2) {
		this._img2 = img2;
	}

	get img3() {
		return this._img3;
	}

	set img3(img3) {
		this._img3 = img3;
	}

	get priceRange() {
		return this._priceRange;
	}

	set priceRange(priceRange) {
		this._priceRange = priceRange;
	}


}

module.exports = Restaurants;
