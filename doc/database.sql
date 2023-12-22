CREATE DATABASE GESTION_TAREAS;
USE GESTION_TAREAS;

-- Crear la tabla accesos
CREATE TABLE accesos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_acceso VARCHAR(50)
);
 
-- Crear la tabla roles
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_rol VARCHAR(50)
);

-- Crear la tabla roles_accesos
CREATE TABLE roles_accesos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rol_id INT,
    acceso_id INT,
    FOREIGN KEY (rol_id) REFERENCES roles(id),
    FOREIGN KEY (acceso_id) REFERENCES accesos(id)
);

-- Crear la tabla terceros
CREATE TABLE terceros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    apellido VARCHAR(50),
    correo_electronico VARCHAR(100) UNIQUE,
    telefono VARCHAR(15),
    direccion VARCHAR(255)
);

-- Crear la tabla usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_persona INT,
    name_usuario VARCHAR(100) UNIQUE,
    contrasenia VARCHAR(100),
    rol_id INT,
    FOREIGN KEY (id_persona) REFERENCES terceros(id),
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- Tabla Habilidades
CREATE TABLE Habilidades (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    nameHabilidad VARCHAR(50)
);

-- Tabla Conocimientos
CREATE TABLE Conocimientos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    nameConocimiento VARCHAR(50)
);

-- Tabla Usuarios_Habilidades (Relación entre Usuarios y Habilidades)
CREATE TABLE Usuarios_Habilidades (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UsuarioID INT,
    HabilidadID INT,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(ID),
    FOREIGN KEY (HabilidadID) REFERENCES Habilidades(ID)
);

-- Tabla Usuarios_Conocimientos (Relación entre Usuarios y Conocimientos)
CREATE TABLE Usuarios_Conocimientos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UsuarioID INT,
    ConocimientoID INT,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(ID),
    FOREIGN KEY (ConocimientoID) REFERENCES Conocimientos(ID)
);

-- Crear la tabla prioridades
CREATE TABLE prioridades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_prioridad VARCHAR(20)
);

-- Crear la tabla estados_tareas
CREATE TABLE estados_tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_estado_tarea VARCHAR(20)
);

-- Crear la tabla tipos_de_tarea
CREATE TABLE tipos_de_tarea (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_tipo VARCHAR(50),
    tiempo_promedio INT
);

-- Crear la tabla tareas---------------------------------------------------------
CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_tarea VARCHAR(100),
    descripcion_detallada TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_vencimiento DATE,
    prioridad_id INT,
    responsable_id INT,
    tipo_tarea_id INT,
    tiempo_real INT,
    proyecto BOOLEAN,
    reasignable BOOLEAN,
    estado_id INT,
    FOREIGN KEY (prioridad_id) REFERENCES prioridades(id),
    FOREIGN KEY (responsable_id) REFERENCES usuarios(id),
	FOREIGN KEY (estado_id) REFERENCES estados_tareas(id),
    FOREIGN KEY (tipo_tarea_id) REFERENCES tipos_de_tarea(id)
);

-- Crear la tabla proyectos_tareas
CREATE TABLE proyectos_tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT,
    tarea_id INT,
    FOREIGN KEY (proyecto_id) REFERENCES tareas(id),
    FOREIGN KEY (tarea_id) REFERENCES tareas(id)
);

-- Crear la tabla metrica_estados
CREATE TABLE metrica_estados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100)
);

-- Crear la tabla detalle_metrica_estados
CREATE TABLE detalle_metrica_estados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metrica_id INT,
    rol_id INT,
    estado_tarea_id INT,
    permitido BOOLEAN,
    FOREIGN KEY (metrica_id) REFERENCES metrica_estados(id),
    FOREIGN KEY (estado_tarea_id) REFERENCES estados_tareas(id),
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- Crear la tabla etiquetas
CREATE TABLE etiquetas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_etiqueta VARCHAR(50)
);

-- Crear la tabla tareas_etiquetas
CREATE TABLE tareas_etiquetas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tarea_id INT,
    etiqueta_id INT,
    FOREIGN KEY (tarea_id) REFERENCES tareas(id),
    FOREIGN KEY (etiqueta_id) REFERENCES etiquetas(id)
);

-- Crear la tabla comentarios
CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tarea_id INT,
    usuario_id INT,
    fecha_hora_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contenido_comentario TEXT,
    FOREIGN KEY (tarea_id) REFERENCES tareas(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Crear la tabla archivos_adjuntos
CREATE TABLE archivos_adjuntos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tarea_id INT,
    name_archivo VARCHAR(100),
    ruta_archivo VARCHAR(255),
    FOREIGN KEY (tarea_id) REFERENCES tareas(id)
);

-- Crear la tabla seguimiento_tiempo
CREATE TABLE seguimiento_tiempo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tarea_id INT,
    usuario_id INT,
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_fin TIMESTAMP,
    tiempo_dedicado DECIMAL(10, 2),
    FOREIGN KEY (tarea_id) REFERENCES tareas(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Crear la tabla plantillas_notificaciones
CREATE TABLE plantillas_notificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_notificacion VARCHAR(50),
    mensaje TEXT
);

-- Crear la tabla notificaciones
CREATE TABLE notificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    tarea_id INT,
    tipo_notificacion_id INT,
    fecha_notificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    leida BOOLEAN,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (tarea_id) REFERENCES tareas(id),
    FOREIGN KEY (tipo_notificacion_id) REFERENCES plantillas_notificaciones(id)
);

-- Crear la tabla dependencias_tareas
CREATE TABLE dependencias_tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tarea_id INT,
    tarea_dependiente_id INT,
    FOREIGN KEY (tarea_id) REFERENCES tareas(id),
    FOREIGN KEY (tarea_dependiente_id) REFERENCES tareas(id)
);

-- Crear la tabla log_cambios
CREATE TABLE log_cambios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tarea_id INT,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INT,
    cambio TEXT,
    comentario VARCHAR(255),
    FOREIGN KEY (tarea_id) REFERENCES tareas(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Crear la tabla recursos_categorias
CREATE TABLE recursos_categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_categoria VARCHAR(50)
);

-- Crear la tabla recursos
CREATE TABLE recursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_recurso VARCHAR(50),
    almacenable BOOLEAN,
    categoria_recurso_id INT,
    FOREIGN KEY (categoria_recurso_id) REFERENCES recursos_categorias(id)
);

-- Crear la tabla tareas_recursos
CREATE TABLE tareas_recursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    recurso_id INT,
    tarea_id INT,
    fecha_inicio DATE,
    fecha_fin DATE,
    disponible BOOLEAN,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (recurso_id) REFERENCES recursos(id),
    FOREIGN KEY (tarea_id) REFERENCES tareas(id)
   
);

-- Crear la tabla kpis_categorias
CREATE TABLE kpis_categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_categoria VARCHAR(50)
);

-- Crear la tabla kpis_historial
CREATE TABLE kpis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tarea_id INT,
    kpi_categoria_id INT,
    valor DECIMAL(15, 2),
    fecha_registro DATE,
    FOREIGN KEY (tarea_id) REFERENCES tareas(id),
    FOREIGN KEY (kpi_categoria_id) REFERENCES kpis_categorias(id)
);

