# Framework Guide

Detailed comparison and usage guide for all supported frameworks in Boil CLI.

## Quick Comparison

| Framework       | Size    | Learning Curve | Use Case               | Components |
| --------------- | ------- | -------------- | ---------------------- | ---------- |
| **Bootstrap**   | ~200KB  | Easy           | Rapid prototyping      | 50+        |
| **Tailwind**    | ~50KB\* | Medium         | Custom designs         | Utilities  |
| **Materialize** | ~180KB  | Easy           | Material Design        | 40+        |
| **Skeleton**    | ~11KB   | Very Easy      | Minimal projects       | Basic      |
| **DaisyUI**     | ~30KB\* | Easy           | Tailwind + Components  | 50+        |
| **HTML5**       | Custom  | Very Easy      | Learning, Full control | DIY        |
| **Vanilla**     | Custom  | Very Easy      | Custom from scratch    | DIY        |

\*With Tailwind CSS base

## Bootstrap 5

### When to Use

- Need ready-made components quickly
- Building admin dashboards
- Client projects with tight deadlines
- Team familiar with Bootstrap

### Pros

- ✅ Extensive component library
- ✅ Excellent documentation
- ✅ Large community
- ✅ Mobile-first by default
- ✅ Easy customization with Sass

### Cons

- ❌ Larger file size
- ❌ Opinionated design
- ❌ Can look "Bootstrap-y"
- ❌ May include unused CSS

### Getting Started

```bash
boil new myapp --framework bootstrap --with-js
```

### Customization

```css
/* Override Bootstrap variables */
:root {
    --bs-primary: #your-color;
    --bs-font-sans-serif: 'Your Font', sans-serif;
}
```

### Common Patterns

```html
<!-- Responsive Grid -->
<div class="container">
    <div class="row">
        <div class="col-md-6">Column 1</div>
        <div class="col-md-6">Column 2</div>
    </div>
</div>

<!-- Utility Classes -->
<div class="mt-4 p-3 bg-primary text-white rounded">Content</div>
```

---

## Tailwind CSS

### When to Use

- Need complete design freedom
- Building custom UI
- Performance is critical
- Design system from scratch

### Pros

- ✅ Utility-first approach
- ✅ Highly customizable
- ✅ Small production builds
- ✅ No opinionated design
- ✅ JIT compilation

### Cons

- ❌ Steeper learning curve
- ❌ HTML can get verbose
- ❌ Need build step for production
- ❌ No pre-built components

### Getting Started

```bash
boil new myapp --framework tailwind --with-js
```

### Configuration

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: '#your-color',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
};
```

### Common Patterns

```html
<!-- Responsive Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>Column 1</div>
    <div>Column 2</div>
</div>

<!-- Utility Classes -->
<div class="mt-4 p-3 bg-blue-600 text-white rounded-lg">Content</div>
```

---

## Materialize CSS

### When to Use

- Want Material Design
- Google-style interfaces
- Need smooth animations
- Forms with validation

### Pros

- ✅ Beautiful Material Design
- ✅ Smooth animations
- ✅ Icon library included
- ✅ Good documentation
- ✅ Form helpers

### Cons

- ❌ Less actively maintained
- ❌ jQuery dependency (removed in 1.0.0)
- ❌ Smaller community
- ❌ Limited customization

### Getting Started

```bash
boil new myapp --framework materialize --with-js
```

### JavaScript Initialization

```javascript
// Required for interactive components
document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit(); // Auto-initialize all components

    // Or initialize individually
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.Modal.init(document.querySelectorAll('.modal'));
});
```

---

## Skeleton

### When to Use

- Small projects
- Landing pages
- Don't need heavy framework
- Want fast loading

### Pros

- ✅ Tiny file size (~11KB)
- ✅ No dependencies
- ✅ Easy to learn
- ✅ Fast loading
- ✅ Simple customization

### Cons

- ❌ Basic components only
- ❌ No JavaScript
- ❌ Limited utilities
- ❌ Small community

### Getting Started

```bash
boil new myapp --framework skeleton
```

### Grid System

```html
<div class="container">
    <div class="row">
        <div class="six columns">Half</div>
        <div class="six columns">Half</div>
    </div>
</div>
```

---

## DaisyUI

### When to Use

- Love Tailwind but want components
- Need theme support
- Building quickly with utility classes
- Want semantic class names

### Pros

- ✅ Best of both worlds (Tailwind + components)
- ✅ Multiple themes
- ✅ No JavaScript required
- ✅ Semantic classes
- ✅ Dark mode built-in

### Cons

- ❌ Requires Tailwind CSS
- ❌ Learning two systems
- ❌ Adds to bundle size

### Getting Started

```bash
boil new myapp --framework daisyui --with-js
```

### Theme System

```html
<html data-theme="dark">
    <!-- or -->
    <html data-theme="cupcake"></html>
</html>
```

### Components

```html
<!-- Semantic classes -->
<button class="btn btn-primary">Button</button>
<div class="card">Card content</div>
<div class="navbar">Navbar</div>
```

---

## HTML5 / Vanilla

### When to Use

- Learning web development
- Don't want framework overhead
- Need complete control
- Custom design system

### Pros

- ✅ No dependencies
- ✅ Full control
- ✅ Fastest loading
- ✅ Learn fundamentals
- ✅ No breaking changes

### Cons

- ❌ More work upfront
- ❌ Build components yourself
- ❌ No ready-made utilities
- ❌ Longer development time

### Getting Started

```bash
boil new myapp --framework html5 --with-js
```

### CSS Variables

```css
:root {
    /* Define your design system */
    --primary-color: #3b82f6;
    --spacing-unit: 8px;
    --font-family: system-ui, sans-serif;
}

.button {
    background: var(--primary-color);
    padding: calc(var(--spacing-unit) * 2);
}
```

## Migration Guide

### From Bootstrap to Tailwind

```html
<!-- Bootstrap -->
<div class="container">
    <div class="row">
        <div class="col-md-6 mt-4">Content</div>
    </div>
</div>

<!-- Tailwind -->
<div class="container mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="mt-4">Content</div>
    </div>
</div>
```

### From Tailwind to DaisyUI

Just add DaisyUI - it extends Tailwind! Use semantic components where available:

```html
<!-- Tailwind -->
<button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Button</button>

<!-- DaisyUI -->
<button class="btn btn-primary">Button</button>
```

## Performance Optimization

### Bootstrap

1. Use PurgeCSS to remove unused styles
2. Load only needed components
3. Use CDN with caching

### Tailwind

1. Enable JIT mode
2. Purge unused classes
3. Minimize utility usage

### All Frameworks

1. Minify CSS/JS
2. Enable gzip compression
3. Use CDN when possible
4. Lazy load images
5. Defer non-critical JavaScript

## Choosing the Right Framework

### Decision Tree

1. **Need pre-built components?**
    - Yes → Bootstrap, Materialize, or DaisyUI
    - No → Tailwind, Skeleton, or HTML5

2. **Want utility-first approach?**
    - Yes → Tailwind or DaisyUI
    - No → Bootstrap or Materialize

3. **File size critical?**
    - Yes → Skeleton or HTML5
    - No → Any framework

4. **Team experience?**
    - Bootstrap familiar → Bootstrap
    - Tailwind familiar → Tailwind or DaisyUI
    - Beginners → Skeleton or HTML5

5. **Project size?**
    - Large enterprise → Bootstrap or Tailwind
    - Medium → Any framework
    - Small/Landing → Skeleton or HTML5

## Framework Combinations

You can combine frameworks for different purposes:

### Bootstrap + Custom CSS

Start with Bootstrap, override with custom styles:

```html
<link rel="stylesheet" href="bootstrap.min.css" /> <link rel="stylesheet" href="custom.css" />
```

### Tailwind + Components

Use Tailwind with DaisyUI for best of both worlds.

### HTML5 + Utilities

Build your own utility classes inspired by Tailwind:

```css
.mt-4 {
    margin-top: 1rem;
}
.p-4 {
    padding: 1rem;
}
.text-center {
    text-align: center;
}
```

## Resources

- **Bootstrap**: [getbootstrap.com](https://getbootstrap.com)
- **Tailwind**: [tailwindcss.com](https://tailwindcss.com)
- **Materialize**: [materializecss.com](https://materializecss.com)
- **Skeleton**: [getskeleton.com](http://getskeleton.com)
- **DaisyUI**: [daisyui.com](https://daisyui.com)
- **MDN**: [developer.mozilla.org](https://developer.mozilla.org)
