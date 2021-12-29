const bodyParser = require('body-parser');
const urlencodedBodyParser = bodyParser.urlencoded({ extended: false });
const userData = require('../data/user');
const express = require('express');
const router = express.Router();


router.post('/', urlencodedBodyParser, async (req, res) => {
  let user = req.body.username;
  let pass = req.body.password;
  // Ensure no fields are empty
  if (!user || !pass) {
    window.console.log('A field was left empty');
  } else {
    //Check for user in db
    const user_exists_check = await userData.userExits(user, pass);
    //If user exists, assign them a session
    if (user_exists_check) {
      req.session.username = user;
      res.redirect('/')
    } else {
      window.console.log('No user found with those credentials');
    }
  }
});
module.exports = router;
