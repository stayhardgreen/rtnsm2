const bodyParser = require('body-parser');
const urlencodedBodyParser = bodyParser.urlencoded({ extended: false });
const userData = require('../data/user');
const express = require('express');
const realtimeServer = require('../server/realTimeServer');

const router = express.Router();


// Render the register page on request
router.get('/', (req, res) => {
  // Send along Session Data
  res.render('register', { session: req.session, message: req.query.message });
});

// When the Register form is posted, this function will run
router.post('/', urlencodedBodyParser, async (req, res) => {
  // Get the POST content from the form
  let user = req.body.username;
  let pass1 = req.body.pass1;
  let pass2 = req.body.pass2;

  // Ensure no fields are empty
  if (!user || !pass1 || !pass2) {
    console.log('A field was left empty');
  } else {
    // Ensure passwords match
    if (pass1 === pass2) {
      // Check if user already exists
      const user_exists_check = await userData.userExitsByUserName(user);
      if (!user_exists_check) {
        // User does not already exist, insert into database
        const result = await userData.addUser(user, pass1);
        // Assign the user a session because signing in after registering is evil
        req.session.username = user;
        //Update Users List
        const usersList = await userData.getUserList();
        realtimeServer().emit('users-list', usersList);
        //Send the user back to the page they were on
        res.redirect('/')
      } else {
        //User already exists
        res.redirect('/register?message=' + 'User already exists');
      }
    } else {
      //console.log("Passwords do not match");
      res.redirect('/register?message=' + 'Passwords do not match');
    }
  }
});
module.exports = router;
