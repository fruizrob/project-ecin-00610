var connection = require('../middleware/postgresConnection');


const querys = {};

querys.probarQuery = (req, res , next) => {
	let query = "SELECT * FROM dia";
	return connection.any(query)
	.then( data => {
		res.status(200).json({data})
	})
	.catch( err => {
		res.status(500).json({error: err, message: 'Hubo un error blabla'})
	})
}

querys.probarQuery2 = (req, res, next) => {
	let data = { id: req.body.id };
	let query = `SELECT id FROM dia WHERE id = ${id}`;
	return connection.any(query, data)
	.then( data => {
		res.status(200).json({data})
	})
	.catch( err => {
		res.status(500).json({error: err, message: 'Hubo con error con...'})
	})
}


module.exports = querys;