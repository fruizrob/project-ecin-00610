var express = require('express')
const db = require( '../db/database.js')
const router = new express.Router()

router.get('/userInfo', function (req, res, next) {
	return res.json({
		user: req.user
	})
})

console.log(db)

// GET
router.get('/roomTypes', db.getRoomTypes)
router.get('/allRooms', db.getAllRooms)

// ADMIN
router.get('/reservations', db.getReservations)
router.get('/reservations/:rut', db.getUserReservations)

module.exports = router;