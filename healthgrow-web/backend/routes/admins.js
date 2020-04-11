const router = require('express').Router();
let Admin = require('../models/admin.model');

router.route('/').get((req, res) => {
  Admin.find()
    .then(admins => res.json(admins))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email;

  const newAdmin = new Admin({email});

  newAdmin.save()
    .then(() => res.json('Admin added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Admin.findById(req.params.id)
    .then(admin => res.json(admin))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Admin.findByIdAndDelete(req.params.id)
    .then(() => res.json('Admin deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
  Admin.findById(req.params.id)
    .then(admin => {
      admin.email = req.body.email;

      admin.save()
        .then(() => res.json('Admin updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;