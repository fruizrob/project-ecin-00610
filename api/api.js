var express = require('express')
const db = require( '../db/database.js')
const router = new express.Router()

router.get('/userInfo', function (req, res, next) {
	return res.json({
		user: req.user
	})
})

// POST
router.post('/reserve', db.insertReserve)
router.post('/payment', db.insertPayment)
router.post('/payment/admin', db.insertAdminPayment)
router.post('/assign', db.assignFloor)
router.post('/consumption', db.insertConsumption)

// GET
router.get('/roomTypes', db.getRoomTypes)
router.get('/rooms', db.getAllRooms)
router.get('/rooms/:type', db.getRoomsPerType)
router.get('/reservations', db.getReservations)
router.get('/reservations/user/:rut', db.getUserReservations)
router.get('/reservations/:id', db.getReservationSelected)
router.get('/staff', db.getAllStaff)
router.get('/floors', db.getAllFloors)
router.get('/consumptions', db.getConsumptions)
router.get('/cost/:id', db.getConsumption)
router.get('/days/:id', db.gettingDays)

module.exports = router;