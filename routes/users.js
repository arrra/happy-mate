const Router = require('express').Router;
const User = require('../models/User');

const router = Router();

router.post('/', (req, res) => {
  const user = new User({
    userName: req.body.userName,
    password: req.body.password,
  });

  user.save((err) => {
    if (err) {
      res.status(500).json(err);
      return;
    }

    res.status(201).json(user);
  });
});

module.exports = router;
