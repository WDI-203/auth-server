const jwt = require("jsonwebtoken");

const jwtMiddleware = async (req, res, next) => {
	try {
		console.log(req.headers);
		if (req.headers && req.headers.authorization) {
			const token = req.headers.authorization;
			const slicedToken = token.split(" ")[1];
			const decodedToken = jwt.verify(slicedToken, process.env.SECRET_KEY);
			if (decodedToken) {
				res.locals.decodedToken = decodedToken;
				next();
			}
		}
		res.json({ token: req.headers.authorization });
	} catch (error) {
		console.log(error);
		res.status(401).json({ success: false, message: "error", error: error });
	}
};

module.exports = {
	jwtMiddleware,
};
