const express = require('express');
const router = express.Router();




// Render the admin page on request
router.get('/', (req, res) => {

  res.render('admin', { session: req.session });
});

module.exports = router;