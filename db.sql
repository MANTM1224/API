[9:22 p. m., 11/12/2025] delena: CREATE TABLE carrito (
  ID int NOT NULL AUTO_INCREMENT,
  usuario int NOT NULL,
  producto int NOT NULL,
  cantidad int NOT NULL,
  Total float NOT NULL,
  PRIMARY KEY (ID),
  KEY intentario_idx (producto),
  KEY usuario_idx (usuario),
  CONSTRAINT intentario FOREIGN KEY (producto) REFERENCES inventario (ID),
  CONSTRAINT usuario FOREIGN KEY (usuario) REFERENCES usuario (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
[9:23 p. m., 11/12/2025] delena: CREATE TABLE categoria (
  ID int NOT NULL,
  Nombre varchar(255) DEFAULT NULL,
  PRIMARY KEY (ID),
  UNIQUE KEY ID_UNIQUE (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
[9:23 p. m., 11/12/2025] delena: CREATE TABLE inventario (
  ID int NOT NULL,
  Nombre varchar(255) DEFAULT NULL,
  Precio float DEFAULT NULL,
  Stock int DEFAULT NULL,
  Categoria int DEFAULT NULL,
  PRIMARY KEY (ID),
  UNIQUE KEY ID_UNIQUE (ID),
  KEY cat_idx (Categoria),
  CONSTRAINT cat FOREIGN KEY (Categoria) REFERENCES categoria (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
[9:23 p. m., 11/12/2025] delena: CREATE TABLE usuario (
  ID int NOT NULL AUTO_INCREMENT,
  UserName varchar(255) NOT NULL,
  Correo varchar(255) DEFAULT NULL,
  Contraseña varchar(255) DEFAULT NULL,
  PRIMARY KEY (ID),
  UNIQUE KEY ID_UNIQUE (ID),
  UNIQUE KEY UserName_UNIQUE (UserName),
  UNIQUE KEY Correo_UNIQUE (Correo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
[9:24 p. m., 11/12/2025] delena: CREATE TABLE ventas (
  ID int NOT NULL,
  usuario int NOT NULL,
  fecha de compra date NOT NULL,
  producto varchar(255) NOT NULL,
  cantidad int NOT NULL,
  precio total float NOT NULL,
  PRIMARY KEY (ID),
  KEY usuario_idx (usuario),
  KEY producto_idx (producto),
  CONSTRAINT user FOREIGN KEY (usuario) REFERENCES usuario (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci