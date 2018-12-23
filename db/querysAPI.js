var connection = require('../middleware/postgresConnection');


const querys = {};


querys.deleteClient = (req, res, next) => {
	let rut = "11111111-1"
	let nombre = "Jhon Doe"
	let direc = "Unknown location"
	let fono = 123456

	let query = `DELETE FROM persona WHERE rutpasaporte = $1`
	return connection.none(query, [rut,nombre,direc,fono])
	.then( data => {
		res.status(200).json({data})
	})
	.catch( err => {
		res.status(500).json({error: err, message: 'Hubo un error'})
	})
}

querys.addPerson = (req, res, next) => {

	let rut = "11111111-1"
	let nombre = "Jhon Doe"

	let query = `INSERT INTO persona VALUES($1,$2)`
	return connection.none(query, [rut,nombre])
	.then( data => {
		res.status(200).json({data})
	})
	.catch( err => {
		res.status(500).json({error: err, message: 'Hubo un error'})
	})
}

querys.addClient = (req, res, next) => {
	connection.tx(t => {

		/* consultas sin orden
		let querys = {};
		querys.push(t.one(quetry...))
		return t.batch(querys) */

		return t.sequence( (order, data) => {
			if(order == 0) {
				//ingresamos persona
				let rut = "11111111-1"
				let nombre = "Jhon Doe"

				let query = `INSERT INTO persona VALUES($1,$2) RETURNING rutpasaporte`
				return t.one(query , [rut, nombre])
			}
			if(order == 1) {
				let rutPersona = data.rutpasaporte;
				let direc = 'Unknown location'
				let fono = 123456
				//ingresamos cliente
				let query = `INSERT INTO cliente VALUES($1,$2,$3)`
				return connection.none(query, [rutPersona,direc,fono])
			}
		})
	})
	.then( data => {
		console.log("entra data")
		res.status(200).json({data})
	})
	.catch( err => {
		console.log("entra catch")
		res.status(500).json({error: err, message: 'Hubo un error'})
	})
}

querys.selectClient = (req, res , next) => {
	let query = `SELECT * FROM empleado`
	return connection.any(query)
	.then( data => {
		res.status(200).json({data})
	})
	.catch( err => {
		res.status(500).json({error: err, message: 'Hubo un error'})
	})
}


module.exports = querys;