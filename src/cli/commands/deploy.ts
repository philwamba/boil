import { execa } from 'execa';
import { logger } from '../../utils/logger.js';
import { spinner } from '../../utils/spinner.js';

interface DeployOptions {
    branch: string;
}

export async function deployCommand(options: DeployOptions): Promise<void> {
    const branch = options.branch || 'gh-pages';

    try {
        // Check if git is initialized
        spinner.start('Checking Git repository...');

        try {
            await execa('git', ['status']);
            spinner.succeed('Git repository found');
        } catch {
            spinner.fail('Not a git repository');
            logger.info('Initializing git...');
            await execa('git', ['init']);
            logger.success('Git initialized');
        }

        // Check for uncommitted changes
        const { stdout } = await execa('git', ['status', '--porcelain']);
        if (stdout) {
            logger.warning('You have uncommitted changes');
            logger.info('Committing changes...');
            await execa('git', ['add', '.']);
            await execa('git', ['commit', '-m', 'Deploy to GitHub Pages']);
        }

        // Deploy using gh-pages
        spinner.start(`Deploying to ${branch}...`);

        await execa('npx', ['gh-pages', '-d', '.', '-b', branch]);

        spinner.succeed(`Deployed to ${branch} branch!`);
        logger.newLine();
        logger.info('Your site should be available at:');
        logger.info('https://[username].github.io/[repo-name]/');
    } catch (error) {
        spinner.fail('Deployment failed');
        logger.error((error as Error).message);
        process.exit(1);
    }
}
