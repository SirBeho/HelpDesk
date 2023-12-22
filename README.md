# Sistema de Gestión de Archivos y Notificaciones

Desarrollo de una aplicación web para el acceso y gestión
de usuarios internos y clientes, con funcionalidades de autenticación, gestión de
documentos, paneles de notificaciones, administración de Tasks y reportes,
entre otros.


## Datos de acceso


- **Email** : admin@gmail.com
- **Password** :  admin


## Características

- **Autenticación y Autorización:** Controla el acceso a las rutas de la aplicación en función de los roles de los usuarios.
- **Interfaz de Usuario Intuitiva:** Proporciona una interfaz de usuario amigable para administrar roles y rutas.


## Herramientas, Lenguajes y Tecnologías Utilizadas

Este sistema de gestión de rutas y roles ha sido desarrollado utilizando diversas herramientas, lenguajes y tecnologías para proporcionar una solución robusta y eficiente. A continuación, se detallan las principales tecnologías utilizadas:


- **Laravel:** Backend de la aplicación, proporciona autenticación, enrutamiento y seguridad.

- **React:** Biblioteca de JavaScript para la interfaz de usuario interactiva.

- **Tailwind CSS:** Framework de diseño para la interfaz de usuario.

- **JWT (JSON Web Tokens):** Autenticación y autorización de usuarios.

- **SQL:** Base de datos para almacenar y gestionar datos.

- **Node.js y npm:** Gestión de dependencias y tareas de desarrollo en el frontend.

- **Git y GitHub:** Control de versiones y alojamiento del código fuente.

- **Variables de Entorno (.env):** Gestión de configuraciones sensibles.

Estas tecnologías se combinan para crear un sistema de gestión de rutas y roles potente y seguro.

## Requisitos previos

Asegúrate de tener instalado lo siguiente en tu sistema antes de comenzar:

- **PHP**: Lenguaje de programación utilizado en el backend.
- **Composer**: Gestor de paquetes de PHP.
- **Node.js**: Motor de JavaScript utilizado para ejecutar React en el frontend.
- **npm**: Gestor de paquetes de Node.js.
- **Git**: Sistema de control de versiones.
- **MySQL** u otro sistema de gestión de bases de datos de tu elección.

## Configuración del Proyecto

1. Clona el repositorio
2. Instala las dependencias de Laravel
3. Copia el archivo .env.example a .env
4. Genera una nueva clave de aplicación 
5. Genera una nueva clave de JWT 
6. Ejecuta las migraciones para crear la estructura de la base de datos
7. (Opcional) Corre los datos de prueva (seeders)
8. Inicia el servidor de desarrollo de Laravel junto a su dependencia react:
        
        git clone https://github.com/Joregesosa/Task Assignment
        composer install
        cp .env.example .env
        php artisan key:generate
        php artisan jwt:secret
        php artisan migrate
        php artisan db:seed

        php artisan serve | npm run dev

<<<<<<< HEAD
### El proyecto esrá disponible en http://localhost ###
=======
### El proyecto esrá disponible en http://localhost:8000 ###
>>>>>>> b0835cf3ee6296b7319a7b158de34a86c8f238f9


## Autores


- **Jorge Sosa**: [LinkedIn](https://github.com/Joregesosa/Task Assignment)
<<<<<<< HEAD
- **Benjamin Tavarez**: [LinkedIn](https://www.linkedin.com/in/benjamin-tavarez-cruceta-052aa623b/)
=======
- **Benjamin Tavarez**: [LinkedIn](https://www.linkedin.com/in/benjamin-tavarez-cruceta-052aa623b/)
>>>>>>> b0835cf3ee6296b7319a7b158de34a86c8f238f9
