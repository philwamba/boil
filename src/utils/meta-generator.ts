export interface MetaTagsOptions {
    title: string;
    description: string;
    keywords?: string[];
    author?: string;
    ogType?: string;
    ogImage?: string;
    twitterCard?: 'summary' | 'summary_large_image';
    themeColor?: string;
}

export function generateMetaTags(options: MetaTagsOptions): string {
    const {
        title,
        description,
        keywords = [],
        author = '',
        ogType = 'website',
        ogImage = '',
        twitterCard = 'summary_large_image',
        themeColor = '#3b82f6',
    } = options;

    const tags: string[] = [
        `<meta charset="UTF-8">`,
        `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
        `<meta http-equiv="X-UA-Compatible" content="IE=edge">`,
        `<title>${title}</title>`,
        `<meta name="description" content="${description}">`,
    ];

    if (keywords.length > 0) {
        tags.push(`<meta name="keywords" content="${keywords.join(', ')}">`);
    }

    if (author) {
        tags.push(`<meta name="author" content="${author}">`);
    }

    tags.push(`<meta name="theme-color" content="${themeColor}">`);

    // Open Graph tags
    tags.push(`<meta property="og:title" content="${title}">`);
    tags.push(`<meta property="og:description" content="${description}">`);
    tags.push(`<meta property="og:type" content="${ogType}">`);

    if (ogImage) {
        tags.push(`<meta property="og:image" content="${ogImage}">`);
    }

    // Twitter Card tags
    tags.push(`<meta name="twitter:card" content="${twitterCard}">`);
    tags.push(`<meta name="twitter:title" content="${title}">`);
    tags.push(`<meta name="twitter:description" content="${description}">`);

    if (ogImage) {
        tags.push(`<meta name="twitter:image" content="${ogImage}">`);
    }

    return tags.join('\n    ');
}

export function generateFaviconLinks(): string {
    return `<link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`;
}
