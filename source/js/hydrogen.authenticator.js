/* exported HydrogenAuthenticationManager */
/* global LocalStrategy, GoogleStrategy, FacebookStrategy, TwitterStrategy, OpenIDStrategy */

var HydrogenAuthenticationManager = function(parent, configuration){

    this.passport = require('passport');
    //var util = require('util');

    this.configuration = configuration || {};

    this.login_url = this.configuration.login_url || null;

    this.configuration.clientId = this.configuration.clientId || null;

    this.configuration.strategy = this.configuration.strategy || null;

    this.AuthenticationLocal = null;
    this.AuthenticationGoogle = null;
    this.AuthenticationFacebook = null;
    this.AuthenticationTwitter = null;
    this.AuthenticationOpenId = null;

    if (this.configuration.local) {
        HydrogenAuthenticationLocal(this,this.configuration);
    }

    if (this.configuration.google) {
        HydrogenAuthenticationGoogle(this,this.configuration);
    }

    if (this.configuration.facebook) {
        HydrogenAuthenticationFacebook(this,this.configuration);
    }

    if (this.configuration.twitter) {
        HydrogenAuthenticationTwitter(this,this.configuration);
    }

    if (this.configuration.openid) {
        HydrogenAuthenticationOpenId(this,this.configuration);
    }

    this.initialize = function () {
      this.passport.initialize();
      this.passport.session();
    };

    // Simple route middleware to ensure user is authenticated.
    //   Use this route middleware on any resource that needs to be protected.  If
    //   the request is authenticated (typically via a persistent login session),
    //   the request will proceed.  Otherwise, the user will be redirected to the
    //   login page.
    this.ensureAuthenticated = function(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
      res.redirect(this.login_url);
    };
};

var HydrogenAuthenticationLocal  = function (parent){//, configuration) {
    parent.HydrogenAuthenticationLocal = require('passport-local').Strategy;

    var auth_url = window.location.protocol + '//'+ window.location.host +'/auth/local/auth_request';
    //var callback_url =  configuration.twitter.callback || window.location.protocol + '//'+ window.location.host +'/auth/local/auth_callback';

    var userFindOne = function(param, callback) {
        callback();
    };

    parent.passport.use(
        new LocalStrategy(
            function(username, password, done) {
                userFindOne({ username: username },
                    function(err, user) {
                        if (err) { return done(err); }
                        if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
                        if (!user.validPassword(password)) { return done(null, false, { message: 'Incorrect password.' }); }
                        return done(null, user);
                    }
                );
            }
        )
    );

    parent.post(auth_url,
        parent.passport.authenticate(
            'local',
            {
                successRedirect: '/',
                failureRedirect: auth_url,
                failureFlash: true
            }
        )
    );
};

var HydrogenAuthenticationGoogle  = function (parent, configuration) {
    parent.HydrogenAuthenticationGoogle = require('passport-google-oauth').OAuth2Strategy;

    var auth_url = window.location.protocol + '//'+ window.location.host +'/auth/google/auth_request';
    var callback_url =  configuration.twitter.callback || window.location.protocol + '//'+ window.location.host +'/auth/google/auth_callback';

    parent.passport.use(new GoogleStrategy({
        returnURL: callback_url,
        realm: configuration.google.realm
      },
      function(identifier, profile, done) {
        process.nextTick(function () { return done(null, profile); });
      }
    ));

    // Redirect the user to Google for authentication.  When complete, Google
    // will redirect the user back to the application at
    //     /auth/google/return
    parent.get(auth_url, parent.passport.authenticate('google'));

    // Google will redirect the user to this URL after authentication.  Finish
    // the process by verifying the assertion.  If valid, the user will be
    // logged in.  Otherwise, authentication has failed.
    parent.get(
        callback_url,
        parent.passport.authenticate(
            'google',
            {
                successRedirect: '/',
                failureRedirect: auth_url
            }
        )
    );
};

var HydrogenAuthenticationFacebook  = function (parent, configuration) {

    parent.HydrogenAuthenticationFacebook = require('passport-facebook').Strategy;

    var auth_url = window.location.protocol + '//'+ window.location.host +'/auth/facebook/auth_request';
    var callback_url =  configuration.twitter.callback || window.location.protocol + '//'+ window.location.host +'/auth/facebook/auth_callback';

    parent.passport.use(new FacebookStrategy({
        clientID: configuration.facebook.app_id,
        clientSecret: configuration.facebook.app_secret,
        callbackURL: callback_url
      },
      function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () { return done(null, profile); });
      }
    ));

    // Redirect the user to Facebook for authentication.  When complete,
    // Facebook will redirect the user back to the application at
    //     /auth/facebook/callback
    parent.get(auth_url, parent.passport.authenticate('facebook'));

    // Facebook will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    parent.get(
        callback_url,
        parent.passport.authenticate(
            'facebook',
            {
                successRedirect: '/',
                failureRedirect: parent.login_url
            }
        )
    );
};

var HydrogenAuthenticationTwitter  = function (parent, configuration) {

    parent.HydrogenAuthenticationTwitter = require('passport-twitter').Strategy;

    var auth_url = window.location.protocol + '//'+ window.location.host +'/auth/twitter/auth_request';
    var callback_url =  configuration.twitter.callback || window.location.protocol + '//'+ window.location.host +'/auth/twitter/auth_callback';

    parent.passport.use(new TwitterStrategy({
        consumerKey: configuration.twitter.consumer_key,
        consumerSecret: configuration.twitter.consumer_secret,
        callbackURL:callback_url
      },
      function(token, tokenSecret, profile, done) {
        process.nextTick(function () { return done(null, profile); });
      }
    ));

    // Redirect the user to Twitter for authentication.  When complete, Twitter
    // will redirect the user back to the application at
    //   /auth/twitter/callback
    parent.get(auth_url, parent.passport.authenticate('twitter'));

    // Twitter will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    parent.get(callback_url,
        parent.passport.authenticate(
            'twitter',
            {
                successRedirect: '/',
                failureRedirect: parent.login_url
            }
        )
    );
};

var HydrogenAuthenticationOpenId = function(parent, configuration) {
    // Use the OpenId  within Passport.
    //   Strategies in Passport require a `verify` function, which accept
    //   credentials and invoke a callback with a user object.
    parent.AuthenticationOpenId = require('passport-openid').Strategy;

    //var auth_url = window.location.protocol + '//'+ window.location.host +'/auth/openid/auth_request';
    var callback_url =  configuration.openid.callback || window.location.protocol + '//'+ window.location.host +'/auth/openid/auth_callback';

    parent.passport.use(new OpenIDStrategy({
        returnURL: callback_url,
        realm: configuration.openid.realmNameSpace,
        profile: true
      },
      function(identifier, profile, done) {
        process.nextTick(function () { return done(null, profile); });
      }
    ));
};
