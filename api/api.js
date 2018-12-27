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

// GET
router.get('/roomTypes', db.getRoomTypes)
router.get('/rooms', db.getAllRooms)
router.get('/rooms/:type', db.getRoomsPerType)
router.get('/reservations', db.getReservations)
router.get('/reservations/user/:rut', db.getUserReservations)
router.get('/reservations/:id', db.getReservationSelected)

module.exports = router;