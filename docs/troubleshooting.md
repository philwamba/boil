# Troubleshooting Guide

Common issues and solutions for Boil CLI.

## Installation Issues

### Error: Node version too old

**Error Message:**

```
You are running Node 16.x.x
Boil requires Node 18 or higher
```

**Solution:**
Update Node.js to version 18 or higher:

```bash
# Using nvm
nvm install 18
nvm use 18

# Or download from nodejs.org
```

---

### Error: Permission denied during global install

**Error Message:**

```
EACCES: permission denied
```

**Solution:**
Use npm's recommended approach or sudo:

```bash
# Option 1: Use npx (no installation)
npx boil new myapp

# Option 2: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Option 3: Use sudo (not recommended)
sudo npm install -g boil
```

---

## Command Issues

### Error: Command not found

**Error Message:**

```
bash: boil: command not found
```

**Solutions:**

1. **If installed globally:**

    ```bash
    # Check if installed
    npm list -g boil

    # Reinstall if needed
    npm install -g boil
    ```

2. **Check PATH:**

    ```bash
    # Add npm global bin to PATH
    export PATH=$(npm bin -g):$PATH
    ```

3. **Use npx:**
    ```bash
    npx boil <command>
    ```

---

### Error: Directory already exists

**Error Message:**

```
✖ Directory "my-app" already exists!
```

**Solutions:**

1. **Choose different name:**

    ```bash
    boil new my-app-2
    ```

2. **Remove existing directory:**

    ```bash
    rm -rf my-app
    boil new my-app
    ```

3. **Generate in existing directory:**
    ```bash
    cd my-app
    boil generate:page landing
    ```

---

### Error: Invalid framework

**Error Message:**

```
✖ Invalid framework: reactjs
```

**Solution:**
Use a valid framework name:

```bash
# List valid frameworks
boil new myapp --help

# Valid options
boil new myapp --framework bootstrap
boil new myapp --framework tailwind
boil new myapp --framework materialize
boil new myapp --framework skeleton
boil new myapp --framework daisyui
boil new myapp --framework vanilla
boil new myapp --framework html5
```

---

## Template Issues

### Styles not loading

**Problem:** Generated HTML doesn't show styles.

**Solutions:**

1. **Check internet connection** (for CDN-based frameworks)
2. **Check browser console** for errors
3. **Verify CDN links:**

    ```html
    <!-- Make sure these load -->
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
    />
    ```

4. **Check file paths:**
    ```html
    <!-- Relative paths should be correct -->
    <link rel="stylesheet" href="assets/css/main.css" />
    ```

---

### JavaScript not working

**Problem:** Interactive features don't work.

**Solutions:**

1. **Check browser console** for errors
2. **Verify script placement:**

    ```html
    <!-- Scripts should be at end of body -->
    <script src="assets/js/main.js"></script>
    </body>
    ```

3. **Check framework JS dependencies:**

    ```html
    <!-- Bootstrap needs its JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Materialize needs its JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    ```

4. **Initialize components:**
    ```javascript
    // Materialize example
    document.addEventListener('DOMContentLoaded', function () {
        M.AutoInit();
    });
    ```

---

### Mobile menu not working

**Problem:** Hamburger menu doesn't open.

**Solutions:**

1. **Check JavaScript is included:**

    ```html
    <script src="assets/js/main.js"></script>
    ```

2. **Verify IDs match:**

    ```html
    <!-- Button and menu must have matching IDs -->
    <button id="mobile-menu-btn">Menu</button>
    <div id="mobile-menu">...</div>
    ```

3. **Check event listeners:**

    ```javascript
    const toggle = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
    ```

---

## Preview Server Issues

### Error: Port already in use

**Error Message:**

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
Use different port:

```bash
boil preview --port 8080
```

Or kill process using port:

```bash
# Mac/Linux
lsof -ti:3000 | xargs kill

# Or find and kill
ps aux | grep sirv
kill <PID>
```

---

### Preview not updating

**Problem:** Changes don't appear in browser.

**Solutions:**

1. **Hard refresh:** Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
2. **Clear cache:**
    - Chrome: DevTools → Network → Disable cache
3. **Restart server:**
    ```bash
    # Stop with Ctrl+C
    # Restart
    boil preview
    ```

---

## Preset Issues

### Preset not found

**Error Message:**

```
✖ Preset "mydefault" not found
```

**Solutions:**

1. **List available presets:**

    ```bash
    boil list-presets
    ```

2. **Create the preset:**

    ```bash
    boil save-preset mydefault
    ```

3. **Check config location:**

    ```bash
    # Config is stored in
    ~/.config/boil/presets.json

    # Check if file exists
    ls ~/.config/boil/
    ```

---

## Deployment Issues

### Git not initialized

**Error Message:**

```
Not a git repository
```

**Solution:**
Initialize Git first:

```bash
git init
git add .
git commit -m "Initial commit"
boil deploy
```

---

### Deploy fails

**Problem:** `boil deploy` command fails.

**Solutions:**

1. **Check Git remote:**

    ```bash
    git remote -v
    # Should show your GitHub repo

    # Add if missing
    git remote add origin https://github.com/username/repo.git
    ```

2. **Install gh-pages:**

    ```bash
    npm install -g gh-pages
    ```

3. **Manual deployment:**
    ```bash
    git checkout -b gh-pages
    git push origin gh-pages
    ```

---

## Configuration Issues

### Config not saving

**Problem:** Settings don't persist.

**Solutions:**

1. **Check permissions:**

    ```bash
    # Config directory should be writable
    ls -la ~/.config/boil/

    # Fix if needed
    chmod 755 ~/.config/boil/
    ```

2. **Check disk space:**

    ```bash
    df -h
    ```

3. **Reset config:**
    ```bash
    rm -rf ~/.config/boil/
    # Boil will recreate on next run
    ```

---

## Build/Development Issues

### TypeScript compilation errors

**Problem:** `npm run build` fails.

**Solutions:**

1. **Clean and rebuild:**

    ```bash
    rm -rf dist node_modules
    npm install
    npm run build
    ```

2. **Check TypeScript version:**

    ```bash
    npm list typescript
    # Should be 5.3.3 or higher
    ```

3. **Check Node version:**
    ```bash
    node --version
    # Must be 18 or higher
    ```

---

### ESLint errors

**Problem:** `npm run lint` shows errors.

**Solutions:**

1. **Auto-fix:**

    ```bash
    npm run lint:fix
    ```

2. **Format code:**
    ```bash
    npm run format
    ```

---

## Performance Issues

### Slow generation

**Problem:** `boil new` takes too long.

**Possible Causes:**

1. **Slow disk** - SSD recommended
2. **Antivirus scanning** - Exclude project directory
3. **Large node_modules** - Normal for first install

**Solutions:**

1. **Use SSD** for projects
2. **Exclude from antivirus:**
    - Windows Defender: Add exclusion for project folder
3. **Clear npm cache:**
    ```bash
    npm cache clean --force
    ```

---

## Platform-Specific Issues

### Windows: Line endings

**Problem:** Git shows all files as modified.

**Solution:**
Configure Git line endings:

```bash
git config --global core.autocrlf true
```

---

### Windows: Permission errors

**Problem:** Cannot create files/directories.

**Solutions:**

1. **Run as Administrator**
2. **Check folder permissions**
3. **Disable UAC temporarily**

---

### Mac: Quarantine warnings

**Problem:** "App cannot be opened" warnings.

**Solution:**

```bash
xattr -d com.apple.quarantine /usr/local/bin/boil
```

---

## Getting More Help

### Check Version

```bash
boil --version
```

### Verbose Output

Run commands with Node debugging:

```bash
NODE_DEBUG=* boil new myapp
```

### Report Issues

1. **GitHub Issues:** [github.com/philwamba/boil/issues](https://github.com/philwamba/boil/issues)
2. **Include:**
    - Boil version (`boil --version`)
    - Node version (`node --version`)
    - Operating system
    - Full error message
    - Steps to reproduce

### Community Resources

- Documentation: [Check the docs folder](.)
- Examples: [See generated templates](../src/templates/)
- Contributing: [CONTRIBUTING.md](../CONTRIBUTING.md)

## Debug Mode

Enable debug output:

```bash
DEBUG=boil:* boil new myapp
```

## Common Solutions Checklist

- [ ] Node.js version >= 18
- [ ] Internet connection (for CDN frameworks)
- [ ] Disk space available
- [ ] Write permissions in target directory
- [ ] No firewall blocking npm/CDN
- [ ] Latest version of Boil installed
- [ ] Clear npm cache if issues persist
- [ ] Try with `npx boil` instead of global install

## Still Having Issues?

If none of these solutions work:

1. **Try the nuclear option:**

    ```bash
    # Uninstall completely
    npm uninstall -g boil
    rm -rf ~/.config/boil/

    # Clear cache
    npm cache clean --force

    # Reinstall
    npm install -g boil
    ```

2. **Use npx (no installation):**

    ```bash
    npx boil@latest new myapp
    ```

3. **Report the bug:**
    - GitHub: [github.com/philwamba/boil/issues](https://github.com/philwamba/boil/issues)
    - Email: philwamba@yahoo.com
