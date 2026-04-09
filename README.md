# 📚 Catálogo de Software Libre

Un catálogo web visual de software libre y de código abierto, diseñado para ser compartido y mejorado colaborativamente a través de GitHub.

## 🌐 Ver el Catálogo en Línea

El catálogo está disponible en: **`https://TU-USUARIO.github.io/NOMBRE-REPOSITORIO/`**

## 🚀 Desplegar en GitHub Pages

### Paso 1: Crear un Repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en el botón **"+ "** → **"New repository"**
3. Nombra tu repositorio (ej: `catalogo-software-libre`)
4. Selecciona **"Public"**
5. Haz clic en **"Create repository"**

### Paso 2: Subir los Archivos

**Opción A: Usando GitHub Desktop**

1. Descarga e instala [GitHub Desktop](https://desktop.github.com/)
2. Clona tu repositorio
3. Copia todos los archivos del catálogo en la carpeta del repositorio
4. Haz commit y push

**Opción B: Usando la interfaz web de GitHub**

1. En tu repositorio, haz clic en **"uploading an existing file"**
2. Arrastra todos los archivos del catálogo
3. Haz clic en **"Commit changes"**

### Paso 3: Activar GitHub Pages

1. Ve a **Settings** → **Pages** (en el menú lateral)
2. En **"Source"**, selecciona **"main"** branch
3. Haz clic en **"Save"**
4. Espera unos minutos y tu catálogo estará disponible en:
   ```
   https://TU-USUARIO.github.io/NOMBRE-REPOSITORIO/
   ```

## 📝 Cómo Agregar Nuevo Software con Imagen

### 🎯 Método 1: Usando el Formulario Interactivo (Recomendado y Más Fácil)

¡Ahora puedes agregar software directamente desde la web!

1. **Abre el catálogo** en tu navegador
2. **Haz clic en "Agregar Software"** (botón azul en la parte superior)
3. **Completa el formulario**:
   - Nombre del software
   - Categoría (selecciona del menú desplegable)
   - Descripción
   - Licencia
   - **Imagen**: Pega una URL de imagen (PNG, JPG, SVG, WebP, GIF)
     - La vista previa se muestra automáticamente
   - URLs del sitio web y repositorio (opcionales)
   - Marcar como destacado (opcional)
4. **Haz clic en "Agregar al Catálogo"**
5. **Exporta el JSON**:
   - En el mismo modal, haz clic en **"Exportar JSON"**
   - Se descargará el archivo `catalog.json` actualizado
6. **Actualiza tu repositorio**:
   - Reemplaza el archivo `data/catalog.json` en GitHub
   - Haz commit y push

**¡Listo! El nuevo software aparecerá en el catálogo.**

### 📝 Método 2: Editando el JSON Manualmente

Si prefieres editar el archivo directamente:

1. Ve a tu repositorio en GitHub
2. Navega a `data/catalog.json`
3. Haz clic en el ícono de **lápiz** (Edit this file)
4. Agrega un nuevo objeto al array siguiendo este formato:

## 🖼️ Cómo Agregar Imágenes

### Solo URLs de Imágenes

Para agregar imágenes, simplemente **pega la URL directa** de la imagen en el campo correspondiente del formulario.

**Formatos aceptados**: PNG, JPG, JPEG, SVG, WebP, GIF

### 💡 Dónde Encontrar URLs de Imágenes

1. **Wikimedia Commons**: https://commons.wikimedia.org
   - Haz clic derecho en la imagen → "Copiar dirección de imagen"
   
2. **GitHub del proyecto**:
   - Navega al repositorio → busca archivos como `logo.png`, `icon.svg`
   - Haz clic derecho → "Copy image address"
   
3. **Sitio web oficial**:
   - Muchos proyectos tienen sus logos en la página principal
   
4. **Simple Icons**: https://simpleicons.org
   - Íconos SVG de marcas populares

5. **Cualquier URL pública de imagen**:
   - Asegúrate de que sea un enlace directo a la imagen (termina en .png, .jpg, .svg, etc.)

### Ejemplo de URL de Imagen

```
https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/1200px-Blender_logo_no_text.svg.png
```

### 💾 Importar un Catálogo Existente

Si tienes un archivo `catalog.json` previamente exportado:

1. Haz clic en **"Agregar Software"**
2. En la parte inferior del modal, haz clic en **"Importar JSON"**
3. Selecciona tu archivo `catalog.json`
4. El catálogo se actualizará con todos los elementos importados
5. Exporta el JSON actualizado y reemplázalo en tu repositorio

### ¿Qué pasa si no pongo imagen?

Si no incluyes el campo `"image"` o la URL no es válida, se mostrará una imagen placeholder genérica automáticamente.

### Ejemplo Completo

```json
{
    "id": 16,
    "name": "Visual Studio Code",
    "category": "desarrollo",
    "description": "Editor de código fuente desarrollado por Microsoft.",
    "license": "MIT",
    "url": "https://code.visualstudio.com",
    "repo": "https://github.com/microsoft/vscode",
    "featured": true,
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1200px-Visual_Studio_Code_1.35_icon.svg.png"
}
```

### ¿Qué pasa si no pongo imagen?

Si no incluyes el campo `"image"` o la URL no es válida, se mostrará una imagen placeholder genérica automáticamente.

## 📂 Estructura del Proyecto

```
Catálogo de Software Libre/
├── index.html              # Página principal
├── productividad.html      # Software de productividad
├── desarrollo.html         # Software de desarrollo
├── multimedia.html         # Software multimedia
├── sistemas.html           # Software de sistemas
├── seguridad.html          # Software de seguridad
├── busqueda.html           # Página de búsqueda
├── data/
│   └── catalog.json        # ¡AQUÍ SE AGREGA NUEVO SOFTWARE CON IMÁGENES!
├── images/
│   └── placeholder.svg     # Imagen por defecto
├── logos/                  # (Opcional) Carpeta para logos locales
├── css/
│   └── styles.css          # Estilos
└── js/
    └── main.js             # JavaScript principal
```

## 🏷️ Categorías Disponibles

| Categoría | Descripción |
|-----------|-------------|
| `productividad` | Herramientas de oficina, gestión y colaboración |
| `desarrollo` | IDEs, editores, frameworks y herramientas de programación |
| `multimedia` | Editores de video, audio, imágenes y diseño |
| `sistemas` | Servidores, bases de datos, redes e infraestructura |
| `seguridad` | Firewalls, antivirus, cifrado y análisis de vulnerabilidades |

## 📋 Licencias de Software

Las licencias aceptadas incluyen:
- **GPL** - GNU General Public License
- **MIT** - MIT License
- **Apache 2.0** - Apache License 2.0
- **BSD** - BSD License
- **MPL** - Mozilla Public License
- **AGPL** - GNU Affero General Public License
- **EPL** - Eclipse Public License
- **PostgreSQL** - PostgreSQL License
- **Otra** - Otra licencia libre

## 🤝 Contribuir al Catálogo

### Para agregar software con imagen:

1. Edita `data/catalog.json`
2. Agrega un objeto con esta estructura:

```json
{
    "id": <número único>,
    "name": "<nombre del software>",
    "category": "<categoría>",
    "description": "<descripción breve>",
    "license": "<licencia>",
    "url": "<sitio web oficial>",
    "repo": "<URL del repositorio>",
    "featured": <true o false>,
    "image": "<URL de la imagen o ruta relativa>"
}
```

### Campos obligatorios:
- `id`: Debe ser único y mayor que el último usado
- `name`: Nombre del software
- `category`: Una de las 5 categorías disponibles
- `description`: Descripción breve del software

### Campos opcionales:
- `license`: Tipo de licencia (se asume "Otra" si no se especifica)
- `url`: Sitio web oficial
- `repo`: URL del repositorio de código
- `featured`: Si es `true`, aparecerá en la página principal
- `image`: URL del logo o imagen del software (recomendado)

## 🔍 Funcionalidades

- ✅ **Imágenes**: Cada software puede tener su logo/imagen
- ✅ **Búsqueda**: Busca software por nombre, descripción, categoría o licencia
- ✅ **Filtrado**: Filtra software dentro de cada categoría
- ✅ **Categorías**: 5 categorías organizadas
- ✅ **Software Destacado**: Muestra software destacado en la página principal
- ✅ **Estadísticas**: Contadores automáticos por categoría
- ✅ **Enlaces Directos**: Links a sitios web y repositorios
- ✅ **Diseño Responsivo**: Funciona en móviles, tabletas y escritorio
- ✅ **100% Estático**: No requiere servidor backend, perfecto para GitHub Pages

## 🛠️ Desarrollo Local

Para probar el catálogo localmente:

```bash
# Usando Python 3
cd "Catálogo de Software Libre"
python3 -m http.server 8080

# Luego abre tu navegador en:
# http://localhost:8080
```

O simplemente abre `index.html` directamente en tu navegador.

## 💡 Consejos para Imágenes

1. **URLs de Wikimedia**: Son estables y gratuitas
   - Ejemplo: `https://upload.wikimedia.org/wikipedia/commons/thumb/...`
   
2. **URLs directas**: Asegúrate de que la URL sea accesible públicamente
   - Debe terminar en .png, .jpg, .svg, .webp o .gif
   
3. **Revisar el JSON**: Asegúrate de que el archivo `catalog.json` sea JSON válido antes de hacer commit

4. **ID Único**: Siempre usa un ID mayor que el último utilizado

5. **Comas**: No olvides las comas entre objetos del array

6. **Validación**: Usa un validador JSON como [jsonlint.com](https://jsonlint.com/) si tienes dudas

7. **Vista Previa**: GitHub tiene vista previa para archivos JSON

8. **Imágenes que no cargan**: Si la URL de la imagen no funciona, se mostrará automáticamente una imagen placeholder

## 📄 Licencia

Este proyecto está bajo la licencia que elijas. El catálogo de software es solo un recopilatorio.

## 📞 Soporte

Si tienes problemas:
- Revisa la [documentación de GitHub Pages](https://docs.github.com/es/pages)
- Abre un [issue](https://docs.github.com/es/issues/tracking-your-work-with-issues/about-issues) en el repositorio

---

**¡Comparte y mejora este catálogo con la comunidad de software libre!** 🎉
