const VALID_FRAMEWORKS = [
    'bootstrap',
    'tailwind',
    'materialize',
    'skeleton',
    'daisyui',
    'vanilla',
    'html5',
] as const;

const VALID_PAGE_TYPES = [
    'about',
    'contact',
    'landing',
    'pricing',
    'portfolio',
    'login',
    'register',
    'dashboard',
] as const;

const VALID_COMPONENT_TYPES = [
    'navbar',
    'hero',
    'card',
    'footer',
    'sidebar',
    'modal',
    'form',
] as const;

export type Framework = (typeof VALID_FRAMEWORKS)[number];
export type PageType = (typeof VALID_PAGE_TYPES)[number];
export type ComponentType = (typeof VALID_COMPONENT_TYPES)[number];

export const validator = {
    validateProjectName(name: string): string | boolean {
        if (!name || name.trim().length === 0) {
            return 'Project name cannot be empty';
        }

        // Check for invalid characters
        if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
            return 'Project name can only contain letters, numbers, hyphens, and underscores';
        }

        // Check if it starts with a letter
        if (!/^[a-zA-Z]/.test(name)) {
            return 'Project name must start with a letter';
        }

        return true;
    },

    validateFramework(framework: string): framework is Framework {
        return VALID_FRAMEWORKS.includes(framework as Framework);
    },

    validatePageType(pageType: string): pageType is PageType {
        return VALID_PAGE_TYPES.includes(pageType as PageType);
    },

    validateComponentType(componentType: string): componentType is ComponentType {
        return VALID_COMPONENT_TYPES.includes(componentType as ComponentType);
    },

    getValidFrameworks(): readonly Framework[] {
        return VALID_FRAMEWORKS;
    },

    getValidPageTypes(): readonly PageType[] {
        return VALID_PAGE_TYPES;
    },

    getValidComponentTypes(): readonly ComponentType[] {
        return VALID_COMPONENT_TYPES;
    },
};
