# 🔥 Boil

> Modern Frontend Boilerplate Generator

[![npm version](https://img.shields.io/badge/npm-v2.0.0-blue.svg)](https://www.npmjs.com/package/boil)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)

A powerful CLI tool to instantly generate HTML boilerplates, pages, and components for your frontend projects with beautiful developer experience.

## ✨ Features

- 🎨 **7 Framework Options** - Bootstrap, Tailwind CSS, Materialize, Skeleton, DaisyUI, Vanilla CSS, HTML5
- 📄 **8 Page Templates** - About, Contact, Landing, Pricing, Portfolio, Login, Register, Dashboard
- 🧩 **7 Component Generators** - Navbar, Hero, Card, Footer, Sidebar, Modal, Form
- 🌓 **Dark/Light Themes** - Auto theme switching with localStorage persistence
- 🎯 **SEO-Optimized** - Auto-generated meta tags, Open Graph, Twitter Cards
- 🔄 **Preset System** - Save and reuse your favorite configurations
- 📦 **Full Project Scaffolding** - Complete project structure in seconds
- 🚀 **Preview Server** - Built-in dev server with QR code for mobile testing
- 📤 **GitHub Pages Deploy** - One-command deployment
- ⏮️ **Undo Functionality** - Revert last generation easily
- 🎨 **Icon Integration** - HeroIcons & FontAwesome support
- 📊 **Local Analytics** - Track your usage (optional, local only)

## 📦 Installation

```bash
# Global installation (recommended)
npm install -g boil

# Or use npx (no installation needed)
npx boil
```

**Requirements:** Node.js >= 18.0.0

## 🚀 Quick Start

```bash
# Interactive mode - guided prompts
boil

# Create a new Tailwind project with all options
boil new my-website --framework tailwind --with-js --git --theme dark --icons heroicons

# Generate a landing page
boil generate:page landing --framework bootstrap

# Generate a navbar component
boil generate:component navbar --framework tailwind
```

## 📚 Commands Reference

### Project Generation

```bash
# Interactive mode (default)
boil

# Create new project
boil new <project-name> [options]

Options:
  -f, --framework <framework>  Framework to use (bootstrap, tailwind, etc.)
  --with-js                    Include JavaScript starter files
  --git                        Initialize Git repository
  --theme <theme>              Theme mode: light, dark, or auto (default: auto)
  --icons <library>            Icon library: heroicons, fontawesome, or none
```

### Page & Component Generation

```bash
# Generate a page
boil generate:page <type> [options]
Types: about, contact, landing, pricing, portfolio, login, register, dashboard

# Generate a component
boil generate:component <type> [options]
Types: navbar, hero, card, footer, sidebar, modal, form

Options for both:
  -f, --framework <framework>  Framework to use
  -o, --output <path>          Output directory (default: current directory)
```

### Preset Management

```bash
# Save current configuration as preset
boil save-preset mydefault

# Use a saved preset
boil use-preset mydefault

# List all saved presets
boil list-presets

# Delete a preset
boil delete-preset mydefault
```

### Developer Tools

```bash
# Start preview server
boil preview --port 3000

# Deploy to GitHub Pages
boil deploy --branch gh-pages

# Undo last generation
boil undo

# Configuration management
boil config set analytics false
boil config get analytics
boil config list

# View usage statistics
boil stats
```

## 🎨 Supported Frameworks

| Framework        | Version | Description                 |
| ---------------- | ------- | --------------------------- |
| **Bootstrap**    | 5.3.2   | Popular component library   |
| **Tailwind CSS** | 3.x     | Utility-first CSS framework |
| **Materialize**  | 1.0.0   | Material Design components  |
| **Skeleton**     | 2.0.4   | Lightweight CSS boilerplate |
| **DaisyUI**      | 4.4.19  | Tailwind component library  |
| **Vanilla CSS**  | -       | Pure CSS with modern reset  |
| **HTML5**        | -       | Semantic HTML5 boilerplate  |

## 🌓 Theme System

Boil includes automatic dark/light theme support:

- **Auto Mode** (default): Respects system preference
- **Dark Mode**: Fixed dark color scheme
- **Light Mode**: Fixed light color scheme
- **Toggle Script**: JavaScript for manual theme switching
- **LocalStorage**: Persists user preference

## 🎯 SEO Features

Every generated template includes:

- ✅ Semantic HTML5 structure
- ✅ Meta description & keywords
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card meta tags
- ✅ Favicon structure
- ✅ Mobile viewport settings
- ✅ Theme color meta tag

## 📁 Generated Project Structure

```
my-project/
├── assets/
│   ├── css/
│   │   └── main.css          # Framework styles + custom CSS
│   ├── js/
│   │   └── main.js           # Optional JavaScript (--with-js)
│   └── images/               # Image assets folder
├── index.html                # Main HTML file
├── package.json              # Optional (--with-js)
├── .gitignore                # Optional (--git)
└── README.md                 # Project documentation
```

## ⚙️ Configuration

Boil stores configuration in `~/.config/boil/`:

- `config.json` - User preferences
- `presets.json` - Saved presets
- `history.json` - Generation history (for undo)
- `analytics.json` - Local usage stats

## 🔧 Development

```bash
# Clone the repository
git clone https://github.com/philwamba/boil.git
cd boil

# Install dependencies
npm install

# Build TypeScript
npm run build

# Run in development mode
npm run dev

# Format code
npm run format

# Lint code
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Adding New Templates

1. Create template files in `src/templates/<framework>/`
2. Update generator logic in `src/generators/`
3. Add tests
4. Submit PR

### Adding New Frameworks

1. Add framework to `validator.ts`
2. Create template directory
3. Implement framework-specific generators
4. Update documentation

## 📝 License

MIT © [Phil Wamba](https://github.com/philwamba)

## 🙏 Acknowledgments

Built with these amazing tools:

- [Commander.js](https://github.com/tj/commander.js/) - CLI framework
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) - Interactive prompts
- [Chalk](https://github.com/chalk/chalk) - Terminal styling
- [Ora](https://github.com/sindresorhus/ora) - Elegant spinners
- [Boxen](https://github.com/sindresorhus/boxen) - Boxes in terminal

## 📮 Support

- 🐛 [Report a bug](https://github.com/philwamba/boil/issues)
- 💡 [Request a feature](https://github.com/philwamba/boil/issues)
- 📧 Email: philwamba@yahoo.com

---

<p align="center">Made with ❤️ by <a href="https://github.com/philwamba">Phil Wamba</a></p>
