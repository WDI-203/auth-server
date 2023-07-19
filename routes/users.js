var express = require("express");
var router = express.Router();
const {
	register,
	login,
	validateUser,
} = require("../controllers/usersController");
const { validateData } = require("../utils/validateData");
const { checkIfEmpty } = require("../utils/checkIfEmpty");
const { jwtMiddleware } = require("../utils/jwtMiddleware");

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

router.post("/register", checkIfEmpty, validateData, register);
router.post("/login", checkIfEmpty, validateData, login);
router.get("/validate", jwtMiddleware, validateUser);

module.exports = router;
