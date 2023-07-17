const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const userSchema = new mongoose.Schema({
	_id: { type: String, default: uuid },
	email: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		unique: true,
	},
	passwordHash: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
