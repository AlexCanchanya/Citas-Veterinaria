# Sistema de Gestión de Citas para Veterinaria

![Version](https://img.shields.io/badge/version-1.0.0-orange?style=flat)
![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat&logo=spring-boot&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)




Este proyecto es un sistema que permite gestionar citas en una veterinaria. Incluye un backend desarrollado en Java con Spring Boot y un frontend desarrollado en Angular. El sistema permite a los usuarios manejar clientes, mascotas, y gestionar citas a través de una interfaz web amigable.

![](https://github.com/AlexCanchanya/Citas-Veterinaria/blob/main/image.png)
## Modulos

- **Módulos Gestión de Citas:** Programar, modificar y cancelar citas para mascotas.
- **Gestión de Clientes:** Administración de la información de los dueños de las mascotas.
- **Gestión de Mascotas:** Manejo de la información de las mascotas, incluyendo su historial médico.
- **Notificaciones:** Envío de recordatorios y confirmaciones de citas vía whatsapp.
- **Dashboard:** Visualización de estadísticas y reportes sobre las citas y pacientes.


## Instalación

Para instalar el Sistema Requieres:
- JDK 11 o superior
- Spring Tools Suite (STS) o IntelliJ IDEA
- Node.js y npm
- Angular CLI
- MySQL

**Descargas y configuracion de MySql:**
- Primero debes descargar este repositorio y colocarlo en tu carpeta de preferencia.
- Deberás crear la base de datos llamada "veterinary" en tu servidor MySQL. Las tablas requeridas están en el archivo schema.sql, que debes ejecutar en tu servidor MySQL para crear las tablas necesarias.

**Configuración del Backend con Spring Boot:**
- Abre el proyecto BackendProject en Spring Tools Suite (STS) o en IntelliJ IDEA.
- Modifica el archivo application.properties ubicado en la carpeta src/main/resources y - agrega los datos de conexión a tu base de datos MySQL, como el nombre de usuario y la contraseña.
- Una vez configurado, ejecuta el sistema.

**Configuración del Frontend con Angular:**
- Navega al directorio del proyecto Angular que se encuentra en la carpeta FrontendProject.
- Instala las dependencias en caso de ser necesarias.
- ejecuta el servidor de desarrollo de Angular con: ng serve
- Finalmente, abre tu navegador web y accede a la aplicación en http://localhost:4200.

**Datos de usuario por defecto:**
- Usuario: admin
- Contraseña: admin
