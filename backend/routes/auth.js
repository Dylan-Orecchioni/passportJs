const express = require("express");
const passport = require("passport");
const router = express.Router();

const CLIENT_URL = "http://localhost:3000";

router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			success: true,
			message: "success",
			user: req.user,
		});
	} else {
		res.status(200).json({
			success: false,
			message: "No user authenticated",
			user: null,
		});
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		success: false,
		message: "failure",
	});
});

router.get("/logout", (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		req.session.destroy(() => {
			res.clearCookie("connect.sid");
			res.json({ success: true });
		});
	});
});

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: CLIENT_URL,
		failureRedirect: "/login/failed",
		session: true,
	})
);
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

module.exports = router;
