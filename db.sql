CREATE TABLE `api`.`usuario` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `UserName` VARCHAR(255) NOT NULL,
  `Correo` VARCHAR(255) NULL,
  `Contraseña` VARCHAR(255) NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  UNIQUE INDEX `UserName_UNIQUE` (`UserName` ASC) VISIBLE,
  UNIQUE INDEX `Correo_UNIQUE` (`Correo` ASC) VISIBLE);

  CREATE TABLE `api`.`categoria` (
  `ID` INT NOT NULL,
  `Nombre` VARCHAR(255) NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE);

CREATE TABLE `api`.`inventario` (
  `ID` INT NOT NULL,
  `Nombre` VARCHAR(255) NULL,
  `Precio` FLOAT NULL,
  `Stock` INT NULL,
  `Categoria` INT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `cat_idx` (`Categoria` ASC) VISIBLE,
  CONSTRAINT `cat`
    FOREIGN KEY (`Categoria`)
    REFERENCES `api`.`categoria` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

    CREATE TABLE `api`.`carrito` (
  `ID` INT NOT NULL,
  `usuario` INT NOT NULL,
  `producto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `intentario_idx` (`producto` ASC) VISIBLE,
  INDEX `usuario_idx` (`usuario` ASC) VISIBLE,
  CONSTRAINT `usuario`
    FOREIGN KEY (`usuario`)
    REFERENCES `api`.`usuario` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `intentario`
    FOREIGN KEY (`producto`)
    REFERENCES `api`.`inventario` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `ventas` (
  `ID` int NOT NULL,
  `usuario` int NOT NULL,
  `fecha de compra` date NOT NULL,
  `producto` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio total` float NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `usuario_idx` (`usuario`),
  KEY `producto_idx` (`producto`),
  CONSTRAINT `product` FOREIGN KEY (`producto`) REFERENCES `inventario` (`ID`),
  CONSTRAINT `user` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
