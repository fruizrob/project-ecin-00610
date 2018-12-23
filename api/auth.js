const express = require('express')
const Passport = require('passport');
const User = require('../models/user');
const router = new express.Router();

// router.post('/login', Passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// }));

router.post('/login', Passport.authenticate('local'), (req, res) => {
  return res.json({
    success: true,
    message: 'Ha logrado ingresar al sistema con éxito!',
    user: req.user
  });
}); 

router.post('/test', (req, res) => {
  res.send("send funciona");
})

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect(client.login);
});


router.get('/register', (req, res) => {
  User.register(
    {rutpasaporte: '19.565.892-7', user_type_id: 'AD', nompersona: 'Felipe Ruiz Robledo'},
    'dorat',
    (err, user) => 
    {
      console.log(err);
      res.json({user, err})
    }
  );
});

module.exports = router;