"use strict"
const connection = require('../db');

class Users {

	constructor() {
	}

	get id() {
		return this._id;
	}

	set id(id) {
		this._id = id;
	}

	get firstName() {
		return this._firstName;
	}

	set firstName(firstName) {
		this._firstName = firstName;
	}

	get lastName() {
		return this._lastName;
	}

	set lastName(lastName) {
		this._lastName = lastName;
	}

	get email() {
		return this._email;
	}

	set email(email) {
		this._email = email;
	}

	get gender() {
		return this._gender;
	}

	set gender(gender) {
		this._gender = gender;
	}

	get address() {
		return this._address;
	}

	set address(address) {
		this._address = address;
	}

	get mobile() {
		return this._mobile;
	}

	set mobile(mobile) {
		this._mobile = mobile;
	}

	get password() {
		return this._password;
	}

	set password(password) {
		this._password = password;
	}

	get img() {
		return this._img;
	}

	set img(img) {
		this._img = img;
	}

	get dateCreated() {
		return this._dateCreated;
	}

	set dateCreated(dateCreated) {
		this._dateCreated = dateCreated;
	}


}

module.exports = Users;
