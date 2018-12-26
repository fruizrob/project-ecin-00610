const express = require('express')
const Passport = require('passport');
const User = require('../models/user');
const db = require('../db/database.js');
const router = new express.Router();

router.post('/login', Passport.authenticate('local'), (req, res) => {
  return res.json({
    success: true,
    message: 'Ha logrado ingresar al sistema con éxito!',
    user: req.user,
    successRedirect: '/',
  });
}); 

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.post('/register', db.registerUser);

module.exports = router;