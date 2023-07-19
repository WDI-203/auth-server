// use isEmpty method validator to check the incoming body for any empty values. If its empty, tell the use that ____ can't be left empty. If everything is good, go to the next validator

//Routes => checkIfEmpty => validateData => controller function
const { isEmpty } = require("validator");
const checkIfEmpty = (req, res, next) => {
	const body = req.body; // { email: "g@mail.com", password: "helloWorld123!" }
	//body['email'] = g@mail.com
	//body.email

	let errObj = {};

	for (let key in body) {
		//key = email, password
		if (isEmpty(body[key])) {
			errObj[key] = `${key} cannot be empty`;
		}
	}
	if (Object.keys(errObj).length > 0) {
		return res
			.status(500)
			.json({ success: false, message: "error", error: errObj });
	} else {
		next();
	}
};

module.exports = {
	checkIfEmpty,
};
