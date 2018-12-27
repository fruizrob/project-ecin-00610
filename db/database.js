const User = require('../models/user');
var connection = require('../middleware/postgresConnection');

module.exports = {
  // Registrar usuario
  registerUser: (req, res, next) => {
    let { rut, name, password, direction, phone, type } = req.body

    User.register(
      {
        rutpasaporte: rut,
        user_type_id: type,
        nompersona: name
      },
      password,
      (err, user) => {
        if (err) {
          console.log("Error", err)
        } else {
          let query = `
          INSERT INTO cliente 
          VALUES($1,$2,$3)
        `
          return connection.none(query, [rut, direction, phone])
            .then(data => {
              res.status(200).json({ data })
            })
            .catch(err => {
              res.status(500).json({ error: err, message: 'Hubo un error' })
            })
        }
      }
    );
  },

  // Obtener reservas
  getReservations: (req, res, next) => {
    let query = `
      SELECT * 
      FROM reserva
    `
    return connection.any(query)
      .then(data => {
        res.status(200).json({ data })
      })
      .catch(err => {
        res.status(500).json({ error: err, message: 'Hubo un error' })
      })
  },

  // Obtener reservas de un usuario por rut
  getUserReservations:  (req, res, next) => {
    const { rutpasaporte } = req.user

    let query = ` 
      SELECT * 
      FROM reserva
      WHERE rutpasaporte = $1 
    `
    return connection.any(query, [rutpasaporte])
      .then(data => {
        res.status(200).json({ data })
      })
      .catch(err => {
        res.status(500).json({ error: err, message: 'Hubo un error' })
      })
  },

  // Obtener tipos de habitacion
  getRoomTypes: (req, res, next) => {
    let query = ` 
      SELECT *
      FROM tipohabitacion 
    `
    return connection.any(query)
      .then(data => {
        res.status(200).json({ data })
      })
      .catch(err => {
        res.status(500).json({ error: err, message: 'Hubo un error' })
      })
  },

  // Obtener todas las habitaciones
  getAllRooms: (req, res, next) => {
    let query = ` 
      SELECT *
      FROM habitacion 
    `
    return connection.any(query)
      .then(data => {
        res.status(200).json({ data })
      })
      .catch(err => {
        res.status(500).json({ error: err, message: 'Hubo un error' })
      })
  },

  // Obtener habitaciones por tipo
  getRoomsPerType: (req, res, next) => {
    let { type } = req.params
 
    let query = ` 
      SELECT *
      FROM habitacion
      WHERE codTipoHab = $1
    `
    return connection.any(query, type)
      .then(data => {
        res.status(200).json({ data })
      })
      .catch(err => {
        res.status(500).json({ error: err, message: 'Hubo un error' })
      })
  },

  // Insertar reserva de un usuario
  insertReserve: (req, res, next) => {
    let { rut, start_date, end_date, request, cod_room, cod_type } = req.body

    connection.tx(t => {
      return t.sequence((order, data) => {
        if (order == 0) {
          let query = `
                INSERT INTO reserva(formaReserva, fechaInicio, fechaFin, requerimientosAdicionales, numTarjetaCredito, bancoTarjetaCredito, rutPasaporte, rutRecepcion)
                VALUES('Web',$2,$3,$4,0,'',$1,$1)
                RETURNING codreserva`
          return t.one(query, [rut, start_date, end_date, request])
        }
        if (order == 1) {
          let codigo = data.codreserva;

          let query = `
                INSERT INTO reservaestado
                VALUES ($1, 1, NOW(), to_char(NOW(), 'hh:mi'))
                RETURNING codreserva`
          return t.one(query, codigo)
        }
        if (order == 2) {
          let codigo = data.codreserva;

          let query = `
                INSERT INTO asignacion
                VALUES ($1, $2, $3)
                `
          return t.none(query, [codigo, cod_room, cod_type])
        }
      })
    })
      .then(data => {
        res.status(200).json({ data })
      })
      .catch(err => {
        res.status(500).json({ error: err, message: 'Hubo un error' })
      })
  }
};

// querys.addClient = (req, res, next) => {
// 	connection.tx(t => {

// 		/* consultas sin orden
// 		let querys = {};
// 		querys.push(t.one(quetry...))
// 		return t.batch(querys) */

// 		return t.sequence( (order, data) => {
// 			if(order == 0) {
// 				//ingresamos persona
// 				let rut = "11111111-1"
// 				let nombre = "Jhon Doe"

// 				let query = `INSERT INTO persona VALUES($1,$2) RETURNING rutpasaporte`
// 				return t.one(query , [rut, nombre])
// 			}
// 			if(order == 1) {
// 				let rutPersona = data.rutpasaporte;
// 				let direc = 'Unknown location'
// 				let fono = 123456
// 				//ingresamos cliente
// 				let query = `INSERT INTO cliente VALUES($1,$2,$3)`
// 				return connection.none(query, [rutPersona,direc,fono])
// 			}
// 		})
// 	})
// 	.then( data => {
// 		console.log("entra data")
// 		res.status(200).json({data})
// 	})
// 	.catch( err => {
// 		console.log("entra catch")
// 		res.status(500).json({error: err, message: 'Hubo un error'})
// 	})
// }

// querys.selectClient = (req, res , next) => {
// 	let query = `SELECT * FROM "user"`
// 	return connection.any(query)
// 	.then( data => {
// 		res.status(200).json({data})
// 	})
// 	.catch( err => {
// 		res.status(500).json({error: err, message: 'Hubo un error'})
// 	})
// }


