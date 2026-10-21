# MyTickets - Gestor de Tickets de Trabajo

Aplicación web full-stack para la gestión eficiente de tickets de trabajo, desarrollada con **Next.js 15** (App Router), **React 19**, **TypeScript**, **MySQL** y **Tailwind CSS v4**.

---

## 🚀 Características Principales

- **Autenticación segura**: Login y registro con JWT almacenado en cookies `httpOnly`, contraseñas hasheadas con bcrypt.
- **Control de acceso basado en roles (RBAC)**: 4 roles predefinidos — `Frontend`, `Backend`, `QA`, `FullStack`.
- **Gestión completa de tickets**:
  - Creación, visualización, actualización de estado y eliminación.
  - Estados: `Activo`, `Pendiente`, `Cerrado`.
  - Tipos de ticket según rol del usuario.
- **Dashboard administrativo** con filtros por estado.
- **Vista personal "Mis Tickets"** en formato tarjetas (cards).
- **Middleware de protección de rutas** — redirige automáticamente según estado de autenticación.
- **UI moderna y responsive** con Tailwind CSS v4 y componentes reutilizables.
- **Server Components** por defecto, Client Components solo donde se necesita interactividad.

---

## 🛠 Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 15.3.1 (App Router, Turbopack) |
| Runtime | React 19.2.8 |
| Lenguaje | TypeScript 5 |
| Base de datos | MySQL 8+ (driver `mysql2`) |
| Autenticación | `jose` (JWT), `bcryptjs` |
| Estilos | Tailwind CSS v4 (PostCSS) |
| Linting | ESLint 9 + `eslint-config-next` |
| Gestor de paquetes | pnpm (workspace configurado) |

---

## 📁 Estructura del Proyecto

```text
MyTickets/
├── app/                          # App Router (Next.js 15)
│   ├── api/auth/
│   │   ├── login/route.ts        # POST /api/auth/login
│   │   └── register/route.ts     # POST /api/auth/register
│   ├── dashboard/
│   │   ├── page.tsx              # Dashboard principal (Server Component)
│   │   └── tickets/page.tsx      # Vista "Mis Tickets" (Server Component)
│   ├── register/page.tsx         # Página de registro
│   ├── page.tsx                  # Página de login (root)
│   ├── layout.tsx                # Layout raíz + metadata SEO/OpenGraph
│   └── globals.css               # Estilos globales + Tailwind imports
├── components/
│   ├── ui/                       # Componentes UI reutilizables
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Label.tsx
│   │   ├── Selector.tsx
│   │   ├── SelectorFilter.tsx
│   │   ├── SelectorUpdate.tsx
│   │   ├── Card.tsx
│   │   ├── DeleteBtn.tsx
│   │   ├── ButtonUpdate.tsx
│   │   ├── ModalTicket.tsx
│   │   ├── ModalAsignar.tsx
│   │   └── TicketStatusUpdater.tsx
│   ├── FormLogin.tsx             # Formulario de login (Client)
│   ├── SigninForm.tsx            # Formulario de registro (Client)
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── DashboardTable.tsx
│   ├── FilterWrapper.tsx
│   ├── AgentCards.tsx
│   └── AsignarBtn.tsx
├── lib/
│   └── db.ts                     # Pool de conexiones MySQL + helper query()
├── middleware.ts                 # Protección de rutas + redirecciones auth
├── styles/                       # CSS Modules por componente/página
│   ├── login.css, signin.css, dashboard.css, ticketspage.css, etc.
├── public/assets/                # Iconos e imágenes estáticas
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

## ⚙️ Instalación y Puesta en Marcha

### Prerrequisitos

- **Node.js** ≥ 20
- **pnpm** ≥ 9 (recomendado) o npm/yarn
- **MySQL** 8.0+ corriendo local o remoto

### 1. Clonar e instalar dependencias

```bash
git clone <url-del-repo>
cd MyTickets
pnpm install
```

### 2. Variables de entorno

Crea un archivo `.env` en la raíz (basado en `.env.example` si existe):

```env
# Base de datos MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=mytickets_db
DB_PORT=3306

# JWT (usa una cadena larga y aleatoria en producción)
JWT_SECRET=super_secreto_cambia_en_produccion

# Entorno
NODE_ENV=development
```

> **Importante**: En producción **debes** cambiar `JWT_SECRET` por un valor seguro y aleatorio (ej. `openssl rand -base64 32`).

### 3. Base de datos

Ejecuta el siguiente SQL para crear las tablas necesarias:

```sql
CREATE DATABASE IF NOT EXISTS mytickets_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mytickets_db;

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('Frontend','Backend','QA','FullStack') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tickets (
    id_ticket INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    asunto VARCHAR(200),
    descripcion TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipo ENUM('Frontend','Backend','QA','FullStack') NOT NULL,
    estado ENUM('Activo','Pendiente','Cerrado') DEFAULT 'Activo',
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);
```

### 4. Ejecutar en desarrollo

```bash
pnpm dev
```

La app estará disponible en **http://localhost:3000**.

### 5. Build y producción

```bash
pnpm build
pnpm start
```

---

## 🔐 Flujo de Autenticación

1. **Registro** (`POST /api/auth/register`)
   - Valida campos, contraseña ≥ 8 caracteres, coincidencia de confirmación.
   - Hashea la contraseña con `bcrypt` (cost 10).
   - Inserta usuario en `usuarios` con rol seleccionado.
   - **No** inicia sesión automáticamente; redirige a `/` para login.

2. **Login** (`POST /api/auth/login`)
   - Busca usuario por correo.
   - Compara contraseña con `bcrypt.compare()`.
   - Genera **JWT firmado (HS256)** con payload: `{ id, nombre, apellido, correo, role }`.
   - Expiración: **2 horas**.
   - Guarda token en cookie `ticket_session` (`httpOnly`, `secure` en prod, `maxAge: 2h`, `path: /`).
   - Responde con datos del usuario (sin contraseña).

3. **Middleware** (`middleware.ts`)
   - Rutas `/dashboard/*` → requieren cookie válida; si no, redirige a `/`.
   - Rutas `/` y `/register` → si hay cookie válida, redirige a `/dashboard`.
   - Token inválido/expirado → borra cookie y redirige a `/`.

---

## 🎫 Endpoints API

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `POST` | `/api/auth/register` | Registrar nuevo usuario | ❌ |
| `POST` | `/api/auth/login` | Iniciar sesión | ❌ |

> Los endpoints de tickets (CRUD) se consumen vía **Server Actions** o `fetch` directo desde Server Components (`lib/db.ts`). No hay rutas `/api/tickets/` expuestas actualmente.

---

## 👥 Roles y Permisos

| Rol | Descripción | Tickets que ve/gestiona |
|-----|-------------|-------------------------|
| **Frontend** | Desarrollo frontend | Tickets tipo `Frontend` |
| **Backend** | Desarrollo backend | Tickets tipo `Backend` |
| **QA** | Quality Assurance | Tickets tipo `QA` |
| **FullStack** | Full Stack | Todos los tipos |

> El rol se selecciona al registrarse y se almacena en `usuarios.rol`. En el dashboard, el filtro y la tabla muestran tickets según el rol del usuario logueado.

---

## 🧰 Scripts Disponibles

```bash
pnpm dev      # Inicia servidor de desarrollo (Turbopack)
pnpm build    # Compila para producción
pnpm start    # Inicia servidor de producción
pnpm lint     # Ejecuta ESLint
```

---

## 🎨 Estilos y UI

- **Tailwind CSS v4** vía `@tailwindcss/postcss` (config en `postcss.config.mjs`).
- **CSS Modules** en `styles/` para estilos específicos por componente/página.
- **Fuentes**: Geist Sans / Geist Mono (Google Fonts, `next/font`).
- **Componentes UI** en `components/ui/` — botones, inputs, selects, modales, tarjetas, badges de estado/tipo.

### Clases de estado (badges)
```css
.status-activo    { /* verde */ }
.status-pendiente { /* amarillo/naranja */ }
.status-cerrado   { /* rojo */ }
```

---

## 🗃️ Esquema de Base de Datos

### `usuarios`
| Columna | Tipo | Restricciones |
|---------|------|---------------|
| id_usuario | INT | PK, AI |
| nombre | VARCHAR(100) | NOT NULL |
| apellido | VARCHAR(100) | NOT NULL |
| correo | VARCHAR(150) | NOT NULL, UNIQUE |
| contrasena | VARCHAR(255) | NOT NULL (bcrypt hash) |
| rol | ENUM | NOT NULL ('Frontend','Backend','QA','FullStack') |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### `tickets`
| Columna | Tipo | Restricciones |
|---------|------|---------------|
| id_ticket | INT | PK, AI |
| id_usuario | INT | FK → usuarios.id_usuario (CASCADE) |
| titulo | VARCHAR(200) | NOT NULL |
| asunto | VARCHAR(200) | NULL |
| descripcion | TEXT | NULL |
| fecha | DATETIME | DEFAULT CURRENT_TIMESTAMP |
| tipo | ENUM | NOT NULL ('Frontend','Backend','QA','FullStack') |
| estado | ENUM | DEFAULT 'Activo' ('Activo','Pendiente','Cerrado') |

---

## 🔧 Configuración Adicional

### TypeScript
- `tsconfig.json` con `paths` (`@/*` → `./*`) y `strict: true`.
- Next.js 15 usa `--experimental-strict-null-checks` en dev.

### ESLint
- `eslint.config.mjs` extiende `eslint-config-next`.
- Ejecutar `pnpm lint` antes de commit.

### pnpm Workspace
- `pnpm-workspace.yaml` configurado para monorepo (útil si añades paquetes internos).

---

## 🚢 Despliegue

### Vercel (Recomendado)
1. Conecta el repo a Vercel.
2. Añade las variables de entorno en **Project Settings → Environment Variables**.
3. Asegúrate de que la BD MySQL sea accesible desde Vercel (usar **Vercel Storage**, **PlanetScale**, **Railway**, **Neon**, o tu propia BD con IP pública/SSL).
4. Deploy automático en cada push a `main`.

### Docker (Opcional)
```dockerfile
# Dockerfile.example
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

---

## 🤝 Contribuir

1. Fork el repo
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m 'feat: descripción'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un **Pull Request**

> Usa *Conventional Commits* (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`).

---

## 📄 Licencia

Proyecto privado — **Astrosoft / Angel Villa**. Todos los derechos reservados.

---

## 👨‍💻 Autor

**Angel Villa** — Desarrollador Full Stack en **Astrosoft**

- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Angel Villa](https://linkedin.com/in/tu-perfil)

---

> **MyTickets** — Organiza tu trabajo, un ticket a la vez. 🎫