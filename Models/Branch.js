const connection = require('../db');

class Branch {

	constructor() {
	}

	get id() {
		return this._id;
	}

	set id(id) {
		this._id = id;
	}

	get restID() {
		return this._restID;
	}

	set restID(restID) {
		this._restID = restID;
	}

	get address() {
		return this._address;
	}

	set address(address) {
		this._address = address;
	}

	get contactNumber() {
		return this._contactNumber;
	}

	set contactNumber(contactNumber) {
		this._contactNumber = contactNumber;
	}

	get openingHrs() {
		return this._openingHrs;
	}

	set openingHrs(openingHrs) {
		this._openingHrs = openingHrs;
	}

	get lat() {
		return this._lat;
	}

	set lat(lat) {
		this._lat = lat;
	}

	get long() {
		return this._long;
	}

	set long(long) {
		this._long = long;
	}


}

module.exports = Branch;
