/*
drop table reservatipohabitacion;
drop table reservaestado;
drop table pisodelimpieza;
drop table pago;
drop table asignacion;
drop table cargoextra;
drop table reserva;
drop table habitacion;
drop table empleado;
drop table cliente;
drop table "user";
drop table user_type;
drop table piso;
drop table formapago;
drop table estado;
drop table tipohabitacion;
drop table tipocargoextra;
drop table session;
*/

CREATE TABLE session(
  sess json,
  sid text,
  expire timestamp,
  PRIMARY KEY (sid)
);

CREATE TABLE user_type (
  id text,
  type text,
  PRIMARY KEY (id)
);

CREATE TABLE  "user"  (
    rutPasaporte  text,
    nomPersona  text,
    user_type_id text,
    password_hash text,
    password_salt text,
    PRIMARY KEY (rutPasaporte),
    FOREIGN KEY (user_type_id) references user_type(id)
);

CREATE TABLE  tipocargoextra  (
   codTipoCargoExtra  serial,
   descripcion  text   ,
   costo  integer,
   PRIMARY KEY ( codTipoCargoExtra )
);

CREATE TABLE  tipohabitacion  (
   codTipoHab  serial   ,
   nomTipoHab  text,
   PRIMARY KEY ( codTipoHab )
);

CREATE TABLE  estado  (
   codEstado  serial,
   nomEstado  text,
   PRIMARY KEY( codEstado )
);

CREATE TABLE  formapago  (
   codFormaPago  serial,
   nomFormaPago  text,
   PRIMARY KEY ( codFormaPago )
);

CREATE TABLE  piso  (
   numPiso  integer,
   PRIMARY KEY (numPiso)
);

CREATE TABLE  cliente  (
   rutPasaporte  text,
   direccionParticular  text,
   telefono  integer,
   PRIMARY KEY( rutPasaporte ),
   FOREIGN KEY ( rutPasaporte ) references "user"( rutPasaporte )
);

CREATE TABLE  habitacion  (
   numero  integer,
   codTipoHab  integer,
   numPiso  integer,
   PRIMARY KEY ( numero ),
   FOREIGN KEY ( codTipoHab ) references tipohabitacion (codTipoHab),
   FOREIGN KEY ( numPiso )    references piso           (numPiso)
);

CREATE TABLE  reserva  (
   codReserva  serial,
   formaReserva  text,
   fechaInicio  date,
   fechaFin  date,
   requerimientosAdicionales  text,
   numTarjetaCredito  integer,
   bancoTarjetaCredito  text,
   rutPasaporte  text,
   rutRecepcion  text, 
   PRIMARY KEY ( codReserva ),
   FOREIGN KEY ( rutPasaporte ) references cliente ( rutPasaporte ),
   FOREIGN KEY ( rutRecepcion ) references "user"  ( rutPasaporte )
);

CREATE TABLE cargoextra (
  codReserva integer,
  correlativoCargoExtra serial,
  fecha  date,
  hora  date,
  minuto  date,
  codTipoCargoExtra  integer,
  rutEmpleado  text,
  PRIMARY KEY ( codReserva , correlativoCargoExtra ),
  FOREIGN KEY (codReserva)        references reserva        (codReserva),
  FOREIGN KEY (codTipoCargoExtra) references tipoCargoExtra (codTipoCargoExtra),
  FOREIGN KEY (rutEmpleado)       references "user"         (rutPasaporte)
);

CREATE TABLE asignacion(
  codReserva integer,
  numero integer,
  codTipoHab integer,
  PRIMARY KEY ( codReserva ),
  FOREIGN KEY (codReserva) references reserva        (codReserva),
  FOREIGN KEY (numero)     references habitacion     (numero),
  FOREIGN KEY (codTipoHab) references tipohabitacion (codTipoHab)
);

CREATE TABLE  pago  (
   numComprobante  serial,
   codFormaPago  integer,
   codReserva  integer,
   monto  integer,
   fecha  date,
   numTarjetaCredito  integer,
   PRIMARY KEY ( numComprobante ),
   FOREIGN KEY ( codFormaPago ) references formapago (codFormaPago),
   FOREIGN KEY ( codReserva )   references reserva   (codReserva)
);

CREATE TABLE  pisodelimpieza  (
   rutPasaporte  text,
   numPiso  integer   ,
   numSemanaAnio  integer, 
   fecha date,
   PRIMARY KEY (rutPasaporte, numPiso, numSemanaAnio),
   FOREIGN KEY (rutPasaporte) references "user"(rutPasaporte),
   FOREIGN KEY (numPiso)      references piso  (numPiso)
);

CREATE TABLE  reservaestado  (
   codReserva  integer,
   codEstado  integer,
   fechaEstado  date,
   horaEstado  text,
   PRIMARY KEY ( codEstado , codReserva , fechaEstado ),
   FOREIGN KEY (codReserva) references reserva (codReserva),
   FOREIGN KEY (codEstado)  references estado  (codEstado)
);

CREATE TABLE  reservatipohabitacion  (
   codTipoHab  integer,
   codReserva  integer,
   cantidad  integer,   
   PRIMARY KEY ( codReserva , codTipoHab ),
   FOREIGN KEY ( codTipoHab ) references tipohabitacion (codTipoHab),
   FOREIGN KEY ( codReserva ) references reserva        (codReserva)
);

CREATE TABLE evento (
    rutPasaporte text,
    numero integer,
    codEvento serial,
    fecha date,
    descripcion text,
    PRIMARY KEY (codEvento),
    FOREIGN KEY (rutPasaporte) references "user" (rutPasaporte),
    FOREIGN KEY (numero) references habitacion (numero)
);

/* INSERT ESCENCIALES */
/* user_type(id, type) */
INSERT INTO user_type VALUES('AD','Administrador');
INSERT INTO user_type VALUES('RC','Recepcionista');
INSERT INTO user_type VALUES('RS','Restaurant & Spa');
INSERT INTO user_type VALUES('PT','Personal de aseo');
INSERT INTO user_type VALUES('US','Usuario');
/* piso(numPiso) */
INSERT INTO  piso VALUES(1);
INSERT INTO  piso VALUES(2);
INSERT INTO  piso VALUES(3);
INSERT INTO  piso VALUES(4);
INSERT INTO  piso VALUES(5);
INSERT INTO  piso VALUES(6);
INSERT INTO  piso VALUES(7);
INSERT INTO  piso VALUES(8);
INSERT INTO  piso VALUES(9);
INSERT INTO  piso VALUES(10);
/* tipoHabitacion(codTipoHab, nomTipoHab) */
INSERT INTO  tipohabitacion (nomTipoHab) VALUES ('Single');
INSERT INTO  tipohabitacion (nomTipoHab) VALUES('Doble');
INSERT INTO  tipohabitacion (nomTipoHab) VALUES('Premium');
/* formaPago(codFormaPago, nomFormaPago) */
INSERT INTO  formapago (nomFormaPago) VALUES ('Efectivo');
INSERT INTO  formapago (nomFormaPago) VALUES ('Cheque');
INSERT INTO  formapago (nomFormaPago) VALUES ('Tarjeta de debito');
INSERT INTO  formapago (nomFormaPago) VALUES ('Tarjeta de credito');
/* estado(codEstado, nomEstado) */
INSERT INTO  estado (nomEstado) VALUES ('Reservado');
INSERT INTO  estado (nomEstado) VALUES ('Check-in finalizado');
INSERT INTO  estado (nomEstado) VALUES ('Check-out finalizado');
INSERT INTO  estado (nomEstado) VALUES ('Cancelado');
/* habitacion(numero, codTipoHab, numPiso) */
INSERT INTO  habitacion VALUES (1, 1, 1);
INSERT INTO  habitacion VALUES (2, 2, 1);
INSERT INTO  habitacion VALUES (3, 2, 1);
INSERT INTO  habitacion VALUES (4, 1, 1);
INSERT INTO  habitacion VALUES (5, 1, 1);
INSERT INTO  habitacion VALUES (6, 2, 1);
INSERT INTO  habitacion VALUES (7, 2, 1);
INSERT INTO  habitacion VALUES (8, 1, 1);
INSERT INTO  habitacion VALUES (9, 2, 1);
INSERT INTO  habitacion VALUES (10, 1, 1);
INSERT INTO  habitacion VALUES (11, 3, 1);
INSERT INTO  habitacion VALUES (12, 1, 1);
INSERT INTO  habitacion VALUES (13, 1, 2);
INSERT INTO  habitacion VALUES (14, 2, 2);
INSERT INTO  habitacion VALUES (15, 2, 2);
INSERT INTO  habitacion VALUES (16, 2, 2);
INSERT INTO  habitacion VALUES (17, 1, 2);
INSERT INTO  habitacion VALUES (18, 1, 2);
INSERT INTO  habitacion VALUES (19, 3, 2);
INSERT INTO  habitacion VALUES (20, 1, 2);
INSERT INTO  habitacion VALUES (21, 2, 2);
INSERT INTO  habitacion VALUES (22, 1, 2);
INSERT INTO  habitacion VALUES (23, 1, 2);
INSERT INTO  habitacion VALUES (24, 2, 2);
INSERT INTO  habitacion VALUES (25, 1, 3);
INSERT INTO  habitacion VALUES (26, 1, 3);
INSERT INTO  habitacion VALUES (27, 2, 3);
INSERT INTO  habitacion VALUES (28, 1, 3);
INSERT INTO  habitacion VALUES (29, 3, 3);
INSERT INTO  habitacion VALUES (30, 1, 3);
INSERT INTO  habitacion VALUES (31, 1, 3);
INSERT INTO  habitacion VALUES (32, 2, 3);
INSERT INTO  habitacion VALUES (33, 1, 3);
INSERT INTO  habitacion VALUES (34, 2, 3);
INSERT INTO  habitacion VALUES (35, 1, 3);
INSERT INTO  habitacion VALUES (36, 2, 3);
INSERT INTO  habitacion VALUES (37, 1, 4);
INSERT INTO  habitacion VALUES (38, 1, 4);
INSERT INTO  habitacion VALUES (39, 1, 4);
INSERT INTO  habitacion VALUES (40, 1, 4);
INSERT INTO  habitacion VALUES (41, 1, 4);
INSERT INTO  habitacion VALUES (42, 2, 4);
INSERT INTO  habitacion VALUES (43, 1, 4);
INSERT INTO  habitacion VALUES (44, 2, 4);
INSERT INTO  habitacion VALUES (45, 3, 4);
INSERT INTO  habitacion VALUES (46, 2, 4);
INSERT INTO  habitacion VALUES (47, 2, 4);
INSERT INTO  habitacion VALUES (48, 2, 4);
INSERT INTO  habitacion VALUES (49, 1, 5);
INSERT INTO  habitacion VALUES (50, 1, 5);
INSERT INTO  habitacion VALUES (51, 2, 5);
INSERT INTO  habitacion VALUES (52, 2, 5);
INSERT INTO  habitacion VALUES (53, 3, 5);
INSERT INTO  habitacion VALUES (54, 1, 5);
INSERT INTO  habitacion VALUES (55, 2, 5);
INSERT INTO  habitacion VALUES (56, 2, 5);
INSERT INTO  habitacion VALUES (57, 2, 5);
INSERT INTO  habitacion VALUES (58, 2, 5); 
INSERT INTO  habitacion VALUES (59, 2, 5);
INSERT INTO  habitacion VALUES (60, 2, 5);
INSERT INTO  habitacion VALUES (61, 1, 6);
INSERT INTO  habitacion VALUES (62, 3, 6);
INSERT INTO  habitacion VALUES (63, 1, 6);
INSERT INTO  habitacion VALUES (64, 1, 6);
INSERT INTO  habitacion VALUES (65, 2, 6);
INSERT INTO  habitacion VALUES (66, 2, 6);
INSERT INTO  habitacion VALUES (67, 2, 6);
INSERT INTO  habitacion VALUES (68, 2, 6);
INSERT INTO  habitacion VALUES (69, 2, 6);
INSERT INTO  habitacion VALUES (70, 1, 6);
INSERT INTO  habitacion VALUES (71, 1, 6);
INSERT INTO  habitacion VALUES (72, 2, 6);
INSERT INTO  habitacion VALUES (73, 2, 7);
INSERT INTO  habitacion VALUES (74, 2, 7);
INSERT INTO  habitacion VALUES (75, 3, 7);
INSERT INTO  habitacion VALUES (76, 2, 7);
INSERT INTO  habitacion VALUES (77, 1, 7);
INSERT INTO  habitacion VALUES (78, 1, 7);
INSERT INTO  habitacion VALUES (79, 2, 7);
INSERT INTO  habitacion VALUES (80, 1, 7);
INSERT INTO  habitacion VALUES (81, 2, 7);
INSERT INTO  habitacion VALUES (82, 1, 7);
INSERT INTO  habitacion VALUES (83, 2, 7);
INSERT INTO  habitacion VALUES (84, 2, 7);
INSERT INTO  habitacion VALUES (85, 1, 8);
INSERT INTO  habitacion VALUES (86, 1, 8);
INSERT INTO  habitacion VALUES (87, 2, 8);
INSERT INTO  habitacion VALUES (88, 1, 8);
INSERT INTO  habitacion VALUES (89, 2, 8);
INSERT INTO  habitacion VALUES (90, 3, 8);
INSERT INTO  habitacion VALUES (91, 2, 8);
INSERT INTO  habitacion VALUES (92, 1, 8);
INSERT INTO  habitacion VALUES (93, 2, 8);
INSERT INTO  habitacion VALUES (94, 1, 8);
INSERT INTO  habitacion VALUES (95, 2, 8);
INSERT INTO  habitacion VALUES (96, 2, 8);
INSERT INTO  habitacion VALUES (97, 1, 9);
INSERT INTO  habitacion VALUES (98, 2, 9);
INSERT INTO  habitacion VALUES (99, 2, 9);
INSERT INTO  habitacion VALUES (100, 1, 9);
INSERT INTO  habitacion VALUES (101, 2, 9);
INSERT INTO  habitacion VALUES (102, 1, 9);
INSERT INTO  habitacion VALUES (103, 1, 9);
INSERT INTO  habitacion VALUES (104, 2, 9);
INSERT INTO  habitacion VALUES (105, 2, 9);
INSERT INTO  habitacion VALUES (106, 3, 9);
INSERT INTO  habitacion VALUES (107, 2, 9);
INSERT INTO  habitacion VALUES (108, 2, 9);
INSERT INTO  habitacion VALUES (109, 1, 10);
INSERT INTO  habitacion VALUES (110, 2, 10);
INSERT INTO  habitacion VALUES (111, 2, 10);
INSERT INTO  habitacion VALUES (112, 2, 10);
INSERT INTO  habitacion VALUES (113, 2, 10);
INSERT INTO  habitacion VALUES (114, 1, 10);
INSERT INTO  habitacion VALUES (115, 1, 10);
INSERT INTO  habitacion VALUES (116, 1, 10);
INSERT INTO  habitacion VALUES (117, 2, 10);
INSERT INTO  habitacion VALUES (118, 1, 10);
INSERT INTO  habitacion VALUES (119, 2, 10);
INSERT INTO  habitacion VALUES (120, 3, 10);

/* FIN ESCENCIALES */

/* DATOS DE PRUEBA */
/* tipoCargoExtra(codTipoCargoExtra ,  descripcion ,  costo) */
INSERT INTO  tipocargoextra (descripcion, costo) VALUES ('Copa de Helado', 5500);
INSERT INTO  tipocargoextra (descripcion, costo) VALUES ('Masaje Spa', 30000);
INSERT INTO  tipocargoextra (descripcion, costo) VALUES ('Hamburgesa', 10000);
INSERT INTO  tipocargoextra (descripcion, costo) VALUES ('Reposición de Daños', 20000);
INSERT INTO  tipocargoextra (descripcion, costo) VALUES ('Bebida', 8000);
INSERT INTO  tipocargoextra (descripcion, costo) VALUES ('Multa - Fumar', 40000);
INSERT INTO  tipocargoextra (descripcion, costo) VALUES ('Total de Cuenta (Restaurant)', 35000);
INSERT INTO  tipocargoextra (descripcion, costo) VALUES ('Reposición de Llave Perdida', 10000);
/* pisoDeLimpieza(rutPasaporte ,  numPiso ,  numSemanaAnio) */
INSERT INTO  pisodelimpieza VALUES ('12.414.895-5', 1, 6);
INSERT INTO  pisodelimpieza VALUES ('12.414.895-5', 1, 2);
INSERT INTO  pisodelimpieza VALUES ('12.414.895-5', 4, 8);
INSERT INTO  pisodelimpieza VALUES ('12.414.895-5', 3, 60);
/* reserva(codReserva ,  formaReserva ,  fechaInicio ,  fechaFin ,  requerimientosAdicionales ,  numTarjetaCredito ,  bancoTarjetaCredito ,  rutPasaporte ,  rutRecepcion) */
INSERT INTO  reserva  ( formaReserva ,  fechaInicio ,  fechaFin ,  requerimientosAdicionales ,  numTarjetaCredito ,  bancoTarjetaCredito ,  rutPasaporte ,  rutRecepcion ) 
VALUES ('web', '2018-11-08', '2018-11-26', '', 123456789, 'Santander', '1.111.111-1', '16.845.268-5');
INSERT INTO  reserva  ( formaReserva ,  fechaInicio ,  fechaFin ,  requerimientosAdicionales ,  numTarjetaCredito ,  bancoTarjetaCredito ,  rutPasaporte ,  rutRecepcion ) 
VALUES('telefonica', '2019-01-02', '2019-01-15', '', 987654321, 'Banco de Chile', '2.222.222-2', '16.845.268-5');
INSERT INTO  reserva  ( formaReserva ,  fechaInicio ,  fechaFin ,  requerimientosAdicionales ,  numTarjetaCredito ,  bancoTarjetaCredito ,  rutPasaporte ,  rutRecepcion ) 
VALUES('presencial', '2019-02-05', '2019-02-10', '', 789456123, 'Santander', '3.333.333-3', '16.845.268-5');
INSERT INTO  reserva  ( formaReserva ,  fechaInicio ,  fechaFin ,  requerimientosAdicionales ,  numTarjetaCredito ,  bancoTarjetaCredito ,  rutPasaporte ,  rutRecepcion ) 
VALUES('web', '2018-12-15', '2018-12-25', '', 789546213, 'Banco Estado', '4.444.444-4', '16.845.268-5');
/* reservaEstado(codReserva ,  codEstado ,  fechaEstado ,  horaEstado) */
INSERT INTO  reservaestado VALUES (2, 1, '2018-12-08', '16:00');
INSERT INTO  reservaestado VALUES(3, 1, '2018-12-08', '15:00');
INSERT INTO  reservaestado VALUES(1, 2, '2018-12-26', '13:00');
INSERT INTO  reservaestado VALUES(4, 4, '2018-12-11', '18:00');
/* Pago(numComprobante ,  codFormaPago ,  codReserva ,  monto ,  fecha ,  numTarjetaCredito) */
INSERT INTO  pago  ( codFormaPago ,  codReserva ,  monto ,  fecha ,  numTarjetaCredito )
VALUES ( 1, 1, 106500, '2018-11-26', 123456789);
INSERT INTO  pago  ( codFormaPago ,  codReserva ,  monto ,  fecha ,  numTarjetaCredito )
VALUES( 4, 2, 115000, '2019-01-15', 987654321);
INSERT INTO  pago  ( codFormaPago ,  codReserva ,  monto ,  fecha ,  numTarjetaCredito )
VALUES( 3, 3, 105000, '2019-02-10', 789456123);
INSERT INTO  pago  ( codFormaPago ,  codReserva ,  monto ,  fecha ,  numTarjetaCredito )
VALUES( 1, 4, 140000, '2018-12-11', 789546213);
/* reservaTipoHabitacion(codTipoHab ,  codReserva ,  cantidad) */
INSERT INTO  reservatipohabitacion VALUES (1, 1, 3);
INSERT INTO  reservatipohabitacion VALUES(2, 2, 2);
INSERT INTO  reservatipohabitacion VALUES(3, 3, 1);
INSERT INTO  reservatipohabitacion VALUES(3, 4, 1);
/* asignacion(codReserva ,  numero ,  codTipoHab) */
INSERT INTO  asignacion VALUES (1, 1, 1);
INSERT INTO  asignacion VALUES(2, 4, 1);
INSERT INTO  asignacion VALUES(3, 5, 1);
INSERT INTO  asignacion VALUES(4, 50, 1);