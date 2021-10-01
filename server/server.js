const express = require('express')
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs")
const LocalStrategy = require("passport-local").Strategy;
const dotenv = require('dotenv').config()
const app = express()
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 8888
const sneakersV2Router = require('./routes/sneakersV2Router')
const saveSneakersV2Router = require('./routes/saveSneakersV2Router')
const database = require('./database/connection')
const User = require('./models/User')

app.use(cors())
app.use(express.json())

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())

app.use('/sneakers', sneakersV2Router)
app.use('/save-sneakers-v2', saveSneakersV2Router)


passport.use(
  new LocalStrategy((email, password, done) => {
    console.log('faggot')
    User.findOne({ email: email }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        console.log('incorrect username')
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        console.log('correct username')
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      })
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.get("/", (req, res) => {
  console.log(res.locals.currentUser)
  res.json({ user: req.user });
});

app.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.post("/register", async (req, res, next) => {
  const newEmail = req.body.email
  const newPassword = req.body.password
  const userFound = await User.find({email: newEmail})

  console.log(userFound)

  if (userFound.length > 0) {
    console.log('user in database')
    return res.json({error: 'user in database'})
  }

  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    if (err) {
      return err
    }

    const user = new User({
      email: req.body.email,
      password: hashedPassword
    }).save(err => {
      if (err) { 
        return next(err);
      }
      res.redirect("/");
    });
  })
});

app.get('/success', (req, res) => {
  res.json({success: 'Successfully logged in'})
})

app.get('/failure', (req, res) => {
  console.log('failure faggot')
  res.json({failure: 'Failed to login'})
})

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/failure"
  })
);


app.listen(PORT, () => {
  database.connectToServer((err) => {
    if (err) {
      console.error(err)
    }
  })
  console.log(`Server is listening on port ${PORT}`)
})