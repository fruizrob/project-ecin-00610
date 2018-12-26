var express = require('express');
const db = require( '../db/database.js');
const router = new express.Router();

router.get('/userInfo', function (req, res, next) {
	return res.json({
		user: req.user
	});
});

//router.delete('/borrarUsuario')
router.get('/añadirCliente', db.addClient);
router.get('/selectCliente', db.selectClient);

//POST

module.exports = router;