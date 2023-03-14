var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.status(500).send('Internal server error');
});

module.exports = router;
