# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-12-01

### 🚀 Complete Redesign - Breaking Changes

This is a complete rewrite of Boil from the ground up with TypeScript and modern tooling.

### Added

#### Core Features

- ✨ **TypeScript Rewrite** - Complete migration from JavaScript to TypeScript with strict type checking
- 🎨 **7 Framework Support** - Bootstrap 5, Tailwind CSS, Materialize, Skeleton, DaisyUI, Vanilla CSS, HTML5
- 📄 **Page Templates** - 8 pre-built page types (About, Contact, Landing, Pricing, Portfolio, Login, Register, Dashboard)
- 🧩 **Component Generators** - 7 component types (Navbar, Hero, Card, Footer, Sidebar, Modal, Form)

#### Developer Experience

- 🔄 **Preset System** - Save and reuse favorite configurations
- ⏮️ **Undo Functionality** - Revert last generation with `boil undo`
- 📊 **Local Analytics** - Optional usage tracking (local only, no external services)
- 🔔 **Update Notifier** - Automatic version checking
- 🎯 **Interactive Mode** - Beautiful CLI prompts with Inquirer.js
- 🎨 **Beautiful UI** - ASCII art welcome screen with Boxen and Chalk

#### Advanced Features

- 🌓 **Theme System** - Auto dark/light theme with CSS variables and toggle script
- 🎯 **Icon Integration** - HeroIcons and FontAwesome CDN support
- 📦 **Full Project Scaffolding** - Complete directory structure with package.json, .gitignore, README
- 🚀 **Preview Server** - Built-in dev server with QR code for mobile testing
- 📤 **GitHub Pages Deploy** - One-command deployment to gh-pages
- 🔧 **Config Management** - Persistent configuration with `boil config`

#### SEO & Meta Tags

- 🎯 **Auto Meta Tags** - Title, description, keywords
- 📱 **Open Graph Tags** - Social media sharing tags
- 🐦 **Twitter Cards** - Twitter-specific meta tags
- 🔗 **Favicon Structure** - Multiple favicon sizes
- 📱 **Mobile Optimization** - Proper viewport and theme-color tags

### Changed

- **Command Structure** - New CLI commands using Commander.js
    - `boil` → Interactive mode (default)
    - `boil new <name>` → Create full project
    - `boil generate:page <type>` → Generate pages
    - `boil generate:component <type>` → Generate components
- **Template Approach** - Embedded templates instead of Git repo downloads (faster)
- **Module System** - ESM modules (modern JavaScript)
- **Node Version** - Now requires Node.js >= 18.0.0 (previously 8+)

### Removed

- Git repository cloning approach (replaced with embedded templates)
- Deprecated `download-git-repo` dependency
- Old CommonJS structure

### Dependencies

#### Production Dependencies

- chalk@5.3.0 (ESM)
- inquirer@9.2.12 (ESM)
- commander@11.1.0
- ora@7.0.1 (ESM)
- boxen@7.1.1 (ESM)
- fs-extra@11.2.0
- execa@8.0.1 (ESM)
- ejs@3.1.9
- conf@12.0.0
- update-notifier@7.0.0
- sirv-cli@2.0.2
- qrcode-terminal@0.12.0

#### Development Dependencies

- typescript@5.3.3
- @types/node@20.10.6
- @types/inquirer@9.0.7
- tsx@4.7.0
- eslint@8.56.0
- prettier@3.1.1

### Migration Guide from v1.x

**Breaking Changes:**

1. Command syntax has changed - see README for new commands
2. Node.js 18+ now required
3. Templates are embedded (no longer downloaded from Git)

**To upgrade:**

```bash
npm uninstall -g boil
npm install -g boil@2.0.0
```

**New features to try:**

```bash
# Save your favorite setup as a preset
boil save-preset mydefault

# Use preset for quick projects
boil use-preset mydefault

# Preview your project instantly
boil preview

# Undo if you make a mistake
boil undo
```

---

## [1.0.0] - 2020-02-15

### Added

- Initial release
- Basic Bootstrap, Materialize, and Tailwind boilerplate generation
- Simple CLI with commander and inquirer
- Git repository download approach

[2.0.0]: https://github.com/philwamba/boil/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/philwamba/boil/releases/tag/v1.0.0
