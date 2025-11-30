import path from 'path';
import { fileUtils } from '../utils/file.js';
import { generateMetaTags, generateFaviconLinks } from '../utils/meta-generator.js';
import { generateThemeCSS, generateThemeToggleScript } from '../utils/theme-generator.js';
import { getIconCDN, getIconsComment } from '../utils/icon-manager.js';
import { execa } from 'execa';

interface BoilerplateOptions {
    framework: string;
    projectName: string;
    projectPath: string;
    withJs: boolean;
    withGit: boolean;
    theme: string;
    icons: string;
}

export async function generateBoilerplate(options: BoilerplateOptions): Promise<void> {
    const { framework, projectName, projectPath, withJs, withGit, theme, icons } = options;

    // Create project directory
    await fileUtils.createDirectory(projectPath);

    // Create subdirectories
    await fileUtils.createDirectory(path.join(projectPath, 'assets'));
    await fileUtils.createDirectory(path.join(projectPath, 'assets', 'css'));
    await fileUtils.createDirectory(path.join(projectPath, 'assets', 'js'));
    await fileUtils.createDirectory(path.join(projectPath, 'assets', 'images'));

    // Generate meta tags
    const metaTags = generateMetaTags({
        title: projectName,
        description: `${projectName} - Built with Boil CLI`,
        keywords: [framework, 'frontend', 'boilerplate'],
        author: '',
    });

    const faviconLinks = generateFaviconLinks();
    const iconCDN = getIconCDN(icons as any);
    const iconComment = getIconsComment(icons as any);

    // Generate index.html
    const indexHTML = generateIndexHTML(framework, {
        metaTags,
        faviconLinks,
        iconCDN,
        iconComment,
        projectName,
    });

    await fileUtils.writeFile(path.join(projectPath, 'index.html'), indexHTML);

    // Generate CSS
    const cssContent =
        framework === 'vanilla' || framework === 'html5'
            ? generateVanillaCSS(theme)
            : getFrameworkCSS(framework, theme);

    await fileUtils.writeFile(path.join(projectPath, 'assets', 'css', 'main.css'), cssContent);

    // Generate JS if requested
    if (withJs) {
        const jsContent = generateJavaScript(theme);
        await fileUtils.writeFile(path.join(projectPath, 'assets', 'js', 'main.js'), jsContent);
    }

    // Create package.json if withJs
    if (withJs) {
        const packageJson = {
            name: projectName,
            version: '1.0.0',
            description: `${projectName} - Built with Boil CLI`,
            main: 'index.html',
            scripts: {
                dev: 'boil preview',
            },
            keywords: [framework],
            author: '',
            license: 'MIT',
        };

        await fileUtils.writeFile(
            path.join(projectPath, 'package.json'),
            JSON.stringify(packageJson, null, 2)
        );
    }

    // Initialize Git if requested
    if (withGit) {
        const gitignore = `node_modules/
.DS_Store
*.log
.env
dist/
`;
        await fileUtils.writeFile(path.join(projectPath, '.gitignore'), gitignore);

        try {
            await execa('git', ['init'], { cwd: projectPath });
        } catch {
            // Git init failed, continue anyway
        }
    }

    // Create README
    const readme = `# ${projectName}

Generated with [Boil CLI](https://github.com/philwamba/boil)

## Framework: ${framework.charAt(0).toUpperCase() + framework.slice(1)}

## Getting Started

${withJs ? '1. Install dependencies: `npm install`\n' : ''}${withJs ? '2' : '1'}. Preview: \`boil preview\`

## Project Structure

\`\`\`
${projectName}/
├── assets/
│   ├── css/
│   │   └── main.css
│   ├── js/${withJs ? '\n│   │   └── main.js' : ''}
│   └── images/
└── index.html
\`\`\`

## License

MIT
`;

    await fileUtils.writeFile(path.join(projectPath, 'README.md'), readme);
}

function generateIndexHTML(
    framework: string,
    data: {
        metaTags: string;
        faviconLinks: string;
        iconCDN: string;
        iconComment: string;
        projectName: string;
    }
): string {
    const { metaTags, faviconLinks, iconCDN, iconComment, projectName } = data;

    const frameworkCDN = getFrameworkCDN(framework);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    ${metaTags}
    ${faviconLinks}
    ${frameworkCDN}
    <link rel="stylesheet" href="assets/css/main.css">
    ${iconCDN}
</head>
<body>
    <div class="container">
        <header>
            <h1>Welcome to ${projectName}</h1>
            <p>Built with ${framework.charAt(0).toUpperCase() + framework.slice(1)}</p>
        </header>

        <main>
            <section class="hero">
                <h2>Get Started</h2>
                <p>Edit index.html to get started!</p>
                ${iconComment}
            </section>
        </main>

        <footer>
            <p>Generated with <a href="https://github.com/philwamba/boil" target="_blank">Boil CLI</a></p>
        </footer>
    </div>

    <script src="assets/js/main.js"></script>
</body>
</html>
`;
}

function getFrameworkCDN(framework: string): string {
    switch (framework) {
        case 'bootstrap':
            return '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">\n    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>';
        case 'tailwind':
            return '<script src="https://cdn.tailwindcss.com"></script>';
        case 'materialize':
            return '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">\n    <script src="    https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>';
        case 'skeleton':
            return '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">';
        case 'daisyui':
            return '<link href="https://cdn.jsdelivr.net/npm/daisyui@4.4.19/dist/full.min.css" rel="stylesheet" type="text/css" />\n    <script src="https://cdn.tailwindcss.com"></script>';
        default:
            return '';
    }
}

function generateVanillaCSS(theme: string): string {
    return `/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

${generateThemeCSS(theme as any)}

/* Base Styles */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  padding: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
header {
  text-align: center;
  padding: 3rem 0;
  border-bottom: 2px solid var(--border-color);
}

header h1 {
  font-size: 3rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

header p {
  color: var(--text-secondary);
  font-size: 1.25rem;
}

/* Main */
main {
  padding: 4rem 0;
}

.hero {
  text-align: center;
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.hero h2 {
  font-size: 2rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
}

/* Footer */
footer {
  text-align: center;
  padding: 2rem 0;
  border-top: 2px solid var(--border-color);
  color: var(--text-secondary);
}

footer a {
  color: var(--accent-color);
  text-decoration: none;
}

footer a:hover {
  color: var(--accent-hover);
}
`;
}

function getFrameworkCSS(framework: string, theme: string): string {
    return `/* ${framework.charAt(0).toUpperCase() + framework.slice(1)} Custom Styles */

${generateThemeCSS(theme as any)}

/* Add your custom styles here */
`;
}

function generateJavaScript(_theme: string): string {
    return `// ${new Date().getFullYear()} - Generated with Boil CLI

${generateThemeToggleScript()}

// Your custom JavaScript here
console.log('Welcome to your new project!');
`;
}
