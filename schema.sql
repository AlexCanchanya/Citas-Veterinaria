-- 1. Creación de la Base de Datos y Selección
CREATE DATABASE veterinary;
USE veterinary;

-- 2. Creación de Tablas
CREATE TABLE usuario (
    idusuario INT AUTO_INCREMENT PRIMARY KEY,
    nomusuario VARCHAR(50) NOT NULL,
    apeusuario VARCHAR(50) NOT NULL,
    nickusuario VARCHAR(30) NOT NULL,
    passusuario VARCHAR(15) NOT NULL,
    rol VARCHAR(20) NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO usuario (nomusuario, apeusuario, nickusuario, passusuario, rol, estado)
VALUES ('Alex', 'CP', 'alex', 'alex', 'Administrador', TRUE);


CREATE TABLE cliente (
    idcliente INT AUTO_INCREMENT PRIMARY KEY,
    dnicliente CHAR(8) NOT NULL,
    nomcliente VARCHAR(30) NOT NULL,
    apecliente VARCHAR(50) NOT NULL,
    dircliente VARCHAR(50) NOT NULL,
    emailcliente VARCHAR(50) NOT NULL,
    telfcliente CHAR(9) NOT NULL,
    sexcliente VARCHAR(10) NOT NULL,
    estcliente BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE mascotas (
    idmascota INT AUTO_INCREMENT PRIMARY KEY,
    nommascota VARCHAR(30) NOT NULL,
    espmascota VARCHAR(30) NOT NULL,
    razamascota VARCHAR(30) NOT NULL,
    edadmascota INT NOT NULL,
    sexomascota varchar(15) NOT NULL,
	pesomascota INT NOT NULL,
    alimascota VARCHAR(30) NOT NULL,
    castrado VARCHAR(10) NOT NULL,
    idcliente INT NOT NULL,
    estmascota BOOLEAN NOT NULL DEFAULT TRUE,
    fechareg DATE,
    FOREIGN KEY (idcliente) REFERENCES cliente(idcliente)
);

CREATE TABLE veterinario (
    idveterinario INT AUTO_INCREMENT PRIMARY KEY,
    nomveterinario VARCHAR(30) NOT NULL,
    apeveterinario VARCHAR(50) NOT NULL,
    especialidadveterinario VARCHAR(50) NOT NULL,
    telfveterinario CHAR(9) NOT NULL,
    horarioatencion VARCHAR(250) NOT NULL,
    estveterinario BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE servicios (
    idservicio INT AUTO_INCREMENT PRIMARY KEY,
    nombreservicio VARCHAR(100) NOT NULL,
    costoservicio DECIMAL(10, 2) NOT NULL,
    estservicios BOOLEAN NOT NULL DEFAULT TRUE
);




CREATE TABLE citas (
    idcita INT AUTO_INCREMENT PRIMARY KEY,
    idcliente INT NOT NULL,
    idveterinario INT NOT NULL,
    idservicio INT NOT NULL,
    idmascota INT NOT NULL,
    idusuario INT NOT NULL,
    fechacita DATE NOT NULL,
    horacita TIME NOT NULL,
    observaciones VARCHAR(100) NOT NULL,
    estcita VARCHAR(20) NOT NULL,
    FOREIGN KEY (idcliente) REFERENCES cliente(idcliente),
    FOREIGN KEY (idveterinario) REFERENCES veterinario(idveterinario),
    FOREIGN KEY (idservicio) REFERENCES servicios(idservicio),
    FOREIGN KEY (idmascota) REFERENCES mascotas(idmascota),
    FOREIGN KEY (idusuario) REFERENCES usuario(idusuario)
);


CREATE TABLE historialmedico (
    idhistorial INT AUTO_INCREMENT PRIMARY KEY,
    idmascota INT DEFAULT NULL,
    idservicio INT DEFAULT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    diagnostico TEXT COLLATE utf8mb4_general_ci DEFAULT NULL,
    observaciones TEXT COLLATE utf8mb4_general_ci DEFAULT NULL,
    tratamiento TEXT COLLATE utf8mb4_general_ci DEFAULT NULL,
    FOREIGN KEY (idmascota) REFERENCES mascotas(idmascota),
    FOREIGN KEY (idservicio) REFERENCES servicios(idservicio)
);

-- 4. Creación de Procedimientos Almacenados

DELIMITER $$
CREATE PROCEDURE ObtenerCitasPorMesEstado()
BEGIN
    SELECT 
        MONTH(fechacita) AS mes,
        estcita,
        COUNT(*) AS totalCitas
    FROM 
        citas
    WHERE 
        estcita IN ('anulado', 'completado')
    GROUP BY 
        MONTH(fechacita), estcita;
END$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE ObtenerMascotasRegistradasPorMes()
BEGIN
    SELECT 
        MONTH(fechareg) AS mes,
        COUNT(*) AS totalMascotas
    FROM 
        mascotas
    GROUP BY 
        MONTH(fechareg);
END$$
DELIMITER ;

