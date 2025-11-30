import { fileUtils } from '../utils/file.js';

interface ComponentTemplateOptions {
    componentType: string;
    framework: string;
    outputPath: string;
}

export async function generateComponentTemplate(options: ComponentTemplateOptions): Promise<void> {
    const { componentType, framework, outputPath } = options;

    const componentHTML = generateComponentHTML(componentType, framework);

    await fileUtils.writeFile(outputPath, componentHTML);
}

function generateComponentHTML(componentType: string, framework: string): string {
    const templates: Record<string, (fw: string) => string> = {
        navbar: generateNavbar,
        hero: generateHero,
        card: generateCard,
        footer: generateFooter,
        sidebar: generateSidebar,
        modal: generateModal,
        form: generateForm,
    };

    const generator = templates[componentType] || templates.navbar;
    return generator(framework);
}

function generateNavbar(framework: string): string {
    if (framework === 'bootstrap') {
        return `<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Brand</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`;
    }

    return `<!-- Navbar Component for ${framework} -->
<nav>
  <a href="#">Brand</a>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`;
}

function generateHero(framework: string): string {
    return `<!-- Hero Component for ${framework} -->
<section class="hero">
  <h1>Welcome to Our Site</h1>
  <p>Your tagline goes here</p>
  <button>Get Started</button>
</section>`;
}

function generateCard(framework: string): string {
    if (framework === 'bootstrap') {
        return `<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;
    }

    return `<!-- Card Component for ${framework} -->
<div class="card">
  <img src="..." alt="...">
  <h3>Card title</h3>
  <p>Card content goes here.</p>
  <button>Action</button>
</div>`;
}

function generateFooter(framework: string): string {
    return `<!-- Footer Component for ${framework} -->
<footer>
  <div class="container">
    <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
  </div>
</footer>`;
}

function generateSidebar(framework: string): string {
    return `<!-- Sidebar Component for ${framework} -->
<aside class="sidebar">
  <nav>
    <ul>
      <li><a href="#">Dashboard</a></li>
      <li><a href="#">Profile</a></li>
      <li><a href="#">Settings</a></li>
      <li><a href="#">Logout</a></li>
    </ul>
  </nav>
</aside>`;
}

function generateModal(framework: string): string {
    if (framework === 'bootstrap') {
        return `<div class="modal fade" id="exampleModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>`;
    }

    return `<!-- Modal Component for ${framework} -->
<div class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Modal Title</h2>
    <p>Modal content goes here.</p>
  </div>
</div>`;
}

function generateForm(framework: string): string {
    return `<!-- Form Component for ${framework} -->
<form>
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="4" required></textarea>
  </div>
  <button type="submit">Submit</button>
</form>`;
}
