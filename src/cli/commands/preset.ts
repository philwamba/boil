import inquirer from 'inquirer';
import { logger } from '../../utils/logger.js';
import { presetManager } from '../../utils/preset-manager.js';
import { validator } from '../../utils/validator.js';
import chalk from 'chalk';

export async function savePresetCommand(name: string): Promise<void> {
    // Check if preset already exists
    if (presetManager.exists(name)) {
        const { confirm } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: `Preset "${name}" already exists. Overwrite?`,
                default: false,
            },
        ]);

        if (!confirm) {
            logger.info('Cancelled');
            return;
        }
    }

    // Prompt for preset configuration
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'framework',
            message: 'Default framework:',
            choices: validator.getValidFrameworks().map((f) => ({
                name: f.charAt(0).toUpperCase() + f.slice(1),
                value: f,
            })),
        },
        {
            type: 'confirm',
            name: 'withJs',
            message: 'Include JavaScript files by default?',
            default: true,
        },
        {
            type: 'confirm',
            name: 'withGit',
            message: 'Initialize Git by default?',
            default: true,
        },
        {
            type: 'list',
            name: 'theme',
            message: 'Default theme:',
            choices: [
                { name: 'Auto', value: 'auto' },
                { name: 'Light', value: 'light' },
                { name: 'Dark', value: 'dark' },
            ],
            default: 'auto',
        },
        {
            type: 'list',
            name: 'icons',
            message: 'Default icon library:',
            choices: [
                { name: 'None', value: 'none' },
                { name: 'HeroIcons', value: 'heroicons' },
                { name: 'Font Awesome', value: 'fontawesome' },
            ],
            default: 'none',
        },
    ]);

    presetManager.save(name, answers);
    logger.success(`Preset "${name}" saved successfully!`);
}

export async function usePresetCommand(name: string): Promise<void> {
    const preset = presetManager.load(name);

    if (!preset) {
        logger.error(`Preset "${name}" not found`);
        logger.info('Use "boil list-presets" to see available presets');
        process.exit(1);
    }

    logger.info(`Using preset "${name}":`);
    console.log(chalk.cyan('  Framework:'), preset.framework);
    console.log(chalk.cyan('  JavaScript:'), preset.withJs ? 'Yes' : 'No');
    console.log(chalk.cyan('  Git:'), preset.withGit ? 'Yes' : 'No');
    console.log(chalk.cyan('  Theme:'), preset.theme);
    console.log(chalk.cyan('  Icons:'), preset.icons);
    logger.newLine();
    logger.info('Use these settings with: boil new <project-name> --preset ' + name);
}

export async function listPresetsCommand(): Promise<void> {
    const presets = presetManager.list();

    if (presets.length === 0) {
        logger.warning('No presets found');
        logger.info('Create one with: boil save-preset <name>');
        return;
    }

    logger.info('Saved presets:');
    logger.newLine();

    const allPresets = presetManager.getAll();
    presets.forEach((name) => {
        const preset = allPresets[name];
        console.log(chalk.yellow.bold(`  ${name}`));
        console.log(chalk.gray(`    Framework: ${preset.framework}`));
        console.log(chalk.gray(`    Theme: ${preset.theme}`));
        console.log(chalk.gray(`    Icons: ${preset.icons}`));
        logger.newLine();
    });
}

export async function deletePresetCommand(name: string): Promise<void> {
    if (!presetManager.exists(name)) {
        logger.error(`Preset "${name}" not found`);
        process.exit(1);
    }

    const { confirm } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: `Delete preset "${name}"?`,
            default: false,
        },
    ]);

    if (!confirm) {
        logger.info('Cancelled');
        return;
    }

    presetManager.delete(name);
    logger.success(`Preset "${name}" deleted`);
}
