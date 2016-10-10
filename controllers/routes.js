var express = require('express');
var router = express.Router();

router.use('/notes', require('./notes'))

router.get('/*', function(req, res) {
  res.redirect('/notes');
});

module.exports = router