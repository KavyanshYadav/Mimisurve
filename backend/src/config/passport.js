const passport = require('passport');
const { CreateUserwithGoogle,CreateUserwithGitHub} = require('../services/UserService');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;


console.log("namd")
console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);
function passportGoogleinit(){
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
   async function(accessToken, refreshToken, profile, done) {

    console.log(accessToken)
    console.log(refreshToken)
    console.log(profile)

    const data = {
            email:profile._json.email,
            emailVerified:profile._json.email_verified,
            password:null,
            displayName:profile._json.name,
            firstName:profile._json.given_name,
            lastName:profile._json.family_name,
            provider:profile._json.provider,
            accessToken:accessToken,
            refreshToken:refreshToken
        
    }

   

    await CreateUserwithGoogle(accessToken,refreshToken,profile,done)
    return done(null,profile)
    
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
}

function FaceBookinit(){

}

function Githubinit(){

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, done) {
    console.log("github",profile)
    await CreateUserwithGitHub(accessToken,refreshToken,profile,done)
  }
));

}

function Xinit(){

}

function Appleinit(){

}



module.exports = {passportGoogleinit,Githubinit}