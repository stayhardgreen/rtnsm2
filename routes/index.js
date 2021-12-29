const trafficData = require('../data/traffic');
const express = require('express');
const router = express.Router();


// Render the index page on request
router.get('/', async (req, res) => {
  // Notify DB the user has visited this page
  let userName = "Guest";
  if (req.session.username) {
    userName = req.session.username
  }
  await trafficData.addTraffic(new Date(), userName)
  const onlineUsersList = await trafficData.getOnlineUserList()
  console.dir(onlineUsersList);
  // Send along Session Data test test
  res.render('index', { session: req.session, onlineUsersList: onlineUsersList });
});

module.exports = router;

