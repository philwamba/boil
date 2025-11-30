#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';
import { checkForUpdates } from '../utils/update-notifier.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check Node version
const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = parseInt(semver[0], 10);

if (major < 18) {
    logger.error(
        `You are running Node ${currentNodeVersion}.\\nBoil requires Node 18 or higher.\\nPlease update your version of Node.`
    );
    process.exit(1);
}

// Read package.json for version
const packageJson = JSON.parse(readFileSync(join(__dirname, '../../package.json'), 'utf-8'));

const program = new Command();

program
    .name('boil')
    .description('Modern Frontend Boilerplate Generator')
    .version(packageJson.version, '-v, --version', 'Output the current version');

// Interactive mode (default command)
program
    .command('generate', { isDefault: true })
    .description('Generate a boilerplate (interactive mode)')
    .action(async () => {
        const { generateCommand } = await import('./commands/generate.js');
        await generateCommand();
    });

// New project command
program
    .command('new <project-name>')
    .description('Create a new full project')
    .option('-f, --framework <framework>', 'Framework to use')
    .option('--with-js', 'Include JavaScript starter files')
    .option('--git', 'Initialize Git repository')
    .option('--theme <theme>', 'Theme mode (light, dark, auto)', 'auto')
    .option('--icons <library>', 'Icon library (heroicons, fontawesome, none)', 'none')
    .action(async (projectName, options) => {
        const { newCommand } = await import('./commands/new.js');
        await newCommand(projectName, options);
    });

// Generate page command
program
    .command('generate:page <type>')
    .description('Generate a page template')
    .option('-f, --framework <framework>', 'Framework to use')
    .option('-o, --output <path>', 'Output directory', '.')
    .action(async (type, options) => {
        const { pageCommand } = await import('./commands/page.js');
        await pageCommand(type, options);
    });

// Generate component command
program
    .command('generate:component <type>')
    .description('Generate a component')
    .option('-f, --framework <framework>', 'Framework to use')
    .option('-o, --output <path>', 'Output directory', '.')
    .action(async (type, options) => {
        const { componentCommand } = await import('./commands/component.js');
        await componentCommand(type, options);
    });

// Preset management commands
program
    .command('save-preset <name>')
    .description('Save current configuration as a preset')
    .action(async (name) => {
        const { savePresetCommand } = await import('./commands/preset.js');
        await savePresetCommand(name);
    });

program
    .command('use-preset <name>')
    .description('Use a saved preset')
    .action(async (name) => {
        const { usePresetCommand } = await import('./commands/preset.js');
        await usePresetCommand(name);
    });

program
    .command('list-presets')
    .description('List all saved presets')
    .action(async () => {
        const { listPresetsCommand } = await import('./commands/preset.js');
        await listPresetsCommand();
    });

program
    .command('delete-preset <name>')
    .description('Delete a preset')
    .action(async (name) => {
        const { deletePresetCommand } = await import('./commands/preset.js');
        await deletePresetCommand(name);
    });

// Preview server command
program
    .command('preview')
    .description('Start a preview server')
    .option('-p, --port <port>', 'Port number', '3000')
    .action(async (options) => {
        const { previewCommand } = await import('./commands/preview.js');
        await previewCommand(options);
    });

// Deploy command
program
    .command('deploy')
    .description('Deploy to GitHub Pages')
    .option('-b, --branch <branch>', 'Branch name', 'gh-pages')
    .action(async (options) => {
        const { deployCommand } = await import('./commands/deploy.js');
        await deployCommand(options);
    });

// Undo command
program
    .command('undo')
    .description('Undo the last generation')
    .action(async () => {
        const { undoCommand } = await import('./commands/undo.js');
        await undoCommand();
    });

// Config command
program
    .command('config <action> [key] [value]')
    .description('Manage configuration (set, get, list)')
    .action(async (action, key, value) => {
        const { configCommand } = await import('./commands/config.js');
        await configCommand(action, key, value);
    });

// Stats command
program
    .command('stats')
    .description('View usage statistics')
    .action(async () => {
        const { statsCommand } = await import('./commands/config.js');
        await statsCommand();
    });

// Check for updates before executing
checkForUpdates();

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
    logger.welcome();
    program.outputHelp();
}
