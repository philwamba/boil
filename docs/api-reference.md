# API Reference

Complete API reference for Boil CLI commands and programmatic usage.

## CLI Commands

### `boil` (Interactive Mode)

Launch interactive mode with guided prompts.

```bash
boil
```

**Interactive Prompts:**

1. Framework selection
2. Project name
3. JavaScript files (yes/no)
4. Git initialization (yes/no)
5. Theme mode (auto/light/dark)
6. Icon library (none/heroicons/fontawesome)

---

### `boil new <project-name>`

Create a new full project with specified options.

```bash
boil new <project-name> [options]
```

**Arguments:**

- `project-name` - Name of the project directory (required)

**Options:**

- `-f, --framework <framework>` - Framework to use
    - Choices: `bootstrap`, `tailwind`, `materialize`, `skeleton`, `daisyui`, `vanilla`, `html5`
- `--with-js` - Include JavaScript starter files
- `--git` - Initialize Git repository
- `--theme <theme>` - Theme mode (default: `auto`)
    - Choices: `auto`, `light`, `dark`
- `--icons <library>` - Icon library (default: `none`)
    - Choices: `none`, `heroicons`, `fontawesome`

**Examples:**

```bash
# Minimal
boil new my-app --framework tailwind

# Full featured
boil new my-app --framework bootstrap --with-js --git --theme dark --icons heroicons

# Interactive framework selection
boil new my-app
```

**Output:**

- Creates project directory
- Generates HTML, CSS, JS files
- Creates assets folder structure
- Optional package.json
- Optional .gitignore and git init

---

### `boil generate:page <type>`

Generate a page template.

```bash
boil generate:page <type> [options]
```

**Arguments:**

- `type` - Page type (required)
    - Choices: `about`, `contact`, `landing`, `pricing`, `portfolio`, `login`, `register`, `dashboard`

**Options:**

- `-f, --framework <framework>` - Framework to use
- `-o, --output <path>` - Output directory (default: current directory)

**Examples:**

```bash
# Generate landing page
boil generate:page landing --framework tailwind

# Output to specific directory
boil generate:page contact --framework bootstrap --output ./pages
```

---

### `boil generate:component <type>`

Generate a component template.

```bash
boil generate:component <type> [options]
```

**Arguments:**

- `type` - Component type (required)
    - Choices: `navbar`, `hero`, `card`, `footer`, `sidebar`, `modal`, `form`

**Options:**

- `-f, --framework <framework>` - Framework to use
- `-o, --output <path>` - Output directory (default: `./components`)

**Examples:**

```bash
# Generate navbar
boil generate:component navbar --framework bootstrap

# Output to specific directory
boil generate:component card --framework tailwind --output ./src/components
```

---

### `boil save-preset <name>`

Save current configuration as a preset.

```bash
boil save-preset <name>
```

**Arguments:**

- `name` - Preset name (required)

**Interactive Prompts:**

1. Default framework
2. Include JavaScript files
3. Initialize Git
4. Default theme
5. Default icon library

**Examples:**

```bash
boil save-preset mydefault
```

**Storage:** `~/.config/boil/presets.json`

---

### `boil use-preset <name>`

Display a saved preset configuration.

```bash
boil use-preset <name>
```

**Arguments:**

- `name` - Preset name (required)

**Examples:**

```bash
boil use-preset mydefault
```

---

### `boil list-presets`

List all saved presets.

```bash
boil list-presets
```

**Output:**
Displays all presets with their configurations.

---

### `boil delete-preset <name>`

Delete a saved preset.

```bash
boil delete-preset <name>
```

**Arguments:**

- `name` - Preset name (required)

**Interactive:**
Confirms deletion before proceeding.

---

### `boil preview`

Start a preview server for the current directory.

```bash
boil preview [options]
```

**Options:**

- `-p, --port <port>` - Port number (default: `3000`)

**Features:**

- Live preview server
- QR code for mobile testing
- Shows local and network URLs

**Examples:**

```bash
# Default port 3000
boil preview

# Custom port
boil preview --port 8080
```

**Requirements:**

- Runs `sirv-cli` internally
- Serves current directory

---

### `boil deploy`

Deploy to GitHub Pages.

```bash
boil deploy [options]
```

**Options:**

- `-b, --branch <branch>` - Branch name (default: `gh-pages`)

**Features:**

- Checks for Git repository
- Commits any changes
- Deploys to specified branch
- Uses `gh-pages` package

**Examples:**

```bash
# Default gh-pages branch
boil deploy

# Custom branch
boil deploy --branch main
```

**Requirements:**

- Git repository initialized
- Remote repository configured

---

### `boil undo`

Undo the last generation.

```bash
boil undo
```

**Features:**

- Shows last generated item
- Confirms before deletion
- Removes from history

**Interactive:**
Displays details and asks for confirmation.

---

### `boil config <action> [key] [value]`

Manage configuration settings.

```bash
boil config <action> [key] [value]
```

**Actions:**

- `set` - Set a configuration value
- `get` - Get a configuration value
- `list` - List all configuration

**Examples:**

```bash
# Set analytics
boil config set analytics false

# Get analytics setting
boil config get analytics

# List all config
boil config list
```

**Storage:** `~/.config/boil/config.json`

**Common Keys:**

- `analytics` - Enable/disable analytics (boolean)

---

### `boil stats`

View usage statistics.

```bash
boil stats
```

**Output:**

- Total generations
- Last used date
- Command usage breakdown
- Framework usage breakdown

**Note:** Only works if analytics are enabled.

---

## Programmatic Usage

While Boil is primarily a CLI tool, you can use its modules programmatically:

### File Utilities

```typescript
import { fileUtils } from 'boil/dist/utils/file.js';

// Create directory
await fileUtils.createDirectory('./my-folder');

// Write file
await fileUtils.writeFile('./my-file.txt', 'content');

// Render EJS template
const html = await fileUtils.renderTemplate('./template.ejs', { title: 'My Title' });
```

### Validators

```typescript
import { validator } from 'boil/dist/utils/validator.js';

// Validate framework
validator.validateFramework('bootstrap'); // true
validator.validateFramework('invalid'); // false

// Validate project name
validator.validateProjectName('my-app'); // true

// Get valid options
validator.getValidFrameworks(); // ['bootstrap', 'tailwind', ...]
validator.getValidPageTypes(); // ['about', 'contact', ...]
validator.getValidComponentTypes(); // ['navbar', 'hero', ...]
```

### Generators

```typescript
import { generateBoilerplate } from 'boil/dist/generators/boilerplate.js';

await generateBoilerplate({
    framework: 'tailwind',
    projectName: 'my-app',
    projectPath: './my-app',
    withJs: true,
    withGit: true,
    theme: 'dark',
    icons: 'heroicons',
});
```

## Configuration Files

### Config Location

`~/.config/boil/`

### Files

- `config.json` - User preferences
- `presets.json` - Saved presets
- `history.json` - Generation history
- `analytics.json` - Usage statistics

### Config Schema

```typescript
interface Config {
    analytics?: boolean;
    [key: string]: any;
}

interface PresetData {
    framework: string;
    withJs?: boolean;
    withGit?: boolean;
    theme?: 'light' | 'dark' | 'auto';
    icons?: 'heroicons' | 'fontawesome' | 'none';
}

interface HistoryEntry {
    type: 'project' | 'page' | 'component';
    path: string;
    framework?: string;
    name: string;
    timestamp: number;
}
```

## Exit Codes

- `0` - Success
- `1` - General error (validation, file system, etc.)
- `2` - Compilation error (TypeScript build issues)

## Environment Variables

Boil doesn't currently use environment variables, but respects:

- `HOME` - For config directory location
- `NODE_ENV` - For development mode

## Version

```bash
boil --version
# or
boil -v
```

## Help

```bash
boil --help
# or
boil -h

# Command-specific help
boil new --help
boil generate:page --help
```

## TypeScript Types

All Boil modules are written in TypeScript. Type definitions are included in the package.

```typescript
import type { Framework, PageType, ComponentType } from 'boil/dist/utils/validator';
```

## Error Handling

All commands handle errors gracefully:

```bash
# Invalid framework
$ boil new myapp --framework invalid
✖ Invalid framework: invalid
ℹ Valid frameworks: bootstrap, tailwind, materialize, skeleton, daisyui, vanilla, html5

# Directory exists
$ boil new existing-dir
✖ Directory "existing-dir" already exists!

# Preset not found
$ boil use-preset nonexistent
✖ Preset "nonexistent" not found
ℹ Use "boil list-presets" to see available presets
```

## Logging

Boil uses a custom logger with color-coded output:

- ✔ Green - Success messages
- ✖ Red - Error messages
- ⚠ Yellow - Warning messages
- ℹ Cyan - Info messages

## Analytics

Analytics are:

- **Local only** - No data sent to external servers
- **Opt-out** - Can be disabled with `boil config set analytics false`
- **Limited** - Only command usage and framework counts

## Update Checking

Boil automatically checks for updates on startup using `update-notifier`.

To disable:

```bash
NO_UPDATE_NOTIFIER=1 boil <command>
```

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for extending Boil's API.
