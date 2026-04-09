# 📚 Catálogo de Software Libre

Bienvenido al wiki oficial del **Catálogo de Software Libre** – una plataforma web interactiva para explorar, descubrir y gestionar software libre y de código abierto.

---

## 🌐 ¿Qué es?

El Catálogo de Software Libre es una aplicación web **100% estática** diseñada para ser alojada en **GitHub Pages**. Permite a los usuarios:

- 🔍 **Buscar** software por nombre, descripción, categoría o licencia
- 📂 **Explorar** 5 categorías organizadas de software
- ➕ **Agregar** nuevo software mediante un formulario interactivo
- ⭐ **Guardar favoritos** para acceso rápido
- 📊 **Ver estadísticas** detalladas con gráficos interactivos
- 🌓 **Cambiar entre tema claro y oscuro**
- 🖼️ **Ver imágenes/logos** de cada software
- 📱 **Acceder desde cualquier dispositivo** (diseño responsivo)

---

## 🚀 Despliegue Rápido

### Paso 1: Crear el Repositorio

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en **"+ "** → **"New repository"**
3. Nómbralo: `catalogo-de-software-libre`
4. Selecciona **"Public"**
5. Haz clic en **"Create repository"**

### Paso 2: Subir los Archivos

**Opción A – GitHub Desktop:**
1. Clona tu repositorio con GitHub Desktop
2. Copia todos los archivos del catálogo
3. Haz commit y push

**Opción B – Interfaz Web:**
1. Haz clic en **"uploading an existing file"**
2. Arrastra todos los archivos y carpetas
3. Haz clic en **"Commit changes"**

### Paso 3: Activar GitHub Pages

1. Ve a **Settings** → **Pages** (menú lateral)
2. En **Source**, selecciona la rama **main**
3. Haz clic en **"Save"**
4. Espera 2-5 minutos
5. Tu catálogo estará disponible en:
   ```
   https://TU-USUARIO.github.io/catalogo-de-software-libre/
   ```

---

## 📂 Estructura del Proyecto

```
Catálogo de Software Libre/
├── index.html                    # Página principal
├── productividad.html            # Categoría: Productividad
├── desarrollo.html               # Categoría: Desarrollo
├── multimedia.html               # Categoría: Multimedia
├── sistemas.html                 # Categoría: Sistemas
├── seguridad.html                # Categoría: Seguridad
├── busqueda.html                 # Página de búsqueda
├── README.md                     # Documentación del proyecto
├── data/
│   └── catalog.json              # 📦 BASE DE DATOS DEL CATÁLOGO
├── images/
│   └── placeholder.svg           # Imagen por defecto
├── css/
│   ├── styles.css                # Estilos principales (tema oscuro/claro)
│   ├── animations.css            # Animaciones de fondo futuristas
│   └── features.css              # Estilos de features (favoritos, charts, etc.)
└── js/
    ├── main.js                   # Lógica principal del catálogo
    ├── theme-toggle.js           # Cambio de tema claro/oscuro
    ├── favorites.js              # Sistema de favoritos
    ├── scroll-animations.js      # Animaciones al scroll
    └── charts-filters.js         # Gráficos Chart.js + filtros avanzados
```

---

## 📝 Cómo Agregar Nuevo Software

### Método 1: Formulario Interactivo (Recomendado)

1. Abre el catálogo en tu navegador
2. Haz clic en **"Agregar Software"** (botón azul)
3. Completa el formulario:
   - **Nombre** del software
   - **Categoría** (Productividad, Desarrollo, Multimedia, Sistemas, Seguridad)
   - **Descripción** breve
   - **Licencia** (GPL, MIT, Apache 2.0, BSD, MPL, AGPL, etc.)
   - **URL de imagen** (logo del software)
   - **URL del sitio web** (opcional)
   - **URL del repositorio** (opcional)
   - **Marcar como destacado** (opcional)
4. Haz clic en **"Agregar al Catálogo"**
5. Haz clic en **"Exportar JSON"** (en la parte inferior del modal)
6. Se descargará el archivo `catalog.json` actualizado
7. Reemplaza `data/catalog.json` en tu repositorio
8. Haz commit y push

### Método 2: Editar JSON Manualmente

1. Abre `data/catalog.json` en tu editor
2. Agrega un nuevo objeto al array:

```json
{
    "id": 16,
    "name": "Nombre del Software",
    "category": "desarrollo",
    "description": "Breve descripción del software.",
    "license": "MIT",
    "url": "https://sitio-oficial.com",
    "repo": "https://github.com/usuario/repo",
    "featured": true,
    "image": "https://ejemplo.com/logo.png"
}
```

3. Guarda, haz commit y push

---

## 🏷️ Categorías Disponibles

| Categoría | Descripción | Ejemplos |
|-----------|-------------|----------|
| **Productividad** | Herramientas de oficina, gestión y colaboración | LibreOffice, Thunderbird, Nextcloud |
| **Desarrollo** | IDEs, editores, frameworks y herramientas de programación | VS Code, Git, Eclipse |
| **Multimedia** | Editores de video, audio, imágenes y diseño | GIMP, Blender, Inkscape, Audacity |
| **Sistemas** | Servidores, bases de datos, redes e infraestructura | Apache, PostgreSQL, Nginx |
| **Seguridad** | Firewalls, antivirus, cifrado y análisis | ClamAV, Wireshark |

---

## 🖼️ Cómo Agregar Imágenes

Las imágenes se agregan mediante **URLs directas** de imágenes (PNG, JPG, SVG, WebP, GIF).

### Fuentes Recomendadas para Logos

| Fuente | URL | Notas |
|--------|-----|-------|
| **Wikimedia Commons** | https://commons.wikimedia.org | Haz clic derecho → "Copiar dirección de imagen" |
| **Simple Icons CDN** | https://cdn.simpleicons.org/nombre | Ejemplo: `https://cdn.simpleicons.org/git` |
| **GitHub del Proyecto** | Repositorio oficial | Busca archivos como `logo.png`, `icon.svg` |
| **Sitio Web Oficial** | Página oficial del software | Copia la URL del logo directamente |

### Ejemplo con Simple Icons

```
https://cdn.simpleicons.org/libreoffice
https://cdn.simpleicons.org/blender
https://cdn.simpleicons.org/postgresql
```

---

## ✨ Características Principales

### 🌓 Modo Claro/Oscuro
- Botón flotante en la esquina inferior derecha
- Preferencia guardada en localStorage
- Los gráficos se adaptan automáticamente al tema

### ⭐ Sistema de Favoritos
- Clic en el ícono de corazón (♡) en cualquier tarjeta
- Sección "Mis Favoritos" en la página principal
- Persiste entre sesiones (localStorage)

### 📊 Estadísticas con Gráficos
- **Gráfico de Dona**: Distribución por categoría
- **Gráfico de Barras**: Software por licencia
- **Gráfico de Pastel**: Destacados vs No Destacados
- Usa Chart.js desde CDN

### 🔍 Filtros Avanzados
- Filtrar por categoría, licencia, destacado
- Búsqueda por nombre o descripción
- Tags de filtros activos con opción de eliminar

### ✨ Animaciones
- **Fondo futurista**: Partículas, circuitos, hexágonos, ondas de energía
- **Scroll animations**: Elementos aparecen con fade-in al desplazarse
- **Hero animado**: Núcleo de energía, líneas de datos, shimmer de texto

### 📱 Diseño Responsivo
- Funciona en móviles, tabletas y escritorio
- Media queries optimizadas
- Gráficos adaptables

---

## 🛠️ Desarrollo Local

Para probar el catálogo localmente:

```bash
# Navega al directorio del proyecto
cd "Catálogo de Software Libre"

# Inicia un servidor local con Python 3
python3 -m http.server 8080

# Abre tu navegador en:
# http://localhost:8080
```

O simplemente abre `index.html` directamente en tu navegador.

---

## 🔧 Tecnologías Utilizadas

| Tecnología | Uso |
|-----------|-----|
| **HTML5** | Estructura semántica |
| **CSS3** | Estilos, gradientes, animaciones, glassmorphism |
| **JavaScript (ES6+)** | Lógica interactiva, manipulación del DOM |
| **Chart.js** | Gráficos estadísticos interactivos |
| **Font Awesome** | Iconografía |
| **Google Fonts (Inter)** | Tipografía moderna |
| **GitHub Pages** | Hosting gratuito |
| **Simple Icons** | Logos de software por CDN |

---

## 📋 Formato de Datos (catalog.json)

Cada entrada del catálogo sigue esta estructura:

```json
{
    "id": 1,
    "name": "LibreOffice",
    "category": "productividad",
    "description": "Suite de oficina completa...",
    "license": "MPL",
    "url": "https://www.libreoffice.org",
    "repo": "https://github.com/TheDocumentFoundation/LibreOffice",
    "featured": true,
    "image": "https://cdn.simpleicons.org/libreoffice"
}
```

### Campos

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | número | ✅ Sí | Identificador único (debe ser mayor que el último) |
| `name` | string | ✅ Sí | Nombre del software |
| `category` | string | ✅ Sí | Una de las 5 categorías |
| `description` | string | ✅ Sí | Descripción breve |
| `license` | string | ❌ No | Tipo de licencia |
| `url` | string | ❌ No | Sitio web oficial |
| `repo` | string | ❌ No | URL del repositorio |
| `featured` | boolean | ❌ No | Si aparece en destacados |
| `image` | string | ❌ No | URL de la imagen/logo |

---

## 🤝 Cómo Contribuir

1. **Haz un Fork** del repositorio
2. **Crea una Branch** para tu cambio (`git checkout -b feature/NuevoSoftware`)
3. **Agrega software** editando `data/catalog.json`
4. **Haz Commit** de tus cambios (`git commit -m 'Agregar: Nombre del Software'`)
5. **Haz Push** a la branch (`git push origin feature/NuevoSoftware`)
6. **Abre un Pull Request**

### Guía de Contribución

- ✅ Usa URLs de imágenes accesibles públicamente
- ✅ Verifica que el JSON sea válido (usa [jsonlint.com](https://jsonlint.com/))
- ✅ Usa IDs únicos y consecutivos
- ✅ Sigue el formato existente
- ✅ Descripciones breves y claras (máx. 200 caracteres)

---

## 💡 Consejos Útiles

### Para Validar JSON
```
https://jsonlint.com/
```
Pega el contenido de `catalog.json` para verificar que sea válido.

### Para Encontrar Logos
```
https://cdn.simpleicons.org/[nombre-en-minusculas]
```
Ejemplos:
- `https://cdn.simpleicons.org/git`
- `https://cdn.simpleicons.org/docker`
- `https://cdn.simpleicons.org/vscode`

### Para Reducir Peso de Imágenes
```
https://tinypng.com/
```
Comprime imágenes PNG/JPG antes de subirlas.

---

## 📊 Software Incluido

El catálogo viene precargado con **15 software populares**:

| # | Software | Categoría | Licencia |
|---|----------|-----------|----------|
| 1 | LibreOffice | Productividad | MPL |
| 2 | GIMP | Multimedia | GPL |
| 3 | VSCodium | Desarrollo | MIT |
| 4 | Blender | Multimedia | GPL |
| 5 | Apache | Sistemas | Apache 2.0 |
| 6 | PostgreSQL | Sistemas | PostgreSQL |
| 7 | ClamAV | Seguridad | GPL |
| 8 | Inkscape | Multimedia | GPL |
| 9 | Git | Desarrollo | GPL |
| 10 | Thunderbird | Productividad | MPL |
| 11 | Nginx | Sistemas | BSD |
| 12 | Wireshark | Seguridad | GPL |
| 13 | Nextcloud | Productividad | AGPL |
| 14 | Eclipse IDE | Desarrollo | EPL |
| 15 | Audacity | Multimedia | GPL |

---

## 🔗 Enlaces Útiles

| Recurso | URL |
|---------|-----|
| **Open Source Initiative** | https://opensource.org |
| **Free Software Foundation** | https://www.fsf.org |
| **Simple Icons** | https://simpleicons.org |
| **Wikimedia Commons** | https://commons.wikimedia.org |
| **GitHub Pages Docs** | https://docs.github.com/es/pages |
| **Chart.js** | https://www.chartjs.org |
| **Font Awesome** | https://fontawesome.com |
| **Google Fonts (Inter)** | https://fonts.google.com/specimen/Inter |

---

## 📄 Licencia

Este proyecto es un catálogo recopilatorio. Cada software listado mantiene su propia licencia de código abierto.

---

## 📞 Soporte

Si tienes problemas o preguntas:

- 📖 Revisa la [documentación de GitHub Pages](https://docs.github.com/es/pages)
- 🐛 Abre un [Issue](https://docs.github.com/es/issues/tracking-your-work-with-issues/about-issues) en el repositorio
- 💬 Consulta la [comunidad de GitHub](https://github.community/)

---

**¡Comparte y mejora este catálogo con la comunidad de software libre!** 🎉

*Última actualización: Abril 2026*
