-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-12-2018 a las 21:54:27
-- Versión del servidor: 10.1.37-MariaDB
-- Versión de PHP: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `taller_ing_software`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignacion`
--

CREATE TABLE `asignacion` (
  `codReserva` int(15) NOT NULL,
  `numero` int(11) NOT NULL,
  `codTipoHab` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `asignacion`
--

INSERT INTO `asignacion` (`codReserva`, `numero`, `codTipoHab`) VALUES
(1, 1, 1),
(1, 4, 1),
(1, 5, 1),
(8, 50, 1),
(6, 77, 1),
(2, 7, 2),
(9, 7, 2),
(2, 8, 2),
(5, 47, 2),
(5, 48, 2),
(7, 81, 2),
(3, 4, 3),
(4, 6, 3),
(10, 29, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargoextra`
--

CREATE TABLE `cargoextra` (
  `codReserva` int(15) NOT NULL,
  `correlativoCargoExtra` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` date NOT NULL,
  `minuto` date NOT NULL,
  `codTipoCargoExtra` int(11) NOT NULL,
  `rutEmpleado` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `rutPasaporte` varchar(10) NOT NULL,
  `direccionParticular` varchar(60) NOT NULL,
  `telefono` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`rutPasaporte`, `direccionParticular`, `telefono`) VALUES
('17846952-k', 'Anibal Pinto 3689', 94512678),
('18456257-5', 'Los Arrayanes 4560', 84521547),
('19542618-8', 'Cisternas con las Higueras 8462', 98652145),
('19542651-7', 'Gabriela Mistral 4589', 87456525),
('19854201-0', 'ulriksen 9076', 84215062),
('19864091-3', 'Gabriel Gonzalez 4564', 25489651);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `delimpieza`
--

CREATE TABLE `delimpieza` (
  `rutPasaporte` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `delimpieza`
--

INSERT INTO `delimpieza` (`rutPasaporte`) VALUES
('12414895-5'),
('14567895-k'),
('15456257-2'),
('17539894-1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `derecepcion`
--

CREATE TABLE `derecepcion` (
  `rutPasaporte` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `derecepcion`
--

INSERT INTO `derecepcion` (`rutPasaporte`) VALUES
('16845268-5'),
('17451284-6');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `rutPasaporte` varchar(10) NOT NULL,
  `password` varchar(30) NOT NULL,
  `tipoEmpleado` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`rutPasaporte`, `password`, `tipoEmpleado`) VALUES
('12414895-5', 'holapapu', 'deLimpieza'),
('14567895-k', 'maquinadeestudios', 'deLimpieza'),
('15456257-2', 'maintaller', 'deLimpieza'),
('16845268-5', 'recepcionista', 'deRecepcion'),
('17451284-6', 'recepcionista', 'deRecepcion'),
('17539894-1', 'jejejeje', 'deLimpieza');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `codEstado` int(11) NOT NULL,
  `nomEstado` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`codEstado`, `nomEstado`) VALUES
(1, 'Reservado'),
(2, 'check.in finalizado'),
(3, 'check-out finalizado'),
(4, 'cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formapago`
--

CREATE TABLE `formapago` (
  `codFormaPago` int(11) NOT NULL,
  `nomFormaPago` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `formapago`
--

INSERT INTO `formapago` (`codFormaPago`, `nomFormaPago`) VALUES
(1, 'efectivo'),
(2, 'cheque'),
(3, 'tarjeta de debito'),
(4, 'tarjeta de credito');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitacion`
--

CREATE TABLE `habitacion` (
  `numero` int(11) NOT NULL,
  `codTipoHab` int(11) NOT NULL,
  `numPiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `habitacion`
--

INSERT INTO `habitacion` (`numero`, `codTipoHab`, `numPiso`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 2, 1),
(4, 1, 1),
(5, 1, 1),
(6, 2, 1),
(7, 2, 1),
(8, 1, 1),
(9, 2, 1),
(10, 1, 1),
(11, 3, 1),
(12, 1, 1),
(13, 1, 2),
(14, 2, 2),
(15, 2, 2),
(16, 2, 2),
(17, 1, 2),
(18, 1, 2),
(19, 3, 2),
(20, 1, 2),
(21, 2, 2),
(22, 1, 2),
(23, 1, 2),
(24, 2, 2),
(25, 1, 3),
(26, 1, 3),
(27, 2, 3),
(28, 1, 3),
(29, 3, 3),
(30, 1, 3),
(31, 1, 3),
(32, 2, 3),
(33, 1, 3),
(34, 2, 3),
(35, 1, 3),
(36, 2, 3),
(37, 1, 4),
(38, 1, 4),
(39, 1, 4),
(40, 1, 4),
(41, 1, 4),
(42, 2, 4),
(43, 1, 4),
(44, 2, 4),
(45, 3, 4),
(46, 2, 4),
(47, 2, 4),
(48, 2, 4),
(49, 1, 5),
(50, 1, 5),
(51, 2, 5),
(52, 2, 5),
(53, 3, 5),
(54, 1, 5),
(55, 2, 5),
(56, 2, 5),
(57, 2, 5),
(58, 2, 5),
(59, 2, 5),
(60, 2, 5),
(61, 1, 6),
(62, 3, 6),
(63, 1, 6),
(64, 1, 6),
(65, 2, 6),
(66, 2, 6),
(67, 2, 6),
(68, 2, 6),
(69, 2, 6),
(70, 1, 6),
(71, 1, 6),
(72, 2, 6),
(73, 2, 7),
(74, 2, 7),
(75, 3, 7),
(76, 2, 7),
(77, 1, 7),
(78, 1, 7),
(79, 2, 7),
(80, 1, 7),
(81, 2, 7),
(82, 1, 7),
(83, 2, 7),
(84, 2, 7),
(85, 1, 8),
(86, 1, 8),
(87, 2, 8),
(88, 1, 8),
(89, 2, 8),
(90, 3, 8),
(91, 2, 8),
(92, 1, 8),
(93, 2, 8),
(94, 1, 8),
(95, 2, 8),
(96, 2, 8),
(97, 1, 9),
(98, 2, 9),
(99, 2, 9),
(100, 1, 9),
(101, 2, 9),
(102, 1, 9),
(103, 1, 9),
(104, 2, 9),
(105, 2, 9),
(106, 3, 9),
(107, 2, 9),
(108, 2, 9),
(109, 1, 10),
(110, 2, 10),
(111, 2, 10),
(112, 2, 10),
(113, 2, 10),
(114, 1, 10),
(115, 1, 10),
(116, 1, 10),
(117, 2, 10),
(118, 1, 10),
(119, 2, 10),
(120, 3, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `numComprobante` int(11) NOT NULL,
  `codFormaPago` int(11) NOT NULL,
  `codReserva` int(15) NOT NULL,
  `monto` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `numTarjetaCredito` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pago`
--

INSERT INTO `pago` (`numComprobante`, `codFormaPago`, `codReserva`, `monto`, `fecha`, `numTarjetaCredito`) VALUES
(11, 1, 1, 106500, '2018-11-26', 123456789),
(12, 4, 2, 115000, '2019-01-15', 987654321),
(13, 3, 3, 105000, '2019-02-10', 789456123),
(14, 1, 4, 140000, '2018-12-11', 789546213),
(15, 2, 5, 120400, '2018-12-05', 213546879),
(16, 1, 6, 160000, '2018-11-30', 546213879),
(17, 4, 7, 150000, '2018-12-17', 456321789),
(18, 1, 8, 120000, '2018-12-16', 875496123),
(19, 3, 9, 110000, '2018-12-30', 951487623),
(20, 2, 10, 120000, '2018-12-05', 852741963);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `rutPasaporte` varchar(10) NOT NULL,
  `nomPersona` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`rutPasaporte`, `nomPersona`) VALUES
('12414895-5', 'Pepe'),
('14567895-k', 'Ronaldo'),
('15456257-2', 'Ramon'),
('16845268-5', 'Catalina'),
('17451284-6', 'Cristian'),
('17539894-1', 'Rodrigo'),
('17846952-k', 'Mario'),
('18456257-5', 'Felipe'),
('19542618-8', 'Ricardo'),
('19542651-7', 'Fabian'),
('19854201-0', 'Paulina'),
('19864091-3', 'Nicolas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `piso`
--

CREATE TABLE `piso` (
  `numPiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `piso`
--

INSERT INTO `piso` (`numPiso`) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pisodelimpieza`
--

CREATE TABLE `pisodelimpieza` (
  `rutPasaporte` varchar(10) NOT NULL,
  `numPiso` int(11) NOT NULL,
  `numSemanaAño` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pisodelimpieza`
--

INSERT INTO `pisodelimpieza` (`rutPasaporte`, `numPiso`, `numSemanaAño`) VALUES
('12414895-5', 1, 6),
('12414895-5', 2, 5),
('14567895-k', 1, 2),
('14567895-k', 4, 8),
('15456257-2', 3, 60),
('15456257-2', 4, 10),
('17539894-1', 6, 10),
('17539894-1', 8, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `codReserva` int(15) NOT NULL,
  `formaReserva` varchar(30) NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `requerimientosAdicionales` text,
  `numTarjetaCredito` int(11) NOT NULL,
  `bancoTarjetaCredito` varchar(50) NOT NULL,
  `rutPasaporte` varchar(10) NOT NULL,
  `rutRecepcion` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`codReserva`, `formaReserva`, `fechaInicio`, `fechaFin`, `requerimientosAdicionales`, `numTarjetaCredito`, `bancoTarjetaCredito`, `rutPasaporte`, `rutRecepcion`) VALUES
(1, 'web', '2018-11-08', '2018-11-26', NULL, 123456789, 'Santander', '17846952-k', '16845268-5'),
(2, 'telefonica', '2019-01-02', '2019-01-15', NULL, 987654321, 'Banco de Chile', '18456257-5', '16845268-5'),
(3, 'presencial', '2019-02-05', '2019-02-10', NULL, 789456123, 'Santander', '19542618-8', '17451284-6'),
(4, 'web', '2018-12-15', '2018-12-25', NULL, 789546213, 'Banco Estado', '17846952-k', '17451284-6'),
(5, 'web', '2018-12-02', '2018-12-05', NULL, 213546879, 'BCI', '19854201-0', '16845268-5'),
(6, 'telefonica', '2018-11-25', '2018-11-30', NULL, 546213879, 'Santander', '19864091-3', '17451284-6'),
(7, 'presencial', '2018-12-15', '2018-12-17', NULL, 456321789, 'Banco Estado', '19542618-8', '16845268-5'),
(8, 'web', '2018-12-14', '2018-12-16', NULL, 875496123, 'Banco de Chile', '19542651-7', '16845268-5'),
(9, 'web', '2018-12-21', '2018-12-30', NULL, 951487623, 'Banco de Chile', '19864091-3', '16845268-5'),
(10, 'presencial', '2018-12-01', '2018-12-05', NULL, 852741963, 'Santander', '19542618-8', '16845268-5');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservaestado`
--

CREATE TABLE `reservaestado` (
  `codReserva` int(15) NOT NULL,
  `codEstado` int(11) NOT NULL,
  `fechaEstado` date NOT NULL,
  `horaEstado` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reservaestado`
--

INSERT INTO `reservaestado` (`codReserva`, `codEstado`, `fechaEstado`, `horaEstado`) VALUES
(2, 1, '2018-12-08', '16:00'),
(3, 1, '2018-12-08', '15:00'),
(7, 1, '2018-12-12', '18:00'),
(9, 1, '2018-12-10', '12:00'),
(8, 2, '2018-12-14', '15:00'),
(1, 3, '2018-12-26', '13:00'),
(5, 3, '2018-12-05', '17:00'),
(6, 3, '2018-11-30', '19:00'),
(10, 3, '2018-11-27', '16:00'),
(4, 4, '2018-12-11', '18:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservatipohabitacion`
--

CREATE TABLE `reservatipohabitacion` (
  `codTipoHab` int(11) NOT NULL,
  `codReserva` int(15) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reservatipohabitacion`
--

INSERT INTO `reservatipohabitacion` (`codTipoHab`, `codReserva`, `cantidad`) VALUES
(1, 1, 3),
(2, 2, 2),
(3, 3, 1),
(3, 4, 1),
(2, 5, 2),
(1, 6, 1),
(2, 7, 1),
(1, 8, 1),
(2, 9, 1),
(3, 10, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipocargoextra`
--

CREATE TABLE `tipocargoextra` (
  `codTipoCargoExtra` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `costo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipocargoextra`
--

INSERT INTO `tipocargoextra` (`codTipoCargoExtra`, `descripcion`, `costo`) VALUES
(110, 'Comprar una copa de helado', 5500),
(111, 'usar el spa del hotel', 30000),
(112, 'uso de servicio al cuarto', 10000),
(113, 'rompio algo de la habitacion', 20000),
(114, 'comprar cualquier tipo de bebestible', 8000),
(115, 'fumo dentro de la habitacion', 40000),
(116, 'uso de nuestros restaurantes', 35000),
(117, 'perdio la llave de la habitacion', 10000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipohabitacion`
--

CREATE TABLE `tipohabitacion` (
  `codTipoHab` int(11) NOT NULL,
  `nomTipoHab` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipohabitacion`
--

INSERT INTO `tipohabitacion` (`codTipoHab`, `nomTipoHab`) VALUES
(1, 'single'),
(2, 'doble'),
(3, 'premium');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignacion`
--
ALTER TABLE `asignacion`
  ADD PRIMARY KEY (`numero`,`codReserva`),
  ADD KEY `asignacion_ibfk_1` (`codReserva`),
  ADD KEY `asignacion_ibfk_2` (`codTipoHab`);

--
-- Indices de la tabla `cargoextra`
--
ALTER TABLE `cargoextra`
  ADD PRIMARY KEY (`codReserva`,`correlativoCargoExtra`),
  ADD KEY `cargoextra_ibfk_2` (`codTipoCargoExtra`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`rutPasaporte`);

--
-- Indices de la tabla `delimpieza`
--
ALTER TABLE `delimpieza`
  ADD PRIMARY KEY (`rutPasaporte`);

--
-- Indices de la tabla `derecepcion`
--
ALTER TABLE `derecepcion`
  ADD PRIMARY KEY (`rutPasaporte`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`rutPasaporte`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`codEstado`);

--
-- Indices de la tabla `formapago`
--
ALTER TABLE `formapago`
  ADD PRIMARY KEY (`codFormaPago`);

--
-- Indices de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD PRIMARY KEY (`numero`),
  ADD KEY `habitacion_ibfk_1` (`codTipoHab`),
  ADD KEY `habitacion_ibfk_2` (`numPiso`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`numComprobante`),
  ADD KEY `pago_ibfk_1` (`codFormaPago`),
  ADD KEY `pago_ibfk_2` (`codReserva`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`rutPasaporte`);

--
-- Indices de la tabla `piso`
--
ALTER TABLE `piso`
  ADD PRIMARY KEY (`numPiso`);

--
-- Indices de la tabla `pisodelimpieza`
--
ALTER TABLE `pisodelimpieza`
  ADD PRIMARY KEY (`rutPasaporte`,`numPiso`),
  ADD KEY `numPiso` (`numPiso`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`codReserva`),
  ADD KEY `reserva_ibfk_1` (`rutPasaporte`),
  ADD KEY `reserva_ibfk_2` (`rutRecepcion`);

--
-- Indices de la tabla `reservaestado`
--
ALTER TABLE `reservaestado`
  ADD PRIMARY KEY (`codEstado`,`codReserva`,`fechaEstado`),
  ADD UNIQUE KEY `codReserva` (`codReserva`) USING BTREE;

--
-- Indices de la tabla `reservatipohabitacion`
--
ALTER TABLE `reservatipohabitacion`
  ADD PRIMARY KEY (`codReserva`,`codTipoHab`),
  ADD KEY `reservatipohabitacion_ibfk_1` (`codTipoHab`);

--
-- Indices de la tabla `tipocargoextra`
--
ALTER TABLE `tipocargoextra`
  ADD PRIMARY KEY (`codTipoCargoExtra`);

--
-- Indices de la tabla `tipohabitacion`
--
ALTER TABLE `tipohabitacion`
  ADD PRIMARY KEY (`codTipoHab`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asignacion`
--
ALTER TABLE `asignacion`
  MODIFY `numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `codEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  MODIFY `numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `numComprobante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `piso`
--
ALTER TABLE `piso`
  MODIFY `numPiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `reservaestado`
--
ALTER TABLE `reservaestado`
  MODIFY `codEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipohabitacion`
--
ALTER TABLE `tipohabitacion`
  MODIFY `codTipoHab` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignacion`
--
ALTER TABLE `asignacion`
  ADD CONSTRAINT `asignacion_ibfk_1` FOREIGN KEY (`codReserva`) REFERENCES `reserva` (`codReserva`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `asignacion_ibfk_2` FOREIGN KEY (`codTipoHab`) REFERENCES `tipohabitacion` (`codTipoHab`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `asignacion_ibfk_3` FOREIGN KEY (`numero`) REFERENCES `habitacion` (`numero`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cargoextra`
--
ALTER TABLE `cargoextra`
  ADD CONSTRAINT `cargoextra_ibfk_1` FOREIGN KEY (`codReserva`) REFERENCES `reserva` (`codReserva`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cargoextra_ibfk_2` FOREIGN KEY (`codTipoCargoExtra`) REFERENCES `tipocargoextra` (`codTipoCargoExtra`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`rutPasaporte`) REFERENCES `persona` (`rutPasaporte`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `delimpieza`
--
ALTER TABLE `delimpieza`
  ADD CONSTRAINT `delimpieza_ibfk_1` FOREIGN KEY (`rutPasaporte`) REFERENCES `empleado` (`rutPasaporte`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `derecepcion`
--
ALTER TABLE `derecepcion`
  ADD CONSTRAINT `derecepcion_ibfk_1` FOREIGN KEY (`rutPasaporte`) REFERENCES `empleado` (`rutPasaporte`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`rutPasaporte`) REFERENCES `persona` (`rutPasaporte`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD CONSTRAINT `habitacion_ibfk_1` FOREIGN KEY (`codTipoHab`) REFERENCES `tipohabitacion` (`codTipoHab`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `habitacion_ibfk_2` FOREIGN KEY (`numPiso`) REFERENCES `piso` (`numPiso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`codFormaPago`) REFERENCES `formapago` (`codFormaPago`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pago_ibfk_2` FOREIGN KEY (`codReserva`) REFERENCES `reserva` (`codReserva`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pisodelimpieza`
--
ALTER TABLE `pisodelimpieza`
  ADD CONSTRAINT `pisodelimpieza_ibfk_1` FOREIGN KEY (`numPiso`) REFERENCES `piso` (`numPiso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pisodelimpieza_ibfk_2` FOREIGN KEY (`rutPasaporte`) REFERENCES `delimpieza` (`rutPasaporte`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`rutPasaporte`) REFERENCES `cliente` (`rutPasaporte`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`rutRecepcion`) REFERENCES `derecepcion` (`rutPasaporte`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservaestado`
--
ALTER TABLE `reservaestado`
  ADD CONSTRAINT `reservaestado_ibfk_1` FOREIGN KEY (`codEstado`) REFERENCES `estado` (`codEstado`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservaestado_ibfk_2` FOREIGN KEY (`codReserva`) REFERENCES `reserva` (`codReserva`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservatipohabitacion`
--
ALTER TABLE `reservatipohabitacion`
  ADD CONSTRAINT `reservatipohabitacion_ibfk_1` FOREIGN KEY (`codTipoHab`) REFERENCES `tipohabitacion` (`codTipoHab`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservatipohabitacion_ibfk_2` FOREIGN KEY (`codReserva`) REFERENCES `reserva` (`codReserva`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
