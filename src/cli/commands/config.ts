import Conf from 'conf';
import { logger } from '../../utils/logger.js';
import { analytics } from '../../utils/analytics.js';
import chalk from 'chalk';

const userConfig = new Conf({ projectName: 'boil', configName: 'config' });

export async function configCommand(action: string, key?: string, value?: string): Promise<void> {
    switch (action) {
        case 'set':
            if (!key || value === undefined) {
                logger.error('Usage: boil config set <key> <value>');
                process.exit(1);
            }
            setConfig(key, value);
            break;

        case 'get':
            if (!key) {
                logger.error('Usage: boil config get <key>');
                process.exit(1);
            }
            getConfig(key);
            break;

        case 'list':
            listConfig();
            break;

        default:
            logger.error(`Unknown action: ${action}`);
            logger.info('Valid actions: set, get, list');
            process.exit(1);
    }
}

function setConfig(key: string, value: string): void {
    // Convert string values to boolean if needed
    let parsedValue: any = value;
    if (value === 'true') parsedValue = true;
    if (value === 'false') parsedValue = false;

    userConfig.set(key, parsedValue);
    logger.success(`Set ${key} = ${parsedValue}`);
}

function getConfig(key: string): void {
    const value = userConfig.get(key);
    if (value === undefined) {
        logger.warning(`Key "${key}" not found`);
    } else {
        console.log(chalk.cyan(key + ':'), value);
    }
}

function listConfig(): void {
    const config = userConfig.store;

    if (Object.keys(config).length === 0) {
        logger.info('No configuration set');
        return;
    }

    logger.info('Current configuration:');
    logger.newLine();

    Object.entries(config).forEach(([key, value]) => {
        console.log(chalk.cyan(`  ${key}:`), value);
    });
}

export async function statsCommand(): Promise<void> {
    if (!analytics.isEnabled()) {
        logger.warning('Analytics are disabled');
        logger.info('Enable with: boil config set analytics true');
        return;
    }

    const stats = analytics.getStats();

    logger.info('Usage Statistics:');
    logger.newLine();

    console.log(chalk.yellow.bold('Total Generations:'), stats.totalGenerations);

    if (stats.lastUsed) {
        console.log(chalk.yellow.bold('Last Used:'), new Date(stats.lastUsed).toLocaleString());
    }

    logger.newLine();

    if (Object.keys(stats.commandUsage).length > 0) {
        console.log(chalk.yellow.bold('Command Usage:'));
        Object.entries(stats.commandUsage).forEach(([command, count]) => {
            console.log(chalk.gray(`  ${command}:`), count);
        });
        logger.newLine();
    }

    if (Object.keys(stats.frameworkUsage).length > 0) {
        console.log(chalk.yellow.bold('Framework Usage:'));
        Object.entries(stats.frameworkUsage).forEach(([framework, count]) => {
            console.log(chalk.gray(`  ${framework}:`), count);
        });
    }
}
