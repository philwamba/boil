# Contributing to Boil CLI

Thank you for your interest in contributing to Boil! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Git
- TypeScript knowledge

### Setup Development Environment

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/boil.git
cd boil

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev
```

## 📝 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Your Changes

- Write clean, readable TypeScript code
- Follow existing code style (use Prettier and ESLint)
- Add comments for complex logic
- Keep functions small and focused

### 3. Test Your Changes

```bash
# Build the project
npm run build

# Test CLI commands manually
node dist/cli/index.js --help
node dist/cli/index.js new test-app --framework tailwind
```

### 4. Format and Lint

```bash
# Format code
npm run format

# Check for lint errors
npm run lint

# Fix lint errors
npm run lint:fix
```

### 5. Commit Your Changes

Follow conventional commits format:

```bash
git commit -m "feat: add new Bootstrap component"
git commit -m "fix: resolve template rendering bug"
git commit -m "docs: update README examples"
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

## 🎨 Adding New Templates

### Adding a New Framework

1. **Add to validator** (`src/utils/validator.ts`):

```typescript
const VALID_FRAMEWORKS = [
    // ... existing
    'yourframework',
] as const;
```

2. **Create template directory**:

```bash
mkdir -p src/templates/yourframework
```

3. **Add template files**:

- `index.html` - Main template
- `main.css` - Custom styles
- Any other required files

4. **Update generator** (`src/generators/boilerplate.ts`):
   Add your framework to `getFrameworkCDN()` function.

5. **Test thoroughly**:

```bash
node dist/cli/index.js new test --framework yourframework
```

### Adding a New Page Template

1. Update `validator.ts` with new page type
2. Add template to `src/generators/page.ts`
3. Create framework-specific versions if needed
4. Update documentation

### Adding a New Component

1. Update `validator.ts` with new component type
2. Add template to `src/generators/component.ts`
3. Create framework-specific versions
4. Update documentation

## 🐛 Reporting Bugs

### Before Reporting

- Check existing issues
- Verify it's reproducible
- Test with latest version

### Bug Report Template

```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:

1. Run command '...'
2. See error

**Expected behavior**
What you expected to happen.

**Environment:**

- Boil version:
- Node version:
- OS:

**Additional context**
Any other relevant information.
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Feature Description**
Clear description of the feature.

**Use Case**
Why is this feature needed?

**Proposed Solution**
How would you implement it?

**Alternatives**
Other approaches you've considered.
```

## 📋 Pull Request Process

1. **Update documentation** if needed
2. **Add yourself** to contributors (if first contribution)
3. **Create PR** with clear description
4. **Link related issues**
5. **Wait for review**

### PR Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No lint errors
- [ ] Builds successfully
- [ ] Manually tested

### PR Template

```markdown
## Description

Brief description of changes.

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

How has this been tested?

## Related Issues

Fixes #123
```

## 🎯 Code Style Guidelines

### TypeScript

- Use TypeScript strict mode
- Prefer `const` over `let`
- Use descriptive variable names
- Add type annotations for function parameters
- Use interfaces for object shapes

### Formatting

- **Indentation**: 4 spaces (configured in Prettier)
- **Quotes**: Single quotes
- **Line Length**: 100 characters max
- **Semicolons**: Required

### File Organization

```
src/
├── cli/           # CLI commands
├── utils/         # Utility modules
├── generators/    # Template generators
└── templates/     # HTML/CSS templates
```

## 🏆 Recognition

Contributors will be:

- Listed in README
- Thanked in release notes
- Given credit in documentation

## 📜 Code of Conduct

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

## 📞 Contact

- **Issues**: [GitHub Issues](https://github.com/philwamba/boil/issues)
- **Email**: philwamba@yahoo.com
- **Discussions**: [GitHub Discussions](https://github.com/philwamba/boil/discussions)

## 📚 Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Commander.js Guide](https://github.com/tj/commander.js)
- [Inquirer.js Documentation](https://github.com/SBoudrias/Inquirer.js)

Thank you for helping make Boil better! 🎉
