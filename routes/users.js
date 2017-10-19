const Router = require('express').Router;
const User = require('../models/User');

const router = Router();

router.post('/', (req, res) => {
  User.createUser(req.body.userName, req.body.password, (err, user) => {
    if (err) {
      res.status(500).json(err);
      return;
    }

    res.status(201).json(user);
  });
});

module.exports = router;
