export type Theme = 'light' | 'dark' | 'auto';

export function generateThemeCSS(theme: Theme = 'auto'): string {
    return `:root {
  /* Light mode colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f3f4f6;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
  --accent-color: #3b82f6;
  --accent-hover: #2563eb;
}

${
    theme === 'dark' || theme === 'auto'
        ? `
@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode colors */
    --bg-primary: #111827;
    --bg-secondary: #1f2937;
    --text-primary: #f9fafb;
    --text-secondary: #9ca3af;
    --border-color: #374151;
    --accent-color: #60a5fa;
    --accent-hover: #3b82f6;
  }
}
`
        : ''
}

[data-theme="dark"] {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --border-color: #374151;
  --accent-color: #60a5fa;
  --accent-hover: #3b82f6;
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f3f4f6;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
  --accent-color: #3b82f6;
  --accent-hover: #2563eb;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}`;
}

export function generateThemeToggleScript(): string {
    return `// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Get saved theme or default to 'auto'
const savedTheme = localStorage.getItem('theme') || 'auto';

function setTheme(theme) {
  if (theme === 'auto') {
    html.removeAttribute('data-theme');
  } else {
    html.setAttribute('data-theme', theme);
  }
  localStorage.setItem('theme', theme);
}

// Set initial theme
setTheme(savedTheme);

// Theme toggle button click
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'auto';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (localStorage.getItem('theme') === 'auto') {
    // Trigger re-render of auto theme
    html.removeAttribute('data-theme');
  }
});`;
}
