import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export const fileUtils = {
    async createDirectory(dirPath: string): Promise<void> {
        try {
            await fs.ensureDir(dirPath);
        } catch (error) {
            throw new Error(`Failed to create directory ${dirPath}: ${error}`);
        }
    },

    async writeFile(filePath: string, content: string): Promise<void> {
        try {
            await fs.ensureDir(path.dirname(filePath));
            await fs.writeFile(filePath, content, 'utf-8');
        } catch (error) {
            throw new Error(`Failed to write file ${filePath}: ${error}`);
        }
    },

    async copyTemplate(source: string, dest: string): Promise<void> {
        try {
            await fs.copy(source, dest);
        } catch (error) {
            throw new Error(`Failed to copy template from ${source} to ${dest}: ${error}`);
        }
    },

    async fileExists(filePath: string): Promise<boolean> {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    },

    async renderTemplate(templatePath: string, data: Record<string, any>): Promise<string> {
        try {
            const template = await fs.readFile(templatePath, 'utf-8');
            return ejs.render(template, data);
        } catch (error) {
            throw new Error(`Failed to render template ${templatePath}: ${error}`);
        }
    },

    async readFile(filePath: string): Promise<string> {
        try {
            return await fs.readFile(filePath, 'utf-8');
        } catch (error) {
            throw new Error(`Failed to read file ${filePath}: ${error}`);
        }
    },

    async deleteFile(filePath: string): Promise<void> {
        try {
            await fs.remove(filePath);
        } catch (error) {
            throw new Error(`Failed to delete ${filePath}: ${error}`);
        }
    },
};
