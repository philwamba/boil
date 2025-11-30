import Conf from 'conf';

interface HistoryEntry {
    type: 'project' | 'page' | 'component';
    path: string;
    framework?: string;
    name: string;
    timestamp: number;
}

const MAX_HISTORY_ENTRIES = 10;

const config = new Conf({
    projectName: 'boil',
    configName: 'history',
});

export const history = {
    add(entry: Omit<HistoryEntry, 'timestamp'>): void {
        const entries = this.getAll();
        const newEntry: HistoryEntry = {
            ...entry,
            timestamp: Date.now(),
        };

        // Add to beginning of array
        entries.unshift(newEntry);

        // Keep only last MAX_HISTORY_ENTRIES
        if (entries.length > MAX_HISTORY_ENTRIES) {
            entries.splice(MAX_HISTORY_ENTRIES);
        }

        config.set('entries', entries);
    },

    getLast(): HistoryEntry | null {
        const entries = this.getAll();
        return entries.length > 0 ? entries[0] : null;
    },

    getAll(): HistoryEntry[] {
        return (config.get('entries') as HistoryEntry[]) || [];
    },

    clear(): void {
        config.set('entries', []);
    },

    removeLast(): HistoryEntry | null {
        const entries = this.getAll();
        if (entries.length === 0) return null;

        const last = entries.shift();
        config.set('entries', entries);
        return last || null;
    },
};
