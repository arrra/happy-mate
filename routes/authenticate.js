const Router = require('express').Router;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = Router();

router.post('/', (req, res) => {
  User.authenticate(req.body.userName, req.body.password, (err, user) => {
    if (err) {
      res.status(400).json(err);
      return;
    }

    const payload = {
      iss: 'localhost:3000',
      name: user.userName,
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET);

    res.cookie('token', token);
    res.status(200).json(user);
  });
});

module.exports = router;
