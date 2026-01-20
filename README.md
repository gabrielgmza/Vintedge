# 🍷 Vintedge

**Premium Wine Customization Platform**

Plataforma e-commerce B2C para personalización ultra-premium de vinos con envío global.

## 🏗️ Arquitectura

```
vintedge/
├── apps/
│   ├── web/          # Frontend Next.js 14
│   └── api/          # Backend NestJS
├── packages/
│   ├── shared/       # Tipos TypeScript compartidos
│   ├── database/     # Schemas Prisma + migraciones
│   └── config/       # Configuraciones compartidas
└── infrastructure/   # Scripts GCP / IaC
```

## 🛠️ Tech Stack

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js 14, TypeScript, TailwindCSS, Konva.js |
| Backend | NestJS, TypeScript, Prisma |
| Base de Datos | PostgreSQL (Cloud SQL), Firestore |
| Auth | Firebase Authentication |
| Pagos | Stripe |
| AI | Google Gemini API |
| Cloud | Google Cloud Platform |
| CI/CD | Cloud Build |

## 🚀 Quick Start

### Prerrequisitos

- Node.js >= 20
- pnpm >= 8
- Docker (opcional, para desarrollo local)

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/your-org/vintedge.git
cd vintedge

# Instalar dependencias
pnpm install

# Copiar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Desarrollo
pnpm dev
```

## 📦 Scripts

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia todos los servicios en modo desarrollo |
| `pnpm build` | Build de producción |
| `pnpm test` | Ejecuta tests |
| `pnpm lint` | Linter |
| `pnpm typecheck` | Verificación de tipos |
| `pnpm db:migrate` | Ejecuta migraciones de BD |
| `pnpm db:seed` | Seed de datos iniciales |

## 🌍 Mercados Soportados

- 🇨🇦 Canadá
- 🇺🇸 Estados Unidos
- 🇲🇽 México
- 🇨🇴 Colombia
- 🇧🇷 Brasil
- 🇨🇱 Chile
- 🇦🇷 Argentina
- 🇬🇧 Reino Unido
- 🇳🇱 Países Bajos
- 🇮🇳 India
- 🇯🇵 Japón

## 🌐 Idiomas

- English (default)
- Español
- Português
- हिन्दी (Hindi)
- 日本語 (Japonés)

## 📄 Licencia

Propietario - Todos los derechos reservados.

---

**Vintedge** - Crafting Unique Wine Experiences 🍷
