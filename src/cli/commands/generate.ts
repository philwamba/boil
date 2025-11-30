import inquirer from 'inquirer';
import path from 'path';
import { logger } from '../../utils/logger.js';
import { spinner } from '../../utils/spinner.js';
import { fileUtils } from '../../utils/file.js';
import { validator } from '../../utils/validator.js';
import { analytics } from '../../utils/analytics.js';
import { history } from '../../utils/history.js';
import { generateBoilerplate } from '../../generators/boilerplate.js';

export async function generateCommand(): Promise<void> {
    logger.welcome();

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'framework',
            message: 'Which framework would you like to use?',
            choices: [
                { name: 'Bootstrap 5', value: 'bootstrap' },
                { name: 'Tailwind CSS', value: 'tailwind' },
                { name: 'Materialize CSS', value: 'materialize' },
                { name: 'Skeleton', value: 'skeleton' },
                { name: 'DaisyUI', value: 'daisyui' },
                { name: 'Vanilla CSS', value: 'vanilla' },
                { name: 'HTML5 Boilerplate', value: 'html5' },
            ],
        },
        {
            type: 'input',
            name: 'projectName',
            message: 'Enter project name:',
            default: 'my-project',
            validate: validator.validateProjectName,
        },
        {
            type: 'confirm',
            name: 'withJs',
            message: 'Include JavaScript starter files?',
            default: true,
        },
        {
            type: 'confirm',
            name: 'withGit',
            message: 'Initialize Git repository?',
            default: true,
        },
        {
            type: 'list',
            name: 'theme',
            message: 'Select theme mode:',
            choices: [
                { name: 'Auto (system preference)', value: 'auto' },
                { name: 'Light', value: 'light' },
                { name: 'Dark', value: 'dark' },
            ],
            default: 'auto',
        },
        {
            type: 'list',
            name: 'icons',
            message: 'Select icon library:',
            choices: [
                { name: 'None', value: 'none' },
                { name: 'HeroIcons', value: 'heroicons' },
                { name: 'Font Awesome', value: 'fontawesome' },
            ],
            default: 'none',
        },
    ]);

    const projectPath = path.join(process.cwd(), answers.projectName);

    // Check if directory already exists
    if (await fileUtils.fileExists(projectPath)) {
        logger.error(`Directory "${answers.projectName}" already exists!`);
        process.exit(1);
    }

    try {
        spinner.start('Generating boilerplate...');

        await generateBoilerplate({
            framework: answers.framework,
            projectName: answers.projectName,
            projectPath,
            withJs: answers.withJs,
            withGit: answers.withGit,
            theme: answers.theme,
            icons: answers.icons,
        });

        spinner.succeed('Boilerplate generated successfully!');

        // Track analytics
        analytics.trackCommand('generate');
        analytics.trackGeneration(answers.framework);

        // Add to history
        history.add({
            type: 'project',
            path: projectPath,
            framework: answers.framework,
            name: answers.projectName,
        });

        logger.newLine();
        logger.success(`Project "${answers.projectName}" created successfully!`);
        logger.newLine();
        logger.info('Next steps:');
        console.log(`  cd ${answers.projectName}`);
        if (answers.withJs) {
            console.log('  npm install');
        }
        console.log('  boil preview');
        logger.newLine();
    } catch (error) {
        spinner.fail('Failed to generate boilerplate');
        logger.error((error as Error).message);
        process.exit(1);
    }
}
