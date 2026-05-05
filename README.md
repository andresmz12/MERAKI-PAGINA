# Meraki Real Estate

Sitio web inmobiliario completo para Meraki Real Estate, una inmobiliaria colombiana.

## Stack técnico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Base de datos**: PostgreSQL vía Prisma ORM
- **Autenticación**: NextAuth.js v5 (credentials)
- **Imágenes**: Cloudinary
- **Estilos**: Tailwind CSS
- **Deploy**: Railway

## Configuración local

### 1. Clonar e instalar dependencias

```bash
git clone <repo-url>
cd meraki-real-estate
npm install
```

### 2. Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

```bash
cp .env.example .env.local
```

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | URL de conexión PostgreSQL |
| `NEXTAUTH_SECRET` | Genera con `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL base (ej: `http://localhost:3000`) |
| `CLOUDINARY_CLOUD_NAME` | Nombre de tu cloud en Cloudinary |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Igual que CLOUDINARY_CLOUD_NAME |
| `ADMIN_EMAIL` | Email del admin inicial |
| `ADMIN_PASSWORD` | Contraseña del admin inicial |
| `ADMIN_NOMBRE` | Nombre del admin inicial |

### 3. Base de datos

```bash
# Ejecutar migraciones
npx prisma migrate dev --name init

# Poblar con datos iniciales
npm run seed
```

### 4. Correr en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver el sitio.
Panel admin en [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

## Deploy en Railway

### 1. Crear proyecto en Railway

1. Crea un nuevo proyecto en [railway.app](https://railway.app)
2. Agrega un servicio **PostgreSQL** — Railway provee `DATABASE_URL` automáticamente
3. Conecta tu repositorio de GitHub

### 2. Variables de entorno en Railway

En el servicio de la app, configura todas las variables de `.env.example` en la sección **Variables**.

```
NEXTAUTH_URL=https://tu-dominio.railway.app
NEXTAUTH_SECRET=<genera-con-openssl-rand-base64-32>
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
ADMIN_EMAIL=admin@meraki.com
ADMIN_PASSWORD=<contraseña-segura>
ADMIN_NOMBRE=Administrador
```

### 3. Script de build

Railway ejecutará automáticamente:

```bash
npm install       # instala deps
prisma generate   # genera cliente Prisma (via postinstall)
next build        # build de producción
```

### 4. Migración y seed en producción

En el shell de Railway:

```bash
npx prisma migrate deploy
npm run seed
```

### 5. Healthcheck

Railway puede usar `/api/health` como endpoint de healthcheck.

## Estructura del proyecto

```
app/
├── (public)/              # Sitio público
│   ├── page.tsx           # Home
│   ├── propiedades/       # Listado y detalle
│   └── contacto/          # Contacto
├── admin/                 # Panel admin (protegido)
│   ├── login/
│   ├── dashboard/
│   └── propiedades/
└── api/                   # API routes
    ├── auth/
    ├── propiedades/
    ├── upload/
    └── health/
components/
├── public/                # Navbar, Footer, PropertyCard, etc.
└── admin/                 # AdminSidebar, PropertyForm, ImageUploader
lib/
├── auth.ts                # NextAuth config
├── cloudinary.ts          # Cloudinary helpers
├── prisma.ts              # Prisma singleton
├── slug.ts                # Slug generation (server-only)
└── utils.ts               # Formatters (client-safe)
prisma/
├── schema.prisma          # Schema de BD
└── seed.ts                # Script de seed
```

## Funcionalidades

### Sitio público
- **Home**: Hero con buscador, propiedades destacadas, sección "¿Por qué Meraki?", estadísticas, formulario de contacto
- **Propiedades**: Listado con filtros (tipo, operación, ciudad, precio), paginación
- **Detalle**: Galería de imágenes con lightbox, características, formulario de contacto, CTA de WhatsApp
- **Contacto**: Información de contacto + formulario

### Panel admin (`/admin`)
- **Login**: Autenticación con email/contraseña
- **Dashboard**: Tabla de propiedades con estadísticas
- **Nueva/Editar propiedad**: Formulario completo con subida de imágenes drag & drop

## Credenciales de prueba

Después del seed, usa las credenciales configuradas en `.env.local`:
- Email: valor de `ADMIN_EMAIL`
- Password: valor de `ADMIN_PASSWORD`
