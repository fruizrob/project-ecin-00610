var express = require('express');
const querys = require( '../db/querysAPI.js');
const router = new express.Router();
console.log(querys)
router.get('/probando', querys.probarQuery);

module.exports = router; 