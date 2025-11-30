import Conf from 'conf';

interface PresetData {
    framework: string;
    withJs?: boolean;
    withGit?: boolean;
    theme?: 'light' | 'dark';
    icons?: 'heroicons' | 'fontawesome' | 'none';
}

interface PresetStore {
    [key: string]: PresetData;
}

const config = new Conf<{ presets: PresetStore }>({
    projectName: 'boil',
    configName: 'presets',
    defaults: {
        presets: {},
    },
});

export const presetManager = {
    save(name: string, data: PresetData): void {
        const presets = config.get('presets');
        presets[name] = data;
        config.set('presets', presets);
    },

    load(name: string): PresetData | null {
        const presets = config.get('presets');
        return presets[name] || null;
    },

    delete(name: string): boolean {
        const presets = config.get('presets');
        if (presets[name]) {
            delete presets[name];
            config.set('presets', presets);
            return true;
        }
        return false;
    },

    list(): string[] {
        const presets = config.get('presets');
        return Object.keys(presets);
    },

    getAll(): PresetStore {
        return config.get('presets');
    },

    exists(name: string): boolean {
        const presets = config.get('presets');
        return name in presets;
    },
};
