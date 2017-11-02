const express = require('express');
const router = express.Router();

router.get('/testroute', function (req, res) {
  res.send('server rendered routes go here!')
})



module.exports = router;
