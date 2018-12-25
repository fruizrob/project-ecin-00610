const express = require('express')
const Passport = require('passport');
const User = require('../models/user');
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

router.get('/register', (req, res) => {
  User.register(
    {rutpasaporte: '1', user_type_id: 'AD', nompersona: 'Administrador'},
    '1',
    (err, user) => 
    {
      console.log(err);
      res.json({user, err})
    }
  );
});

module.exports = router;