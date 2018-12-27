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
    const { rut } = req.params

    let query = ` 
      SELECT * 
      FROM reserva
      WHERE rutpasaporte = $1 
    `
    return connection.any(query, rut)
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
    let { rut, start_date, end_date, request, cod_room, cod_type, emp } = req.body

    if(!emp){
      emp = '-'
    }

    connection.tx(t => {
      return t.sequence((order, data) => {
        if (order == 0) {
          let query = `
                INSERT INTO reserva(formaReserva, fechaInicio, fechaFin, requerimientosAdicionales, numTarjetaCredito, bancoTarjetaCredito, rutPasaporte, rutRecepcion)
                VALUES('Web',$2,$3,$4,0,'',$1,$5)
                RETURNING codreserva`
          return t.one(query, [rut, start_date, end_date, request, emp])
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
  },

  // Insertar reserva de un usuario
  insertPayment: (req, res, next) => {
    let { rut, card, bank, monto, codreserva } = req.body

    connection.tx(t => {
      return t.sequence((order, data) => {
        if (order == 0) {
          let query = `
                UPDATE reserva
                SET numTarjetaCredito = $2, bancoTarjetaCredito = $3
                WHERE rutpasaporte = $1 AND codreserva = $4
                `
          return t.any(query, [rut, Number(card), bank, Number(codreserva)])
        }
        if (order == 1) {
          let query = `
                INSERT INTO pago(codFormaPago, codReserva, monto, fecha, numTarjetaCredito)
                VALUES (4, $2, $3, NOW(), $1)
                `
          return t.none(query, [Number(card), Number(codreserva), monto])
        }
        if (order == 2) {
          let query = `
                INSERT INTO reservaestado
                VALUES ($1, 3, NOW(), to_char(NOW(), 'hh:mi'))
                `
          return t.none(query, Number(codreserva))
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