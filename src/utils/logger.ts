import chalk from 'chalk';
import boxen from 'boxen';

export const logger = {
    success(message: string): void {
        console.log(chalk.green('✔'), message);
    },

    error(message: string): void {
        console.log(chalk.red('✖'), message);
    },

    warning(message: string): void {
        console.log(chalk.yellow('⚠'), message);
    },

    info(message: string): void {
        console.log(chalk.cyan('ℹ'), message);
    },

    welcome(): void {
        const banner = chalk.yellow(`
██████╗  ██████╗ ██╗██╗     
██╔══██╗██╔═══██╗██║██║     
██████╔╝██║   ██║██║██║     
██╔═══╝ ██║   ██║██║██║     
██║     ╚██████╔╝██║███████╗
╚═╝      ╚═════╝ ╚═╝╚══════╝
`);

        const subtitle = chalk.white.bold('Frontend Boilerplate Generator');
        const version = chalk.gray('v2.0.0');

        console.log(
            boxen(`${banner}\n${subtitle}\n${version}`, {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'yellow',
            })
        );
    },

    newLine(): void {
        console.log('');
    },
};
