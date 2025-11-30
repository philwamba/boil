import ora, { Ora } from 'ora';

let currentSpinner: Ora | null = null;

export const spinner = {
    start(text: string): Ora {
        currentSpinner = ora({
            text,
            color: 'cyan',
        }).start();
        return currentSpinner;
    },

    succeed(text?: string): void {
        if (currentSpinner) {
            currentSpinner.succeed(text);
            currentSpinner = null;
        }
    },

    fail(text?: string): void {
        if (currentSpinner) {
            currentSpinner.fail(text);
            currentSpinner = null;
        }
    },

    update(text: string): void {
        if (currentSpinner) {
            currentSpinner.text = text;
        }
    },

    stop(): void {
        if (currentSpinner) {
            currentSpinner.stop();
            currentSpinner = null;
        }
    },
};
