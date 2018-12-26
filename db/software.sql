/*
drop table reservatipohabitacion;
drop table reservaestado;
drop table pisodelimpieza;
drop table pago;
drop table asignacion;
drop table cargoextra;
drop table reserva;
drop table habitacion;
drop table delimpieza;
drop table derecepcion;
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

CREATE TABLE  tipocargoextra  (
   codTipoCargoExtra  integer,
   descripcion  text   ,
   costo  integer,
   PRIMARY KEY ( codTipoCargoExtra )
);

CREATE TABLE  tipohabitacion  (
   codTipoHab  integer   ,
   nomTipoHab  text,
   PRIMARY KEY ( codTipoHab )
);

CREATE TABLE  estado  (
   codEstado  integer,
   nomEstado  text,
   PRIMARY KEY( codEstado )
);

CREATE TABLE  formapago  (
   codFormaPago  integer,
   nomFormaPago  text,
   PRIMARY KEY ( codFormaPago )
);

CREATE TABLE  piso  (
   numPiso  integer,
   PRIMARY KEY (numPiso)
);

CREATE TABLE user_type (
  id text,
  type text,
  PRIMARY KEY (id)
);

CREATE TABLE  "user"  (
    rutPasaporte  text,
    nomPersona  text,
    password text,
    user_type_id text,
    password_hash text,
    password_salt text,
    PRIMARY KEY (rutPasaporte),
    FOREIGN KEY (user_type_id) references user_type(id)
);

CREATE TABLE  cliente  (
   rutPasaporte  text,
   direccionParticular  text,
   telefono  integer,
   PRIMARY KEY( rutPasaporte ),
   FOREIGN KEY ( rutPasaporte ) references "user"( rutPasaporte )
);

CREATE TABLE  delimpieza  (
   rutPasaporte  text,
   PRIMARY KEY( rutPasaporte ),
   FOREIGN KEY ( rutPasaporte ) references empleado( rutPasaporte )
);

CREATE TABLE  derecepcion  (
   rutPasaporte  text,
   PRIMARY KEY( rutPasaporte ),
   FOREIGN KEY ( rutPasaporte ) references empleado( rutPasaporte )
);

CREATE TABLE  empleado  (
   rutPasaporte  text,
   password  text,
   tipoEmpleado  text,
   PRIMARY KEY( rutPasaporte ),
   FOREIGN KEY ( rutPasaporte ) references "user"( rutPasaporte )
);

CREATE TABLE  habitacion  (
   numero  integer,
   codTipoHab  integer,
   numPiso  integer,
   PRIMARY KEY ( numero ),
   FOREIGN KEY ( codTipoHab ) references tipohabitacion(codTipoHab),
   FOREIGN KEY ( numPiso ) references piso(numPiso)
);

CREATE TABLE  reserva  (
   codReserva  integer,
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
   FOREIGN KEY ( rutRecepcion ) references derecepcion (rutPasaporte)
);

CREATE TABLE cargoextra (
  codReserva integer,
  correlativoCargoExtra  integer,
   fecha  date,
   hora  date,
   minuto  date,
   codTipoCargoExtra  integer,
   rutEmpleado  text,
   PRIMARY KEY ( codReserva , correlativoCargoExtra ),
   FOREIGN KEY (codReserva) references reserva(codReserva),
   FOREIGN KEY  (codTipoCargoExtra)references tipoCargoExtra(codTipoCargoExtra),
   FOREIGN KEY (rutEmpleado) references empleado(rutPasaporte)
);

CREATE TABLE asignacion(
  codReserva integer,
  numero integer,
  codTipoHab integer,
  PRIMARY KEY ( codReserva ),
  FOREIGN KEY (codReserva) references reserva (codReserva),
  FOREIGN KEY (numero) references habitacion (numero),
  FOREIGN KEY (codTipoHab) references tipohabitacion(codTipoHab)
);

CREATE TABLE  pago  (
   numComprobante  integer,
   codFormaPago  integer,
   codReserva  integer,
   monto  integer,
   fecha  date,
   numTarjetaCredito  integer,
   PRIMARY KEY ( numComprobante ),
   FOREIGN KEY ( codFormaPago ) references formapago,
   FOREIGN KEY  ( codReserva ) references reserva (codReserva)
);

CREATE TABLE  pisodelimpieza  (
   rutPasaporte  text,
   numPiso  integer   ,
   numSemanaAnio  integer, 
   PRIMARY KEY(rutPasaporte, numPiso, numSemanaAnio),
   FOREIGN KEY (rutPasaporte) references delimpieza(rutPasaporte),
   FOREIGN KEY (numPiso) references piso(numPiso)
);

CREATE TABLE  reservaestado  (
   codReserva  integer,
   codEstado  integer,
   fechaEstado  date,
   horaEstado  text,
   PRIMARY KEY ( codEstado , codReserva , fechaEstado ),
   FOREIGN KEY  (codReserva) references reserva (codReserva),
   FOREIGN KEY (codEstado) references estado (codEstado)
);

CREATE TABLE  reservatipohabitacion  (
   codTipoHab  integer,
   codReserva  integer,
   cantidad  integer,   
   PRIMARY KEY ( codReserva , codTipoHab ),
   FOREIGN KEY ( codTipoHab ) references tipohabitacion (codTipoHab),
   FOREIGN KEY (codReserva) references reserva (codReserva)
);

/* INSERT ESCENCIALES */

INSERT INTO  piso  ( numPiso ) VALUES(1);
INSERT INTO  piso  ( numPiso ) VALUES(2);
INSERT INTO  piso  ( numPiso ) VALUES(3);
INSERT INTO  piso  ( numPiso ) VALUES(4);
INSERT INTO  piso  ( numPiso ) VALUES(5);
INSERT INTO  piso  ( numPiso ) VALUES(6);
INSERT INTO  piso  ( numPiso ) VALUES(7);
INSERT INTO  piso  ( numPiso ) VALUES(8);
INSERT INTO  piso  ( numPiso ) VALUES(9);
INSERT INTO  piso  ( numPiso ) VALUES(10);

INSERT INTO  tipohabitacion  ( codTipoHab ,  nomTipoHab )
VALUES (1, 'Single');
INSERT INTO  tipohabitacion  ( codTipoHab ,  nomTipoHab )
VALUES(2, 'Doble');
INSERT INTO  tipohabitacion  ( codTipoHab ,  nomTipoHab )
VALUES(3, 'Premium');

INSERT INTO  formapago  ( codFormaPago ,  nomFormaPago )
VALUES (1, 'Efectivo');
INSERT INTO  formapago  ( codFormaPago ,  nomFormaPago )
VALUES (2, 'Cheque');
INSERT INTO  formapago  ( codFormaPago ,  nomFormaPago )
VALUES (3, 'Tarjeta de debito');
INSERT INTO  formapago  ( codFormaPago ,  nomFormaPago )
VALUES (4, 'Tarjeta de credito');

INSERT INTO  estado  ( codEstado ,  nomEstado )
VALUES (1, 'Reservado');
INSERT INTO  estado  ( codEstado ,  nomEstado )
VALUES(2, 'check.in finalizado');
INSERT INTO  estado  ( codEstado ,  nomEstado )
VALUES(3, 'check-out finalizado');
INSERT INTO  estado  ( codEstado ,  nomEstado )
VALUES(4, 'cancelado');

INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES (1, 1, 1);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(2, 2, 1);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(3, 2, 1);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(4, 1, 1);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(5, 1, 1);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(6, 2, 1);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(7, 2, 1);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(8, 1, 1);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(9, 2, 1);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(10, 1, 1);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(11, 3, 1);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(12, 1, 1);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(13, 1, 2);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(14, 2, 2);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(15, 2, 2);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(16, 2, 2);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(17, 1, 2);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(18, 1, 2);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(19, 3, 2);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(20, 1, 2);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(21, 2, 2);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(22, 1, 2);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(23, 1, 2);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(24, 2, 2);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(25, 1, 3);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(26, 1, 3);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(27, 2, 3);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(28, 1, 3);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(29, 3, 3);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(30, 1, 3);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(31, 1, 3);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(32, 2, 3);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(33, 1, 3);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(34, 2, 3);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(35, 1, 3);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(36, 2, 3);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(37, 1, 4);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(38, 1, 4);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(39, 1, 4);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(40, 1, 4);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(41, 1, 4);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(42, 2, 4);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(43, 1, 4);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(44, 2, 4);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(45, 3, 4);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(46, 2, 4);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(47, 2, 4);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(48, 2, 4);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(49, 1, 5);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(50, 1, 5);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(51, 2, 5);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(52, 2, 5);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(53, 3, 5);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(54, 1, 5);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(55, 2, 5);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(56, 2, 5);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(57, 2, 5);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(58, 2, 5); 
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(59, 2, 5);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(60, 2, 5);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(61, 1, 6);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(62, 3, 6);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(63, 1, 6);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(64, 1, 6);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(65, 2, 6);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(66, 2, 6);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(67, 2, 6);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(68, 2, 6);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(69, 2, 6);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(70, 1, 6);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(71, 1, 6);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(72, 2, 6);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(73, 2, 7);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(74, 2, 7);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(75, 3, 7);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(76, 2, 7);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(77, 1, 7);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(78, 1, 7);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(79, 2, 7);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(80, 1, 7);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(81, 2, 7);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(82, 1, 7);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(83, 2, 7);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(84, 2, 7);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(85, 1, 8);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(86, 1, 8);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(87, 2, 8);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(88, 1, 8);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(89, 2, 8);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(90, 3, 8);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(91, 2, 8);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(92, 1, 8);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(93, 2, 8);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(94, 1, 8);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(95, 2, 8);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(96, 2, 8);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(97, 1, 9);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(98, 2, 9);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(99, 2, 9);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(100, 1, 9);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(101, 2, 9);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(102, 1, 9);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(103, 1, 9);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(104, 2, 9);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(105, 2, 9);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(106, 3, 9);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(107, 2, 9);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(108, 2, 9);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(109, 1, 10);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(110, 2, 10);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(111, 2, 10);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(112, 2, 10);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(113, 2, 10);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(114, 1, 10);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(115, 1, 10);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(116, 1, 10);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(117, 2, 10);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(118, 1, 10);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(119, 2, 10);
INSERT INTO  habitacion  ( numero ,  codTipoHab ,  numPiso )
VALUES(120, 3, 10);

/* DATOS DE PRUEBA */
INSERT INTO  tipocargoextra  ( codTipoCargoExtra ,  descripcion ,  costo )
VALUES (110, 'Comprar una copa de helado', 5500);
INSERT INTO  tipocargoextra  ( codTipoCargoExtra ,  descripcion ,  costo )
VALUES(111, 'usar el spa del hotel', 30000);
INSERT INTO  tipocargoextra  ( codTipoCargoExtra ,  descripcion ,  costo )
VALUES(112, 'uso de servicio al cuarto', 10000);
INSERT INTO  tipocargoextra  ( codTipoCargoExtra ,  descripcion ,  costo )
VALUES(113, 'rompio algo de la habitacion', 20000);
INSERT INTO  tipocargoextra  ( codTipoCargoExtra ,  descripcion ,  costo )
VALUES(114, 'comprar cualquier tipo de bebestible', 8000);
INSERT INTO  tipocargoextra  ( codTipoCargoExtra ,  descripcion ,  costo )
VALUES(115, 'fumo dentro de la habitacion', 40000);
INSERT INTO  tipocargoextra  ( codTipoCargoExtra ,  descripcion ,  costo )
VALUES(116, 'uso de nuestros restaurantes', 35000);
INSERT INTO  tipocargoextra  ( codTipoCargoExtra ,  descripcion ,  costo )
VALUES(117, 'perdio la llave de la habitacion', 10000);

/* FIN ESCENCIALES */

INSERT INTO  "user"  ( rutPasaporte ,  nomPersona, password) 
VALUES('16845268-5', 'Catalina','recepcionista');
INSERT INTO  "user"  ( rutPasaporte ,  nomPersona, password) 
VALUES('12414895-5', 'Rodrigo', 'limpieza');
INSERT INTO  "user"  ( rutPasaporte ,  nomPersona, password) 
VALUES('17846952-k', 'Mario', 'necesitamosun4');
INSERT INTO  "user"  ( rutPasaporte ,  nomPersona, password) 
VALUES('18456257-5', 'Felipe', 'cuatrodeseisramos');
INSERT INTO  "user"  ( rutPasaporte ,  nomPersona, password) 
VALUES('19542618-8', 'Ricardo', 'pasemosingeco');
INSERT INTO  "user"  ( rutPasaporte ,  nomPersona, password) 
VALUES('19542651-7', 'Fabian', 'enlasad');
INSERT INTO  "user"  ( rutPasaporte ,  nomPersona, password) 
VALUES('19854201-0', 'Paulina', 'seacabaela�o');
INSERT INTO  "user"  ( rutPasaporte ,  nomPersona, password) 
VALUES('19864091-3', 'Nicolas', 'holaquetal');

INSERT INTO  cliente  ( rutPasaporte ,  direccionParticular ,  telefono )
VALUES ('17846952-k', 'Anibal Pinto 3689', 94512678);
INSERT INTO  cliente  ( rutPasaporte ,  direccionParticular ,  telefono )
VALUES('18456257-5', 'Los Arrayanes 4560', 84521547);
INSERT INTO  cliente  ( rutPasaporte ,  direccionParticular ,  telefono )
VALUES('19542618-8', 'Cisternas con las Higueras 8462', 98652145);
INSERT INTO  cliente  ( rutPasaporte ,  direccionParticular ,  telefono )
VALUES('19542651-7', 'Gabriela Mistral 4589', 87456525);
INSERT INTO  cliente  ( rutPasaporte ,  direccionParticular ,  telefono )
VALUES('19854201-0', 'ulriksen 9076', 84215062);
INSERT INTO  cliente  ( rutPasaporte ,  direccionParticular ,  telefono )
VALUES('19864091-3', 'Gabriel Gonzalez 4564', 25489651);

INSERT INTO  empleado  ( rutPasaporte ,tipoEmpleado )
VALUES ('12414895-5', 'deLimpieza');
INSERT INTO  empleado  ( rutPasaporte ,tipoEmpleado )
VALUES('16845268-5', 'deRecepcion');

INSERT INTO  delimpieza  ( rutPasaporte )
VALUES ('12414895-5');

INSERT INTO  derecepcion  ( rutPasaporte ) 
VALUES ('16845268-5');

INSERT INTO  reserva  ( codReserva ,  formaReserva ,  fechaInicio ,  fechaFin ,  requerimientosAdicionales ,  numTarjetaCredito ,  bancoTarjetaCredito ,  rutPasaporte ,  rutRecepcion ) 
VALUES (1, 'web', '2018-11-08', '2018-11-26', '', 123456789, 'Santander', '17846952-k', '16845268-5');
INSERT INTO  reserva  ( codReserva ,  formaReserva ,  fechaInicio ,  fechaFin ,  requerimientosAdicionales ,  numTarjetaCredito ,  bancoTarjetaCredito ,  rutPasaporte ,  rutRecepcion ) 
VALUES(2, 'telefonica', '2019-01-02', '2019-01-15', '', 987654321, 'Banco de Chile', '18456257-5', '16845268-5');
INSERT INTO  reserva  ( codReserva ,  formaReserva ,  fechaInicio ,  fechaFin ,  requerimientosAdicionales ,  numTarjetaCredito ,  bancoTarjetaCredito ,  rutPasaporte ,  rutRecepcion ) 
VALUES(3, 'presencial', '2019-02-05', '2019-02-10', '', 789456123, 'Santander', '19542618-8', '16845268-5');
INSERT INTO  reserva  ( codReserva ,  formaReserva ,  fechaInicio ,  fechaFin ,  requerimientosAdicionales ,  numTarjetaCredito ,  bancoTarjetaCredito ,  rutPasaporte ,  rutRecepcion ) 
VALUES(4, 'web', '2018-12-15', '2018-12-25', '', 789546213, 'Banco Estado', '17846952-k', '16845268-5');
INSERT INTO  reserva  ( codReserva ,  formaReserva ,  fechaInicio ,  fechaFin ,  requerimientosAdicionales ,  numTarjetaCredito ,  bancoTarjetaCredito ,  rutPasaporte ,  rutRecepcion ) 
VALUES(5, 'web', '2018-12-02', '2018-12-05', '', 213546879, 'BCI', '19854201-0', '16845268-5');
INSERT INTO  reserva  ( codReserva ,  formaReserva ,  fechaInicio ,  fechaFin ,  requerimientosAdicionales ,  numTarjetaCredito ,  bancoTarjetaCredito ,  rutPasaporte ,  rutRecepcion ) 
VALUES(6, 'telefonica', '2018-11-25', '2018-11-30', '', 546213879, 'Santander', '19864091-3', '16845268-5');
INSERT INTO  reserva  ( codReserva ,  formaReserva ,  fechaInicio ,  fechaFin ,  requerimientosAdicionales ,  numTarjetaCredito ,  bancoTarjetaCredito ,  rutPasaporte ,  rutRecepcion ) 
VALUES(7, 'presencial', '2018-12-15', '2018-12-17', '', 456321789, 'Banco Estado', '19542618-8', '16845268-5');
INSERT INTO  reserva  ( codReserva ,  formaReserva ,  fechaInicio ,  fechaFin ,  requerimientosAdicionales ,  numTarjetaCredito ,  bancoTarjetaCredito ,  rutPasaporte ,  rutRecepcion ) 
VALUES(8, 'web', '2018-12-14', '2018-12-16', '', 875496123, 'Banco de Chile', '19542651-7', '16845268-5');
INSERT INTO  reserva  ( codReserva ,  formaReserva ,  fechaInicio ,  fechaFin ,  requerimientosAdicionales ,  numTarjetaCredito ,  bancoTarjetaCredito ,  rutPasaporte ,  rutRecepcion ) 
VALUES(9, 'web', '2018-12-21', '2018-12-30', '', 951487623, 'Banco de Chile', '19864091-3', '16845268-5');
INSERT INTO  reserva  ( codReserva ,  formaReserva ,  fechaInicio ,  fechaFin ,  requerimientosAdicionales ,  numTarjetaCredito ,  bancoTarjetaCredito ,  rutPasaporte ,  rutRecepcion ) 
VALUES(10, 'presencial', '2018-12-01', '2018-12-05', '', 852741963, 'Santander', '19542618-8', '16845268-5');

INSERT INTO  reservaestado  ( codReserva ,  codEstado ,  fechaEstado ,  horaEstado )
VALUES (2, 1, '2018-12-08', '16:00');
INSERT INTO  reservaestado  ( codReserva ,  codEstado ,  fechaEstado ,  horaEstado )
VALUES(3, 1, '2018-12-08', '15:00');
INSERT INTO  reservaestado  ( codReserva ,  codEstado ,  fechaEstado ,  horaEstado )
VALUES(7, 1, '2018-12-12', '18:00');
INSERT INTO  reservaestado  ( codReserva ,  codEstado ,  fechaEstado ,  horaEstado )
VALUES(9, 1, '2018-12-10', '12:00');
INSERT INTO  reservaestado  ( codReserva ,  codEstado ,  fechaEstado ,  horaEstado )
VALUES(8, 2, '2018-12-14', '15:00');
INSERT INTO  reservaestado  ( codReserva ,  codEstado ,  fechaEstado ,  horaEstado )
VALUES(1, 3, '2018-12-26', '13:00');
INSERT INTO  reservaestado  ( codReserva ,  codEstado ,  fechaEstado ,  horaEstado )
VALUES(5, 3, '2018-12-05', '17:00');
INSERT INTO  reservaestado  ( codReserva ,  codEstado ,  fechaEstado ,  horaEstado )
VALUES(6, 3, '2018-11-30', '19:00');
INSERT INTO  reservaestado  ( codReserva ,  codEstado ,  fechaEstado ,  horaEstado )
VALUES(10, 3, '2018-11-27', '16:00');
INSERT INTO  reservaestado  ( codReserva ,  codEstado ,  fechaEstado ,  horaEstado )
VALUES(4, 4, '2018-12-11', '18:00');

INSERT INTO  pago  ( numComprobante ,  codFormaPago ,  codReserva ,  monto ,  fecha ,  numTarjetaCredito )
VALUES (11, 1, 1, 106500, '2018-11-26', 123456789);
INSERT INTO  pago  ( numComprobante ,  codFormaPago ,  codReserva ,  monto ,  fecha ,  numTarjetaCredito )
VALUES(12, 4, 2, 115000, '2019-01-15', 987654321);
INSERT INTO  pago  ( numComprobante ,  codFormaPago ,  codReserva ,  monto ,  fecha ,  numTarjetaCredito )
VALUES(13, 3, 3, 105000, '2019-02-10', 789456123);
INSERT INTO  pago  ( numComprobante ,  codFormaPago ,  codReserva ,  monto ,  fecha ,  numTarjetaCredito )
VALUES(14, 1, 4, 140000, '2018-12-11', 789546213);
INSERT INTO  pago  ( numComprobante ,  codFormaPago ,  codReserva ,  monto ,  fecha ,  numTarjetaCredito )
VALUES(15, 2, 5, 120400, '2018-12-05', 213546879);
INSERT INTO  pago  ( numComprobante ,  codFormaPago ,  codReserva ,  monto ,  fecha ,  numTarjetaCredito )
VALUES(16, 1, 6, 160000, '2018-11-30', 546213879);
INSERT INTO  pago  ( numComprobante ,  codFormaPago ,  codReserva ,  monto ,  fecha ,  numTarjetaCredito )
VALUES(17, 4, 7, 150000, '2018-12-17', 456321789);
INSERT INTO  pago  ( numComprobante ,  codFormaPago ,  codReserva ,  monto ,  fecha ,  numTarjetaCredito )
VALUES(18, 1, 8, 120000, '2018-12-16', 875496123);
INSERT INTO  pago  ( numComprobante ,  codFormaPago ,  codReserva ,  monto ,  fecha ,  numTarjetaCredito )
VALUES(19, 3, 9, 110000, '2018-12-30', 951487623);
INSERT INTO  pago  ( numComprobante ,  codFormaPago ,  codReserva ,  monto ,  fecha ,  numTarjetaCredito )
VALUES(20, 2, 10, 120000, '2018-12-05', 852741963);

INSERT INTO  reservatipohabitacion  ( codTipoHab ,  codReserva ,  cantidad )
VALUES (1, 1, 3);
INSERT INTO  reservatipohabitacion  ( codTipoHab ,  codReserva ,  cantidad )
VALUES(2, 2, 2);
INSERT INTO  reservatipohabitacion  ( codTipoHab ,  codReserva ,  cantidad )
VALUES(3, 3, 1);
INSERT INTO  reservatipohabitacion  ( codTipoHab ,  codReserva ,  cantidad )
VALUES(3, 4, 1);
INSERT INTO  reservatipohabitacion  ( codTipoHab ,  codReserva ,  cantidad )
VALUES(2, 5, 2);
INSERT INTO  reservatipohabitacion  ( codTipoHab ,  codReserva ,  cantidad )
VALUES(1, 6, 1);
INSERT INTO  reservatipohabitacion  ( codTipoHab ,  codReserva ,  cantidad )
VALUES(2, 7, 1);
INSERT INTO  reservatipohabitacion  ( codTipoHab ,  codReserva ,  cantidad )
VALUES(1, 8, 1);
INSERT INTO  reservatipohabitacion  ( codTipoHab ,  codReserva ,  cantidad )
VALUES(2, 9, 1);
INSERT INTO  reservatipohabitacion  ( codTipoHab ,  codReserva ,  cantidad )
VALUES(3, 10, 1);

INSERT INTO  asignacion  ( codReserva ,  numero ,  codTipoHab ) 
VALUES (1, 1, 1);
INSERT INTO  asignacion  ( codReserva ,  numero ,  codTipoHab ) 
VALUES(2, 4, 1);
INSERT INTO  asignacion  ( codReserva ,  numero ,  codTipoHab ) 
VALUES(3, 5, 1);
INSERT INTO  asignacion  ( codReserva ,  numero ,  codTipoHab ) 
VALUES(4, 50, 1);
INSERT INTO  asignacion  ( codReserva ,  numero ,  codTipoHab ) 
VALUES(6, 77, 1);
INSERT INTO  asignacion  ( codReserva ,  numero ,  codTipoHab ) 
VALUES(5, 7, 2);
INSERT INTO  asignacion  ( codReserva ,  numero ,  codTipoHab ) 
VALUES(9, 7, 2);
INSERT INTO  asignacion  ( codReserva ,  numero ,  codTipoHab ) 
VALUES(7, 8, 2);
INSERT INTO  asignacion  ( codReserva ,  numero ,  codTipoHab ) 
VALUES(10, 47, 2);
INSERT INTO  asignacion  ( codReserva ,  numero ,  codTipoHab ) 
VALUES(8, 48, 2);

INSERT INTO  pisodelimpieza  ( rutPasaporte ,  numPiso ,  numSemanaAnio )
VALUES ('12414895-5', 1, 6);
INSERT INTO  pisodelimpieza  ( rutPasaporte ,  numPiso ,  numSemanaAnio )
VALUES ('12414895-5', 2, 5);
INSERT INTO  pisodelimpieza  ( rutPasaporte ,  numPiso ,  numSemanaAnio )
VALUES ('12414895-5', 1, 2);
INSERT INTO  pisodelimpieza  ( rutPasaporte ,  numPiso ,  numSemanaAnio )
VALUES ('12414895-5', 4, 8);
INSERT INTO  pisodelimpieza  ( rutPasaporte ,  numPiso ,  numSemanaAnio )
VALUES ('12414895-5', 3, 60);
INSERT INTO  pisodelimpieza  ( rutPasaporte ,  numPiso ,  numSemanaAnio )
VALUES ('12414895-5', 4, 10);
INSERT INTO  pisodelimpieza  ( rutPasaporte ,  numPiso ,  numSemanaAnio )
VALUES ('12414895-5', 6, 10);
INSERT INTO  pisodelimpieza  ( rutPasaporte ,  numPiso ,  numSemanaAnio )
VALUES ('12414895-5', 8, 20);