var express = require('express')
const db = require( '../db/database.js')
const router = new express.Router()

router.get('/userInfo', function (req, res, next) {
	return res.json({
		user: req.user
	})
})

console.log(db)

// POST
router.post('/reserve', db.insertReserve)
router.post('/payment', db.insertPayment)

// GET
router.get('/roomTypes', db.getRoomTypes)
router.get('/rooms', db.getAllRooms)
router.get('/rooms/:type', db.getRoomsPerType)

// ADMIN
router.get('/reservations', db.getReservations)
router.get('/reservations/:rut', db.getUserReservations)

module.exports = router;