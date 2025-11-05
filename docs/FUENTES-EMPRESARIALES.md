# 🔤 Guía de Fuentes Empresariales

## Fuentes Recomendadas para Aplicaciones Empresariales

### 1. **IBM Plex Sans** ⭐ (Actualmente en uso)
- **Uso**: Diseñada por IBM, profesional y moderna
- **Características**: Excelente legibilidad, múltiples pesos, geométrica
- **Ideal para**: Aplicaciones corporativas, dashboards, interfaces empresariales
- **Combina con**: IBM Plex Mono (para código), IBM Plex Serif (para títulos)

```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

### 2. **Inter**
- **Uso**: Diseñada específicamente para pantallas digitales
- **Características**: Alturas x grandes, espaciado optimizado
- **Usada por**: GitHub, Notion, Mozilla, Stripe
- **Ideal para**: UIs modernas, textos pequeños, tablas de datos

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

### 3. **Roboto**
- **Uso**: Fuente del sistema de Material Design de Google
- **Características**: Limpia, mecánica, amigable
- **Usada por**: Android, Google, YouTube
- **Ideal para**: Aplicaciones web, móviles, formularios

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
```

---

### 4. **Open Sans**
- **Uso**: Una de las fuentes más populares de Google Fonts
- **Características**: Neutral, amigable, muy legible
- **Usada por**: WordPress.com, LinkedIn
- **Ideal para**: Contenido extenso, blogs corporativos

```html
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
```

---

### 5. **Montserrat**
- **Uso**: Geométrica inspirada en los carteles urbanos
- **Características**: Moderna, elegante, versátil
- **Ideal para**: Títulos, branding, aplicaciones de diseño

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

### 6. **Source Sans Pro**
- **Uso**: Primera familia tipográfica open source de Adobe
- **Características**: Profesional, clara, bien espaciada
- **Ideal para**: Documentación técnica, aplicaciones SaaS

```html
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap" rel="stylesheet">
```

---

### 7. **Work Sans**
- **Uso**: Optimizada para pantallas
- **Características**: Geométrica, moderna, minimalista
- **Ideal para**: Interfaces limpias, aplicaciones minimalistas

```html
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

### 8. **Poppins**
- **Uso**: Geométrica con personalidad
- **Características**: Redonda, amigable, moderna
- **Ideal para**: Startups, aplicaciones creativas, marketing

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

### 9. **Lato**
- **Uso**: Semi-redondeada con calidez
- **Características**: Seria pero amigable, muy legible
- **Ideal para**: Corporativos que buscan calidez

```html
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
```

---

### 10. **Nunito**
- **Uso**: Redondeada y balanceada
- **Características**: Amigable, accesible, moderna
- **Ideal para**: Aplicaciones educativas, dashboards

```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet">
```

---

## 🎨 Cómo Cambiar la Fuente en Tu Aplicación

### Opción 1: Editar `index.html`

Reemplaza la línea actual en `client/public/index.html`:

```html
<!-- Cambiar de IBM Plex Sans a Inter -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Opción 2: Editar `variables.css`

Actualiza la variable en `client/src/css/variables.css`:

```css
/* De esto: */
--font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;

/* A esto (ejemplo con Inter): */
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

## 💡 Combinaciones Recomendadas

### Clásica y Profesional
- **Títulos**: Montserrat Bold
- **Cuerpo**: Open Sans Regular
- **Código**: Fira Code

### Moderna y Tech
- **Títulos**: Inter Bold
- **Cuerpo**: Inter Regular
- **Código**: JetBrains Mono

### Corporativa Seria
- **Títulos**: IBM Plex Sans Bold
- **Cuerpo**: IBM Plex Sans Regular
- **Código**: IBM Plex Mono

### Amigable y Accesible
- **Títulos**: Poppins SemiBold
- **Cuerpo**: Nunito Regular
- **Código**: Source Code Pro

---

## 📊 Comparativa Rápida

| Fuente | Personalidad | Legibilidad | Modernidad | Uso Ideal |
|--------|-------------|-------------|------------|-----------|
| IBM Plex Sans | Profesional | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Corporativo |
| Inter | Técnica | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | SaaS/Tech |
| Roboto | Neutral | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Apps móviles |
| Montserrat | Elegante | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Branding |
| Poppins | Amigable | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Startups |

---

**Recomendación Final**: IBM Plex Sans es una excelente elección para tu aplicación empresarial. Si buscas algo más moderno y tech, considera **Inter**. Para algo más amigable, prueba **Poppins**.
