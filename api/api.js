var express = require('express');
const querys = require( '../db/querysAPI.js');
const router = new express.Router();
console.log(querys)


router.get('/userInfo', function (req, res, next) {
	return res.json({
		user: req.user
	});
});

//router.delete('/borrarUsuario')
router.get('/añadirCliente', querys.addClient);
router.get('/selectCliente', querys.selectClient);
//Usuarios

module.exports = router;