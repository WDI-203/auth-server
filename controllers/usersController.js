const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
	try {
		const { email, password } = req.body;
		//salt generates random data to be stored with the password
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		const userInfo = {
			email: email,
			passwordHash: hash,
		};

		const newUser = await new User(userInfo);
		const savedUser = await newUser.save();
		res.status(200).json({ success: true, user: savedUser });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });

		if (!user) {
			return res.status(401).json({
				success: false,
				message: " User and Password does not match ",
			});
		}
		//.compare compares the password coming in from the client and the found user's hashed password to see if they match
		const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

		if (!isPasswordValid) {
			return res
				.status(401)
				.json({ success: false, message: " User and Password does not match" });
		}

		const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
			expiresIn: "1hr",
		});

		res.status(200).json({ success: true, token: token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

module.exports = {
	register,
	login,
};
