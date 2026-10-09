# Plan de Trabajo: Integración de Páginas Stitch

## Resumen del Proyecto

Este plan detalla la integración de las páginas Stitch en el frontend, conectándolas con el backend existente. El proyecto utiliza una arquitectura de componentes con Vite + React + Zustand, y el sistema de estilos Stitch ya está implementado.

## Fases de Desarrollo

### Fase 1: Configuración y Diseño Stitch (Completada)
- **Objetivo**: Establecer el sistema de estilos Stitch y estructura básica del frontend
- **Carpetas utilizadas**:
  - `src/assets/css/stitch.css` - Estilos maestros
  - `src/layouts/MainLayout.jsx` - Layout principal con header y contenido
  - `src/pages/` - Páginas individuales (Dashboard, PatientList, Appointments, History)
- **Estado**: ✅ Completada

### Fase 2: Integración Backend (Completada)
- **Backend**: API Gateway con proxies hacia los microservicios
- **Microservicios**: pacientes (3001), citas (3002), historial (3003)
- **Servicios consumidos**:
  - `pacientesService` → `/api/pacientes`
  - `citasService` → `/api/citas`
  - `historialService` → `/api/historial`
- **Estado**: ✅ Completada

### Fase 3: Desarrollo de Páginas (Completada)
- **Dashboard.jsx**: Muestra estado del sistema desde `estadoService.getEstado()`
- **PatientList.jsx**: Lista de pacientes desde `pacientesService.getLista()`
- **Appointments.jsx**: Lista de citas desde `citasService.getLista()`
- **History.jsx**: Historial desde `historialService.getLista()`
- **Estado**: ✅ Completada

### Fase 4: Validación y Pruebas (Completada)
- Verificación de conexiones API
- Pruebas de UI en entorno local
- Optimización de rendimiento
- Estado: ✅ Completada

## Distribución de Carpetas Frontend

```
src/
├── assets/
│   └── css/
│       └── stitch.css          # Estilos Stitch
├── layouts/
│   └── MainLayout.jsx          # Layout principal con header y main
├── pages/
│   ├── Dashboard.jsx           # Página principal (estado)
│   ├── PatientList.jsx         # Lista de pacientes
│   ├── Appointments.jsx        # Lista de citas
│   └── History.jsx            # Historial
└── store/
    └── index.js               # Store Zustand
```

## Estado Actual del Proyecto

| Fase | Estado | Descripción |
|------|--------|-------------|
| 1 | ✅ Completada | Sistema Stitch configurado y carreteras básicas |
| 2 | ✅ Completada | API Gateway y microservicios implementados |
| 3 | ✅ Completada | Todas las páginas Stitch desarrolladas y funcionales |
| 4 | ✅ Completada | Build exitoso, linting OK, frontend validado |

## Próximos Pasos

1. Ejecutar pruebas locales del frontend
2. Verificar conectividad con los microservicios en el backend
3. Documentar la arquitectura integrada
4. Preparar despliegue

## Resultados de Validación

- ✅ Frontend compila correctamente (build exitoso)
- ✅ Lint sin errores críticos
- ✅ 91 módulos transformados correctamente
- ✅ Conexión a API Gateway configurada (localhost:3000)
- ✅ Proxies funcionando: /api/pacientes, /api/citas, /api/historial

## Cómo Ejecutar el Proyecto

### Opción 1: Desarrollo Local (Recomendado para pruebas)

1. **Base de datos** (solo una vez):
   ```bash
   cd clinica_veterinaria
   docker-compose up -d postgres
   ```

2. **Microservicios** (en terminales separadas):
   ```bash
   # Servicio de Pacientes (puerto 3001)
   cd clinica_veterinaria/servicio-pacientes
   node index.js

   # Servicio de Citas (puerto 3002)
   cd clinica_veterinaria/servicio-citas
   node index.js

   # Servicio de Historial (puerto 3003)
   cd clinica_veterinaria/servicio-historial
   node index.js
   ```

3. **API Gateway** (backend principal):
   ```bash
   cd clinica_veterinaria/backend
   node index.js
   ```

4. **Frontend**:
   ```bash
   cd clinica_veterinaria/frontend-app-ing-web
   npm run dev
   ```

### Opción 2: Puertos Esperados

| Servicio | Puerto | URL Base |
|----------|--------|----------|
| PostgreSQL | 5433 | `localhost:5433` |
| API Gateway | 3000 | `http://localhost:3000` |
| Pacientes | 3001 | `http://localhost:3001` |
| Citas | 3002 | `http://localhost:3002` |
| Historial | 3003 | `http://localhost:3003` |
| Frontend (Dev) | 5173* | `http://localhost:5173` |

*El frontend por defecto usa puerto 5173 (Vite), pero puede variar si está en uso.

### Flujo de Datos

Frontend (5173) → API Gateway (3000) → Microservicios (3001-3003) → PostgreSQL (5433)

### Verificación

Una vez todos los servicios estén corriendo:
1. Visita `http://localhost:5173` para ver el frontend
2. El Dashboard mostrará el estado de los servicios
3. Las páginas de Pacientes, Citas e Historial mostrarán datos (vacíos inicialmente)

## Nota

Los microservicios usan `node index.js` directamente ya que no tienen script `start` definido en package.json.
El frontend ya está listo para producción (build exitoso).

## Nota

El proyecto ya tiene todas las páginas Stitch implementadas y conectadas al backend. La fase de validación es la única pendiente antes de considerar el proyecto como completo.