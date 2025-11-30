# Templates Guide

A comprehensive guide to all available templates in Boil CLI.

## Framework Templates

### Bootstrap 5

**CDN Version**: 5.3.2  
**Best For**: Rapid prototyping, component-rich applications  
**File Size**: ~200KB (CSS + JS)

#### Features

- Complete component library (navbar, cards, modals, forms)
- Responsive 12-column grid system
- Utilities for spacing, colors, typography
- JavaScript components (dropdowns, modals, tooltips)
- Mobile-first approach

#### Generated Structure

```
project/
├── index.html (Bootstrap CDN + custom sections)
├── assets/
│   ├── css/
│   │   └── main.css (custom styles)
│   └── js/
│       └── main.js (optional)
```

#### Customization

Edit `assets/css/main.css` to override Bootstrap defaults:

```css
:root {
    --bs-primary-rgb: 13, 110, 253; /* Change primary color */
}
```

---

### Tailwind CSS

**CDN Version**: 3.x (latest)  
**Best For**: Utility-first development, custom designs  
**File Size**: ~50KB (production build)

#### Features

- Utility-first CSS framework
- Just-in-time compilation
- Custom theme configuration
- Dark mode support
- Responsive modifiers

#### Generated Structure

```
project/
├── index.html (Tailwind CDN + custom config)
├── assets/
│   ├── css/
│   │   └── main.css (custom utilities)
│   └── js/
│       └── main.js (mobile menu)
```

#### Customization

Configure Tailwind directly in the HTML:

```html
<script>
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    primary: '#3b82f6',
                },
            },
        },
    };
</script>
```

---

### Materialize CSS

**Version**: 1.0.0  
**Best For**: Material Design applications  
**File Size**: ~180KB

#### Features

- Material Design components
- Smooth animations
- Built-in icons
- Form validation
- Parallax effects

#### Generated Structure

Includes Material Icons and sidenav for mobile.

#### JavaScript Initialization

```javascript
// Sidenav
M.Sidenav.init(document.querySelectorAll('.sidenav'));

// Modals
M.Modal.init(document.querySelectorAll('.modal'));
```

---

### Skeleton

**Version**: 2.0.4  
**Best For**: Minimal projects, landing pages  
**File Size**: ~11KB (only CSS)

#### Features

- Lightweight (~400 lines of CSS)
- Basic grid system
- Minimal styling
- Fast loading
- Easy customization

Perfect for projects that don't need heavy frameworks.

---

### DaisyUI

**Version**: 4.4.19  
**Best For**: Tailwind users who want components  
**File Size**: Adds ~30KB to Tailwind

#### Features

- 50+ components built on Tailwind
- Multiple themes (light, dark, cupcake, etc.)
- Semantic class names
- Dark mode toggle
- No JavaScript required

#### Theme Toggle

Built-in dark mode implementation:

```javascript
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('change', () => {
    const theme = toggle.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
});
```

---

### HTML5

**Best For**: No framework projects, learning  
**File Size**: Custom (typically 5-10KB)

#### Features

- Pure semantic HTML5
- CSS variables for theming
- Vanilla JavaScript
- No dependencies
- Full control

#### CSS Variables

```css
:root {
    --primary-color: #3b82f6;
    --text-primary: #1f2937;
    --spacing-md: 1.5rem;
}
```

---

### Vanilla CSS

Same as HTML5 - clean, dependency-free foundation for custom designs.

## Page Templates

### Landing Page

- Hero section with CTA
- Features grid
- Social proof
- Contact form

### About Page

- Company info
- Team section
- Mission/vision
- Timeline

### Contact Page

- Contact form
- Contact info
- Map integration (placeholder)
- Social links

### Pricing Page

- Pricing cards (3 tiers)
- Feature comparison
- FAQ section
- CTA buttons

### Portfolio Page

- Project grid
- Filter categories
- Project details
- Testimonials

### Login/Register

- Forms with validation
- Social login buttons
- Password recovery
- Terms checkbox

### Dashboard

- Sidebar navigation
- Stats cards
- Charts (placeholders)
- Data tables

## Component Templates

### Navbar

- Logo placement
- Navigation links
- Mobile hamburger menu
- Dropdown support

### Hero

- Large heading
- Subtitle
- CTA buttons
- Background image/gradient

### Card

- Image
- Title & description
- Action buttons
- Badges/tags

### Footer

- Multi-column layout
- Social links
- Copyright
- Newsletter signup

### Sidebar

- Navigation menu
- Collapsible sections
- Icons
- Active states

### Modal

- Overlay
- Close button
- Header/body/footer
- Backdrop click

### Form

- Input fields
- Validation
- Submit button
- Error messages

## Using Templates

### Generate a Page

```bash
boil generate:page landing --framework tailwind
```

### Generate a Component

```bash
boil generate:component navbar --framework bootstrap
```

### Customize Templates

All templates are located in `src/templates/` and can be modified to suit your needs.

## Best Practices

1. **Choose the Right Framework**
    - Bootstrap: Need many pre-built components
    - Tailwind: Want full design control
    - Skeleton: Want minimal overhead
    - HTML5: Learning or no framework needed

2. **Optimize for Production**
    - Remove unused CSS
    - Minify files
    - Use production CDN links
    - Enable compression

3. **Accessibility**
    - All templates include ARIA labels
    - Semantic HTML structure
    - Keyboard navigation support
    - Screen reader friendly

4. **SEO**
    - Meta tags included
    - Semantic headings (H1-H6)
    - Alt text for images
    - Mobile-friendly viewport

## Template Customization

### Adding Your Brand Colors

Edit the CSS variables or framework config to match your brand.

### Removing Sections

Simply delete unwanted HTML sections from the generated file.

### Adding Sections

Copy and paste from other templates or create new sections following the existing structure.

## Troubleshooting

**Issue**: Styles not loading  
**Solution**: Check CDN links and internet connection

**Issue**: JavaScript not working  
**Solution**: Ensure scripts are at bottom of body and CDN is loaded

**Issue**: Mobile menu not working  
**Solution**: Check JavaScript initialization and event listeners

## Further Resources

- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Materialize Documentation](https://materializecss.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
