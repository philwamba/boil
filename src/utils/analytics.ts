import Conf from 'conf';

interface AnalyticsData {
    commandUsage: Record<string, number>;
    totalGenerations: number;
    frameworkUsage: Record<string, number>;
    lastUsed: number;
}

const config = new Conf<AnalyticsData>({
    projectName: 'boil',
    configName: 'analytics',
    defaults: {
        commandUsage: {},
        totalGenerations: 0,
        frameworkUsage: {},
        lastUsed: 0,
    },
});

export const analytics = {
    isEnabled(): boolean {
        const userConfig = new Conf({ projectName: 'boil', configName: 'config' });
        return userConfig.get('analytics', true) as boolean;
    },

    trackCommand(command: string): void {
        if (!this.isEnabled()) return;

        const commandUsage = config.get('commandUsage');
        commandUsage[command] = (commandUsage[command] || 0) + 1;
        config.set('commandUsage', commandUsage);
        config.set('lastUsed', Date.now());
    },

    trackGeneration(framework?: string): void {
        if (!this.isEnabled()) return;

        const totalGenerations = config.get('totalGenerations');
        config.set('totalGenerations', totalGenerations + 1);

        if (framework) {
            const frameworkUsage = config.get('frameworkUsage');
            frameworkUsage[framework] = (frameworkUsage[framework] || 0) + 1;
            config.set('frameworkUsage', frameworkUsage);
        }
    },

    getStats(): AnalyticsData {
        return {
            commandUsage: config.get('commandUsage'),
            totalGenerations: config.get('totalGenerations'),
            frameworkUsage: config.get('frameworkUsage'),
            lastUsed: config.get('lastUsed'),
        };
    },

    clear(): void {
        config.clear();
    },
};
