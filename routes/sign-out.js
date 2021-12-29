const express = require('express');
const router = express.Router();

//Handle user Sign-Out
router.get('/', (req, res) => {
  // Destroy Session Data
  req.session.destroy()
  res.redirect('back')
});
module.exports = router;
