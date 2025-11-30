export type IconLibrary = 'heroicons' | 'fontawesome' | 'none';

export function getIconCDN(library: IconLibrary): string {
    switch (library) {
        case 'heroicons':
            return `<script src="https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/index.js"></script>`;
        case 'fontawesome':
            return `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer">`;
        default:
            return '';
    }
}

export function getIconExample(library: IconLibrary): string {
    switch (library) {
        case 'heroicons':
            return `<!-- HeroIcons Example -->
<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
</svg>`;
        case 'fontawesome':
            return `<!-- Font Awesome Example -->
<i class="fas fa-home"></i>
<i class="fas fa-user"></i>
<i class="fas fa-bars"></i>`;
        default:
            return '';
    }
}

export function getIconsComment(library: IconLibrary): string {
    switch (library) {
        case 'heroicons':
            return `<!-- HeroIcons: https://heroicons.com/ -->`;
        case 'fontawesome':
            return `<!-- Font Awesome: https://fontawesome.com/icons -->`;
        default:
            return '';
    }
}
