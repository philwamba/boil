import updateNotifier from 'update-notifier';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function checkForUpdates(): void {
    try {
        const packageJson = JSON.parse(
            readFileSync(join(__dirname, '../../package.json'), 'utf-8')
        );

        const notifier = updateNotifier({
            pkg: packageJson,
            updateCheckInterval: 1000 * 60 * 60 * 24, // 24 hours
        });

        if (notifier.update) {
            notifier.notify({
                isGlobal: true,
                defer: false,
            });
        }
    } catch (error) {
        // Silently fail - update check is not critical
    }
}
