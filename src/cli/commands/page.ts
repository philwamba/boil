import path from 'path';
import inquirer from 'inquirer';
import { logger } from '../../utils/logger.js';
import { spinner } from '../../utils/spinner.js';
import { validator } from '../../utils/validator.js';
import { analytics } from '../../utils/analytics.js';
import { history } from '../../utils/history.js';
import { generatePageTemplate } from '../../generators/page.js';

interface PageCommandOptions {
    framework?: string;
    output?: string;
}

export async function pageCommand(pageType: string, options: PageCommandOptions): Promise<void> {
    // Validate page type
    if (!validator.validatePageType(pageType)) {
        logger.error(`Invalid page type: ${pageType}`);
        logger.info(`Valid page types: ${validator.getValidPageTypes().join(', ')}`);
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

    const outputDir = options.output || '.';
    const outputPath = path.join(process.cwd(), outputDir, `${pageType}.html`);

    try {
        spinner.start(`Generating ${pageType} page...`);

        await generatePageTemplate({
            pageType,
            framework,
            outputPath,
        });

        spinner.succeed(`${pageType} page generated successfully!`);

        // Track analytics
        analytics.trackCommand('generate:page');

        // Add to history
        history.add({
            type: 'page',
            path: outputPath,
            framework,
            name: `${pageType}.html`,
        });

        logger.success(`Created: ${outputPath}`);
    } catch (error) {
        spinner.fail('Failed to generate page');
        logger.error((error as Error).message);
        process.exit(1);
    }
}
