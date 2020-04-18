const router = require('express').Router();
let Challenge = require('../models/challenge.model');

router.route('/add').post((req, res) => {
  const content = req.body.content;
  // TODO: img

  const newChallenge = new Challenge({
    content
  });

  newChallenge.save()
  .then(() => res.json('Daily challenge added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
