-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 07-10-2023 a las 06:08:00
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tesoria_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chirps`
--

DROP TABLE IF EXISTS `chirps`;
CREATE TABLE IF NOT EXISTS `chirps` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `message` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `chirps_user_id_foreign` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_solicitudes`
--

DROP TABLE IF EXISTS `estado_solicitudes`;
CREATE TABLE IF NOT EXISTS `estado_solicitudes` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `estado_solicitudes`
--

INSERT INTO `estado_solicitudes` (`id`, `nombre`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Enviado', '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(2, 'En proceso', '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(3, 'A espera de corrección ', '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(4, 'Completada', '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(5, 'Cancelada', '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(6, 'Detenida', '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `files`
--

DROP TABLE IF EXISTS `files`;
CREATE TABLE IF NOT EXISTS `files` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `referencia` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `extencion` varchar(255) NOT NULL,
  `confidencial` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `solicitud_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `files_nombre_user_id_unique` (`nombre`,`user_id`),
  UNIQUE KEY `files_referencia_unique` (`referencia`),
  KEY `files_user_id_foreign` (`user_id`),
  KEY `files_solicitud_id_foreign` (`solicitud_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_solicitudes`
--

DROP TABLE IF EXISTS `log_solicitudes`;
CREATE TABLE IF NOT EXISTS `log_solicitudes` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `solicitud_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `log_solicitudes_user_id_foreign` (`user_id`),
  KEY `log_solicitudes_solicitud_id_foreign` (`solicitud_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2013_09_18_171619_create_rols_table', 1),
(2, '2014_10_12_000000_create_users_table', 1),
(3, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2023_09_15_173225_create_chirps_table', 1),
(7, '2023_09_18_021112_create_tipo_solicituds_table', 1),
(8, '2023_09_18_021128_create_estado_solicituds_table', 1),
(9, '2023_09_18_021139_create_solicituds_table', 1),
(10, '2023_09_18_022025_create_notificacions_table', 1),
(11, '2023_09_18_022030_create_files_table', 1),
(12, '2023_09_18_110430_create_log_solicituds_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
CREATE TABLE IF NOT EXISTS `notificaciones` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `solicitud_id` bigint(20) UNSIGNED NOT NULL,
  `emisor_id` bigint(20) UNSIGNED NOT NULL,
  `receptor_id` bigint(20) UNSIGNED NOT NULL,
  `message` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notificaciones_emisor_id_foreign` (`emisor_id`),
  KEY `notificaciones_receptor_id_foreign` (`receptor_id`),
  KEY `notificaciones_solicitud_id_foreign` (`solicitud_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Admin', '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(2, 'Cliente', '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(3, 'Usuario1', '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(4, 'Usuario2', '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

DROP TABLE IF EXISTS `solicitudes`;
CREATE TABLE IF NOT EXISTS `solicitudes` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `numero` int(11) NOT NULL,
  `tipo_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `status_id` bigint(20) UNSIGNED NOT NULL,
  `descripcion` text NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `solicitudes_tipo_id_user_id_created_at_unique` (`tipo_id`,`user_id`,`created_at`),
  KEY `solicitudes_user_id_foreign` (`user_id`),
  KEY `solicitudes_status_id_foreign` (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_solicitudes`
--

DROP TABLE IF EXISTS `tipo_solicitudes`;
CREATE TABLE IF NOT EXISTS `tipo_solicitudes` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `tipo` int(11) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tipo_solicitudes`
--

INSERT INTO `tipo_solicitudes` (`id`, `nombre`, `tipo`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Facturas Compra', 4, '0', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(2, 'Facturas Venta', 4, '0', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(3, 'Asesoria Financiera', 1, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(4, 'Marketing Digital', 1, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(5, 'Diseño de Marca Gráfica', 1, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(6, 'Gestión Impositiva y Fiscal', 1, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(7, 'Diseño de Página Web', 1, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(8, 'Constitución Empresarial', 1, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(9, 'Asesoria Comercial', 1, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(10, 'Gestión de Financiamiento', 1, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(11, 'Certificación de inscripción en DGII', 2, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(12, 'Certificación de cumplimiento obligaciones tributarias', 2, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(13, 'Certificación ministerio de trabajo', 2, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(14, 'Certificación TSS', 2, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(15, 'Certificación estatus jurídico', 2, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(16, 'Certificación registro mercantil', 2, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(17, 'Estado de resultado', 3, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(18, 'Balance general', 3, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(19, 'Estado de flujo de efectivo', 3, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(20, 'Estado de capital', 3, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(21, 'Estado comparativo', 3, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(22, 'Reporte de ventas', 4, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(23, 'Reporte de costos', 4, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(24, 'Reporte de costos/ingresos', 4, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(25, 'Balance de ITBIS', 4, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46'),
(26, 'Liquidación aduanal', 4, '1', '2023-10-07 10:07:46', '2023-10-07 10:07:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `empresa` varchar(255) DEFAULT NULL,
  `rnc` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) NOT NULL,
  `rol_id` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_rol_id_foreign` (`rol_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `empresa`, `rnc`, `telefono`, `rol_id`, `status`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'joregesosa@gmail.com', '2023-10-07 10:07:47', '$2y$10$fcTuWFpvxrDRvq3J3GrmpedS3g5IRjhLnprlB2bULdm4Ab7D6kq1y', 'Tesoria', '402-5175896-8', '8098892235', 1, '1', 'IW5MMByXsv', '2023-10-07 10:07:47', '2023-10-07 10:07:47'),
(2, 'Cliete Jose', 'cliente@gmail.com', '2023-10-07 10:07:47', '$2y$10$WDyF.LXs7uzGcjNS3vrW4evCunEdejCPXqoD71n5r4BcjFRW0qMVy', 'Coca Cola', '856-7586985-4', '8098892235', 2, '1', 'h3draV90pN', '2023-10-07 10:07:47', '2023-10-07 10:07:47');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `chirps`
--
ALTER TABLE `chirps`
  ADD CONSTRAINT `chirps_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_solicitud_id_foreign` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitudes` (`id`),
  ADD CONSTRAINT `files_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `log_solicitudes`
--
ALTER TABLE `log_solicitudes`
  ADD CONSTRAINT `log_solicitudes_solicitud_id_foreign` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitudes` (`id`),
  ADD CONSTRAINT `log_solicitudes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_emisor_id_foreign` FOREIGN KEY (`emisor_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `notificaciones_receptor_id_foreign` FOREIGN KEY (`receptor_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `notificaciones_solicitud_id_foreign` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitudes` (`id`);

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `solicitudes_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `estado_solicitudes` (`id`),
  ADD CONSTRAINT `solicitudes_tipo_id_foreign` FOREIGN KEY (`tipo_id`) REFERENCES `tipo_solicitudes` (`id`),
  ADD CONSTRAINT `solicitudes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_rol_id_foreign` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
