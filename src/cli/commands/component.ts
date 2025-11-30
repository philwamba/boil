import path from 'path';
import inquirer from 'inquirer';
import { logger } from '../../utils/logger.js';
import { spinner } from '../../utils/spinner.js';
import { validator } from '../../utils/validator.js';
import { analytics } from '../../utils/analytics.js';
import { history } from '../../utils/history.js';
import { generateComponentTemplate } from '../../generators/component.js';

interface ComponentCommandOptions {
    framework?: string;
    output?: string;
}

export async function componentCommand(
    componentType: string,
    options: ComponentCommandOptions
): Promise<void> {
    // Validate component type
    if (!validator.validateComponentType(componentType)) {
        logger.error(`Invalid component type: ${componentType}`);
        logger.info(`Valid component types: ${validator.getValidComponentTypes().join(', ')}`);
        process.exit(1);
    }

    // If framework not provided, prompt for it
    let framework = options.framework;
    if (!framework) {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'framework',
                message: 'Which framework?',
                choices: validator.getValidFrameworks().map((f) => ({
                    name: f.charAt(0).toUpperCase() + f.slice(1),
                    value: f,
                })),
            },
        ]);
        framework = answer.framework;
    }

    if (!framework || !validator.validateFramework(framework)) {
        logger.error(`Invalid framework: ${framework}`);
        process.exit(1);
    }

    const outputDir = options.output || './components';
    const outputPath = path.join(process.cwd(), outputDir, `${componentType}.html`);

    try {
        spinner.start(`Generating ${componentType} component...`);

        await generateComponentTemplate({
            componentType,
            framework,
            outputPath,
        });

        spinner.succeed(`${componentType} component generated successfully!`);

        // Track analytics
        analytics.trackCommand('generate:component');

        // Add to history
        history.add({
            type: 'component',
            path: outputPath,
            framework,
            name: `${componentType}.html`,
        });

        logger.success(`Created: ${outputPath}`);
    } catch (error) {
        spinner.fail('Failed to generate component');
        logger.error((error as Error).message);
        process.exit(1);
    }
}
