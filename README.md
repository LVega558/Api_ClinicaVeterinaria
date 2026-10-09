# Clínica Veterinaria

Aplicación web para gestionar pacientes, citas y el historial médico de una clínica veterinaria. El proyecto está organizado como una interfaz React y un backend compuesto por un API Gateway y tres microservicios Node.js, con una base de datos PostgreSQL independiente para cada servicio.

## Funcionalidades

- Consultar el panel principal de la clínica.
- Registrar y consultar pacientes y sus propietarios.
- Agendar y consultar citas.
- Registrar y consultar diagnósticos y tratamientos.

## Arquitectura

| Componente | Directorio | Puerto predeterminado | Responsabilidad |
| --- | --- | ---: | --- |
| Frontend | `frontend-app-ing-web/` | `5173` | Interfaz React servida por Vite |
| API Gateway | `backend/` | `3000` | Enruta las solicitudes hacia los microservicios |
| Servicio de pacientes | `servicio-pacientes/` | `3001` | Pacientes y propietarios |
| Servicio de citas | `servicio-citas/` | `3002` | Agenda y citas |
| Servicio de historial | `servicio-historial/` | `3003` | Diagnósticos y tratamientos |
| PostgreSQL | Docker Compose | `5433` | Persistencia de los microservicios |

El frontend se comunica con el Gateway en `http://localhost:3000`. Las bases de datos creadas por `init-db.sql` son `bd_pacientes`, `bd_citas` y `bd_historial`.

## Requisitos

- Node.js y npm.
- Docker Desktop o Docker Engine con el complemento Docker Compose.

## Puesta en marcha

Ejecuta estos pasos desde la raíz del repositorio.

1. Crea el archivo de configuración local a partir del ejemplo:

   En PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

   En macOS o Linux:

   ```bash
   cp .env.example .env
   ```

   Los valores del ejemplo permiten ejecutar el proyecto localmente. Cambia las credenciales antes de usarlo en un entorno compartido o de producción.

2. Inicia PostgreSQL:

   ```bash
   docker compose up -d
   ```

   Compose inicia la base de datos en el puerto `5433` del equipo. `init-db.sql` crea las bases de datos de los servicios al inicializar el volumen por primera vez.

3. Instala las dependencias de cada aplicación y servicio:

   ```bash
   npm install --prefix backend
   npm install --prefix servicio-pacientes
   npm install --prefix servicio-citas
   npm install --prefix servicio-historial
   npm install --prefix frontend-app-ing-web
   ```

4. Abre una terminal para cada proceso y ejecuta los comandos desde la raíz del repositorio:

   ```bash
   node backend/index.js
   ```

   ```bash
   node servicio-pacientes/index.js
   ```

   ```bash
   node servicio-citas/index.js
   ```

   ```bash
   node servicio-historial/index.js
   ```

   ```bash
   npm --prefix frontend-app-ing-web run dev
   ```

5. Abre la URL local que Vite muestra en la terminal, normalmente `http://localhost:5173`.

El API Gateway también ofrece `GET http://localhost:3000/estado` para comprobar que está activo.

## Rutas de la API

Las solicitudes se envían al Gateway, que las reenvía al microservicio correspondiente:

| Método | Ruta | Operación |
| --- | --- | --- |
| `GET` | `/api/pacientes/` | Mensaje de bienvenida del servicio |
| `POST` | `/api/pacientes/registrar` | Registra un propietario y su mascota |
| `GET` | `/api/pacientes/lista` | Lista pacientes y propietarios |
| `GET` | `/api/citas/` | Mensaje de bienvenida del servicio |
| `POST` | `/api/citas/agendar` | Agenda una cita |
| `GET` | `/api/citas/lista` | Lista las citas |
| `GET` | `/api/historial/` | Mensaje de bienvenida del servicio |
| `POST` | `/api/historial/registrar` | Registra un tratamiento |
| `GET` | `/api/historial/lista` | Lista los tratamientos |

Los endpoints `POST` reciben JSON. Por ejemplo, para registrar un paciente:

```json
{
  "nombre_propietario": "Ana Pérez",
  "telefono": "555123456",
  "email": "ana@example.com",
  "nombre_mascota": "Luna",
  "especie": "Perro",
  "raza": "Labrador",
  "edad": 4
}
```

## Desarrollo y comprobaciones

Desde la raíz del repositorio, los comandos del frontend son:

```bash
npm --prefix frontend-app-ing-web run lint
npm --prefix frontend-app-ing-web run build
```

Los paquetes del backend todavía no definen pruebas automatizadas.

## Detener los servicios

Detén los procesos Node.js y Vite con `Ctrl+C` en sus terminales. Para detener PostgreSQL:

```bash
docker compose down
```

Los datos persisten en un volumen de Docker. Para eliminar también ese volumen y sus datos, ejecuta `docker compose down -v`.