# 🎮 Pokédex React Avanzada

Una Pokédex interactiva y completa construida con React + Vite, consumiendo datos en tiempo real de la [PokéAPI](https://pokeapi.co).

## ✨ Características Principales

### 📖 Exploración de Pokémon

- **Datos en tiempo real** desde PokéAPI
- **Paginación dinámica** con más de 1000 Pokémon
- **Búsqueda inteligente** por nombre
- **Filtros avanzados**:
  - Múltiples tipos simultáneos
  - Rango de generaciones
  - Estadísticas mínimas (HP, Ataque)
  - Guardado de filtros favoritos

### 🔍 Detalles Completos

Al hacer clic en cualquier Pokémon, verás:

- Imagen oficial de alta calidad
- Descripción de la Pokédex
- Estadísticas base completas con barras de progreso
- Cadena evolutiva visual
- Habilidades (normales y ocultas)
- Primeros 10 movimientos
- Información física (altura, peso)
- Generación y hábitat

### ⭐ Sistema de Favoritos

- Marca tus Pokémon favoritos
- Vista dedicada de favoritos
- Exportación de lista en JSON
- Persistencia local

### ⚔️ Comparador de Pokémon

- Compara 2-3 Pokémon lado a lado
- Visualización de estadísticas
- Análisis de ventajas por tipo
- Comparación de características físicas

### 🎒 Constructor de Equipos

- Crea equipos de hasta 6 Pokémon
- Análisis automático de cobertura de tipos
- Guarda múltiples equipos con nombres
- Carga equipos guardados
- Sugerencias de mejora

### 🌓 Modo Oscuro/Claro

- Cambio instantáneo de tema
- Colores adaptados a la paleta Pokémon
- Persistencia de preferencia
- Diseño optimizado para ambos modos

### 📝 Registro de Entrenadores

- Formulario multipaso profesional
- Validación en cada paso
- Registro de preferencias Pokémon
- Guardado de progreso

### 💾 Persistencia de Datos

Todo se guarda localmente:

- Pokémon capturados
- Favoritos
- Equipos guardados
- Filtros personalizados
- Preferencia de tema

## 🚀 Tecnologías Utilizadas

- **React 19** con Hooks
- **Vite** para desarrollo rápido
- **PokéAPI** para datos reales
- **Context API** para gestión de estado global
- **LocalStorage** para persistencia
- **CSS-in-JS** para estilos dinámicos

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <tu-repositorio>

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🎯 Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── PokemonCard.jsx
│   ├── PokemonDetailModal.jsx
│   ├── AdvancedFilters.jsx
│   ├── PokemonComparison.jsx
│   ├── FavoritesList.jsx
│   ├── TeamBuilder.jsx
│   ├── FormMultiStep.jsx
│   └── ...
├── context/          # Context API
│   └── ThemeContext.jsx
├── hooks/            # Hooks personalizados
│   ├── usePokemonData.js
│   ├── usePokemonDetail.js
│   ├── useLocalStorage.js
│   └── useTheme.js
├── utils/            # Utilidades
│   ├── getColorByType.js
│   ├── getBackgroundByTypes.js
│   └── typeEffectiveness.js
├── views/            # Vistas principales
│   └── Dashboard.jsx
├── App.jsx
└── main.jsx
```

## 🎨 Características Técnicas

### Hooks Personalizados

**`usePokemonData(limit, offset)`**

- Consume PokéAPI con paginación
- Manejo de estados de carga y error
- Formateo automático de datos

**`usePokemonDetail(pokemonId)`**

- Obtiene detalles completos de un Pokémon
- Procesa cadena evolutiva
- Traduce descripciones al español

**`useLocalStorage(key, initialValue)`**

- Sincronización automática con localStorage
- Manejo de errores
- Tipado seguro

**`useTheme()`**

- Acceso al contexto de tema
- Colores dinámicos según modo
- Toggle de tema

### Optimizaciones

- Caché de datos de PokéAPI
- Renderizado condicional inteligente
- Lazy loading de imágenes
- Paginación eficiente
- LocalStorage para evitar llamadas innecesarias

## 📱 Responsive Design

La aplicación es completamente responsive y funciona perfectamente en:

- 📱 Móviles
- 📱 Tablets
- 💻 Desktops
- 🖥️ Pantallas grandes

## 🤝 Contribuciones

Este es un proyecto educativo. ¡Las sugerencias y mejoras son bienvenidas!

## 📄 Licencia

Proyecto de práctica educativa. Datos proporcionados por [PokéAPI](https://pokeapi.co).

## 🙏 Créditos

- **PokéAPI**: Por proporcionar los datos
- **The Pokémon Company**: Por los diseños originales
- **Nintendo**: Por la franquicia Pokémon

---

**Desarrollado con ⚡ por [Tu Nombre]**
