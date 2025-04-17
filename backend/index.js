const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");
const PORT = 4000;
const dotenv = require("dotenv");

dotenv.config();
require("./passport");

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use(
	session({
		secret: "ccloud",
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 24 * 60 * 60 * 1000 },
	})
);

app.get("/test", (req, res) => {
	res.send("Hello World");
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
