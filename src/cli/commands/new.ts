import path from 'path';
import inquirer from 'inquirer';
import { logger } from '../../utils/logger.js';
import { spinner } from '../../utils/spinner.js';
import { fileUtils } from '../../utils/file.js';
import { validator } from '../../utils/validator.js';
import { analytics } from '../../utils/analytics.js';
import { history } from '../../utils/history.js';
import { generateBoilerplate } from '../../generators/boilerplate.js';

interface NewCommandOptions {
    framework?: string;
    withJs?: boolean;
    git?: boolean;
    theme?: string;
    icons?: string;
}

export async function newCommand(projectName: string, options: NewCommandOptions): Promise<void> {
    // Validate project name
    const validation = validator.validateProjectName(projectName);
    if (validation !== true) {
        logger.error(validation as string);
        process.exit(1);
    }

    // If framework not provided, prompt for it
    let framework = options.framework;
    if (!framework) {
        const answer = await inquirer.prompt([
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
        ]);
        framework = answer.framework;
    }

    // Validate framework
    if (!framework || !validator.validateFramework(framework)) {
        logger.error(`Invalid framework: ${framework}`);
        logger.info(`Valid frameworks: ${validator.getValidFrameworks().join(', ')}`);
        process.exit(1);
    }

    const projectPath = path.join(process.cwd(), projectName);

    // Check if directory already exists
    if (await fileUtils.fileExists(projectPath)) {
        logger.error(`Directory "${projectName}" already exists!`);
        process.exit(1);
    }

    try {
        spinner.start(`Creating project "${projectName}"...`);

        await generateBoilerplate({
            framework,
            projectName,
            projectPath,
            withJs: options.withJs ?? false,
            withGit: options.git ?? false,
            theme: options.theme ?? 'auto',
            icons: options.icons ?? 'none',
        });

        spinner.succeed(`Project "${projectName}" created successfully!`);

        // Track analytics
        analytics.trackCommand('new');
        analytics.trackGeneration(framework);

        // Add to history
        history.add({
            type: 'project',
            path: projectPath,
            framework,
            name: projectName,
        });

        logger.newLine();
        logger.success('Next steps:');
        console.log(`  cd ${projectName}`);
        if (options.withJs) {
            console.log('  npm install');
        }
        console.log('  boil preview');
        logger.newLine();
    } catch (error) {
        spinner.fail('Failed to create project');
        logger.error((error as Error).message);
        process.exit(1);
    }
}
