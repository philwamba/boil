import inquirer from 'inquirer';
import { logger } from '../../utils/logger.js';
import { fileUtils } from '../../utils/file.js';
import { history } from '../../utils/history.js';
import chalk from 'chalk';

export async function undoCommand(): Promise<void> {
    const last = history.getLast();

    if (!last) {
        logger.warning('Nothing to undo');
        return;
    }

    logger.info('Last generation:');
    console.log(chalk.cyan('  Type:'), last.type);
    console.log(chalk.cyan('  Name:'), last.name);
    console.log(chalk.cyan('  Path:'), last.path);
    if (last.framework) {
        console.log(chalk.cyan('  Framework:'), last.framework);
    }
    console.log(chalk.gray(`  Created:  ${new Date(last.timestamp).toLocaleString()}`));
    logger.newLine();

    const { confirm } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: 'Are you sure you want to delete this?',
            default: false,
        },
    ]);

    if (!confirm) {
        logger.info('Cancelled');
        return;
    }

    try {
        // Check if path exists
        if (!(await fileUtils.fileExists(last.path))) {
            logger.warning('Path no longer exists');
            history.removeLast();
            return;
        }

        await fileUtils.deleteFile(last.path);
        history.removeLast();
        logger.success(`Successfully deleted: ${last.path}`);
    } catch (error) {
        logger.error(`Failed to delete: ${(error as Error).message}`);
        process.exit(1);
    }
}
