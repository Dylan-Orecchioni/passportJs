const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
		},
		async function (accessToken, refreshToken, profile, cb) {
			try {
				cb(null, profile);
			} catch (error) {
				return cb(error);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
