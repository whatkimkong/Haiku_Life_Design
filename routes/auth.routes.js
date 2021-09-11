const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcrypt = require("bcryptjs");

// GET '/auth/signup' => leads to signup form
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

// POST '/auth/signup' => receives user info, verifies it and creates user.
router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body; // destructuring the body for easy access to information

  // 1. backend validators

  // 1.1 check if NOT EMPTY inputs. If it is, render error message
  if (!username || !email || !password) {
    res.render("auth/signup.hbs", {
      errorMessage: "perhaps you left some fields empty? check again please!",
    });
    return; // => stop the route from continuing
  }

  // 1.2 check email format using regex. If wrong format, render same page with error message
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    res.render("auth/signup.hbs", {
      errorMessage: "seems there is an error with the email format",
    });
    return; // => stop the route from continuing
  }

  // 1.3 check password strength using regex. If wrong format, render same page with error message
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    res.render("auth/signup.hbs", {
      errorMessage:
        "Password not strong enough! needs uppercase, lowercase and at least 8 characters long",
    });
    return; // => stop the route from continuing
  }

  // 1.4 check if user with that email already exists
  UserModel.findOne({ email })
    .then((user) => {
      if (user) {
        // if user already exists, render same page with error message
        res.render("auth/signup.hbs", {
          errorMessage:
            "This email has already been used, please type another one",
        });
      } else {
        // 2. encrypt password for security
        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(password, salt);

        console.log(hashedPassword); // The encrypted password

        // 3. Create the new User in our DB => hashedPassword is stored as password
        UserModel.create({ username, email, password: hashedPassword })
          .then(() => {
            // 4. Redirect user to login so they can, well, login.
            res.redirect("/auth/login");
          })
          .catch((err) => {
            next(err); // using next(err) will pass all errors to internal error handler
          });
      }
    })
    .catch((err) => {
      next(err); // using next(err) will pass all errors to internal error handler
    });
});

// GET '/auth/login' => to render a login form
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

// POST '/auth/login' => to authenticate user. Information sent vs Information in Database
router.post("/login", (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body; // destructuring the body for easy access to information

  // 1. Here we could apply backend validators!

  // 1.1 check if information is not empty. If it is, render same page with error message
  if (!email || !password) {
    res.render("auth/login.hbs", {
      errorMessage: "perhaps you left some fields empty? check again please!",
    });
    return; // => stop the route from continuing
  }

  // ... more backend validators can be applied if needed

  // 2. check if user exists in DB
  UserModel.findOne({ email })
    .then((user) => {
      if (user) {
        // 3. Once we find it (user), we need to check if the passwords matches. password from form vs hashed password from DB
        const passwordCheck = bcrypt.compareSync(password, user.password);
        console.log(passwordCheck); // => Boolean that checks if passwords match.

        if (passwordCheck) {
          // 4. If they do, Authenticate the user. We Authenticate by creating an active session in "req.session"
          // Without an active session we would need to ask credentials to the user on every private route.

          req.session.loggedInUser = user;
          // ! "req.session.loggedInUser" will hold information of the user using the app. This will be accessible in ALL ROUTES.

          // creating global variables in hbs to help with auth. To be used to display navigational information to users loggedIn like anchor tags to private pages.
          req.app.locals.isLoggedIn = true;

          // 5. redirect the user to private route like '/profile'
          res.redirect("/profile");
        } else {
          // if the password do not match
          res.render("auth/login.hbs", {
            errorMessage: "wrong password, try again, you silly",
          });
        }
      } else {
        // if the user is not found
        res.render("auth/login.hbs", {
          errorMessage: "user doesn't exist, please signup",
        });
      }
    })
    .catch((err) => {
      next(err); // using next(err) will pass all errors to internal error handler
    });
});

// GET '/auth/logout' => to logout the user (remove the session)
router.get("/logout", (req, res, next) => {
  req.session.destroy(); // this removes the active session "req.session.loggedInUser" and also removes stored session from DB.
  res.redirect("/auth/login");
});

module.exports = router;
