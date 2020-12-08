"use strict"
const connection = require('../db');

class Reviews {

	constructor() {
	}

	get id() {
		return this._id;
	}

	set id(id) {
		this._id = id;
	}

	get userID() {
		return this._userID;
	}

	set userID(userID) {
		this._userID = userID;
	}

	get restID() {
		return this._restID;
	}

	set restID(restID) {
		this._restID = restID;
	}

	get reviewTxt() {
		return this._reviewTxt;
	}

	set reviewTxt(reviewTxt) {
		this._reviewTxt = reviewTxt;
	}

	get score() {
		return this._score;
	}

	set score(score) {
		this._score = score;
	}

	get dateCreated() {
		return this._dateCreated;
	}

	set dateCreated(dateCreated) {
		this._dateCreated = dateCreated;
	}


}

module.exports = Reviews;
