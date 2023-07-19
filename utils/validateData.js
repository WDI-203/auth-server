const { isEmail, isStrongPassword } = require("validator");

const validateData = (req, res, next) => {
	const { email, password } = req.body;

	const errObj = {};

	if (!isEmail(email)) {
		errObj.email = "Please enter valid email";
	}
	if (!isStrongPassword(password)) {
		errObj.password =
			"Your password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character and at least 8 characters long";
	}

	//Object.keys takes all the key and puts it in an array
	if (Object.keys(errObj).length > 0) {
		return res
			.status(500)
			.json({ success: false, message: "Error", error: errObj });
	} else {
		next();
	}
};

module.exports = {
	validateData,
};
