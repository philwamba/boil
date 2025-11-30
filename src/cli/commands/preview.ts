import { execa } from 'execa';
import qrcode from 'qrcode-terminal';
import { logger } from '../../utils/logger.js';
import os from 'os';

interface PreviewOptions {
    port: string;
}

export async function previewCommand(options: PreviewOptions): Promise<void> {
    const port = options.port || '3000';

    logger.info(`Starting preview server on port ${port}...`);
    logger.newLine();

    // Get local IP address for QR code
    const interfaces = os.networkInterfaces();
    let localIP = 'localhost';

    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name] || []) {
            if (iface.family === 'IPv4' && !iface.internal) {
                localIP = iface.address;
                break;
            }
        }
    }

    const localURL = `http://localhost:${port}`;
    const networkURL = `http://${localIP}:${port}`;

    logger.success(`Local:   ${localURL}`);
    logger.success(`Network: ${networkURL}`);
    logger.newLine();

    // Generate QR code for mobile testing
    logger.info('Scan QR code to open on mobile:');
    qrcode.generate(networkURL, { small: true });
    logger.newLine();

    try {
        // Start sirv server
        await execa('npx', ['sirv-cli', '.', '--port', port, '--single'], {
            stdio: 'inherit',
        });
    } catch (error) {
        logger.error('Failed to start preview server');
        logger.info('Make sure you have sirv-cli installed: npm install -g sirv-cli');
        process.exit(1);
    }
}
