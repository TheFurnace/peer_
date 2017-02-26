var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var path = require('path');
var FacebookTokenStrategy = require('passport-facebook-token');


passport.use(new Strategy({
	clientID: '165008204006667',
	clientSecret: '0f725ad8b39da0a2f612b1620c2f11c7',
    callbackURL: 'http://www.peer-mlh.com/auth/facebook/callback'
}, 
function(accessToken, refreshToken, profile, cb) {
	return cb(null, profile);
})); 

/*
passport.use(new FacebookTokenStrategy({
    clientID: '165008204006667',
    clientSecret: '0f725ad8b39da0a2f612b1620c2f11c7'
  }, function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({facebookId: profile.id}, function (error, user) {
      return done(error, user);
    });
  }
));*/

passport.serializeUser(function(user, cb){
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});


//router.set('views', path.join(__dirname, 'views'));
//router.set('view engine', 'pug');

router.use(passport.initialize());
router.use(passport.session());



/* GET home page. */
router.get('/', function (req, res) {
    res.sendFile('./public/index_.html', { root: __dirname });
});

router.get('/auth/facebook', 
	passport.authenticate('facebook')
	);

router.get('/auth/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '/'}),
    function (req, res) {
        alert('FB authenticated');
		res.redirect('/getstarted/home#');
	});

router.get('/about', function (req, res) {
    res.sendFile('./public/about.html', { root: __dirname });
});

router.get('/getstarted/home', 
	//require('connect-ensure-login').ensureLoggedIn(),
	function(req, res) {
		res.render('home', { user: req.user });
	});

module.exports = router;
