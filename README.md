# Javeriana Lead Manager 🎓

Sistema de gestión de leads para programas académicos de la Pontificia Universidad Javeriana. Aplicación web moderna construida con React 19, TypeScript y Tailwind CSS v4.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://javeriana-lead.vercel.app/)
[![Tests](https://img.shields.io/badge/tests-49%20passing-success)](./TESTS_DOCUMENTATION.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)


---

## 🚀 Características

### Funcionalidades Principales (Requeridas)

✅ **Visualización de Programas**
- Grid responsive con tarjetas de programas
- Carga desde API REST (`/programs.json`)
- Estados de loading, error y empty elegantes
- Animaciones suaves en entrada

✅ **Filtrado Avanzado**
- Búsqueda por texto (título, facultad, descripción)
- Filtrado por categoría (Pregrado, Posgrado, Educación Continua)
- Debounce de 250ms para optimizar performance
- Indicador de resultados en tiempo real

✅ **Captura de Leads**
- Formulario modal lateral con validación en tiempo real
- Validación de email institucional (@javeriana.edu.co)
- Normalización de datos (nombres, teléfonos)
- Pantalla de éxito animada
- Cumplimiento Habeas Data (Ley 1581 de 2012)

✅ **Persistencia Local**
- Almacenamiento en `localStorage`
- Sincronización automática
- Recuperación al recargar página
- Manejo robusto de errores

### Funcionalidades Extendidas

✅ **Detalle de Programa**
- Página dedicada con información completa
- Hero section con gradientes y animaciones
- Información extendida: highlights, facultad, valoración
- Sidebar sticky con precio y disponibilidad
- CTA para inscripción directa

✅ **Gestión de Leads**
- Lista completa de leads registrados
- Agrupación por programa
- Estadísticas visuales (total, programas, emails institucionales)
- Eliminación individual con confirmación
- Limpieza masiva de leads
- Empty state con CTA

✅ **Dark Mode**
- Toggle persistente en localStorage
- Transiciones suaves entre modos
- Contraste WCAG 2.1 AA validado
- Sincronización con `prefers-color-scheme`
- Colores OKLCH para mejor consistencia


---

## 🛠 Stack Tecnológico

### Core
- **React 19.2.5** - UI library con nuevas características
- **TypeScript 6.0.2** - Type safety estricto (cero `any`)
- **Vite 8.0.10** - Build tool ultrarrápido
- **React Router DOM 7.15.0** - Navegación declarativa

### Styling
- **Tailwind CSS 4.3.0** - Utility-first con `@theme`
- **@tailwindcss/vite** - Plugin nativo para Vite
- **clsx 2.1.1** - Composición condicional de clases

### State Management
- **Context API + useReducer** - Estado global mínimo
- **Custom Hooks** - Lógica reutilizable

### Testing
- **Vitest 4.1.5** - Test runner ultrarrápido
- **@testing-library/react** - Testing de componentes
- **@testing-library/jest-dom** - Matchers adicionales
- **jsdom** - Ambiente DOM para tests

### Developer Experience
- **ESLint 10.2.1** - Linting con reglas estrictas
- **TypeScript ESLint 8.58.2** - Reglas específicas de TS

---

## 📦 Instalación

### Prerequisitos

- Node.js 18+ 
- npm 9+ o pnpm 8+

### Pasos

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/javeriana-lead.git
cd javeriana-lead

# Instalar dependencias
npm install

# Copiar variables de entorno (opcional)
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con HMR

# Build
npm run build        # Compila TypeScript + Build de producción
npm run preview      # Preview del build de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint en todo el proyecto

# Testing
npm test             # Modo watch (desarrollo)
npm run test:run     # Ejecuta tests una vez
npm run test:ui      # Interfaz visual de tests
npm run test:coverage # Genera reporte de cobertura
```

---

## 🏗 Arquitectura

### Estructura de Carpetas

```
src/
├── assets/              # Recursos estáticos
├── components/
│   ├── atoms/          # Componentes básicos (Button, Input, Badge)
│   ├── molecules/      # Componentes compuestos (SearchBar, FilterPills)
│   ├── organisms/      # Componentes complejos (ProgramCard, LeadForm)
│   ├── layouts/        # Layouts (AppLayout, Sidebar, Topbar)
│   └── router/         # Configuración de rutas
├── context/            # Contextos globales (Leads, Theme)
├── hooks/              # Custom hooks reutilizables
├── pages/              # Páginas/vistas principales
├── services/           # Servicios (API, Storage)
├── types/              # Definiciones TypeScript
├── utils/              # Utilidades (validators, formatters)
├── test/               # Setup de tests
├── App.tsx             # Componente raíz con providers
├── main.tsx            # Entry point
└── index.css           # Tokens de diseño + estilos globales
```
---

## 🧪 Testing

### Casos Destacados

```typescript
// Email institucional
isJaverianaDomain('estudiante@javeriana.edu.co') // ✓

// Normalización con tildes
normalizeName('maría josé pérez') // → 'María José Pérez'

// Búsqueda con acentos
search: 'administración' // Encuentra programas correctamente

// Filtro combinado
{ search: 'ingeniería', category: 'Pregrado' } // → 2 resultados
```

### Ejecutar Tests

```bash
npm test                # Modo watch
npm run test:run        # Una vez
npm run test:coverage   # Con cobertura
```

---

## 🚀 Deployment

### Vercel (Recomendado)

La aplicación está configurada para deployment en Vercel:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

Esto asegura que rutas como `/programa/2` funcionen correctamente al recargar.

### Variables de Entorno

```bash
# .env
VITE_PROGRAMS_API=/programs.json
```

Cambia `VITE_PROGRAMS_API` para apuntar a tu backend cuando esté disponible.

### Build de Producción

```bash
npm run build
npm run preview  # Previsualizar build localmente
```

Los archivos optimizados estarán en `/dist`.

---

## 👨‍💻 Autor

**Stiven Gonzalez Olaya**

- GitHub: [@iamstivgo](https://github.com/iamstivgo)
- LinkedIn: [stivgo](https://linkedin.com/in/tu-perfil)
- Email: stiveng0630@gmail.com

---
---

<div align="center">
  <p>Hecho con ❤️ y ☕ para la Pontificia Universidad Javeriana</p>
  <p>Mayo 2026</p>
</div>
