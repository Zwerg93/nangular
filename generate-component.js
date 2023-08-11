const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
    console.error('Usage: npm run generate <componentName>');
    process.exit(1);
}

const componentFolderPath = path.join(__dirname, 'src', 'app', 'components', componentName);

try {
    // Erstelle den Ordner für die Komponente
    fs.mkdirSync(componentFolderPath);

    // Erstelle die Dateien in der Komponente
    const indexContent = `import "./${componentName}-component";`;
    fs.writeFileSync(path.join(componentFolderPath, 'index.ts'), indexContent);

    const componentContent = `
    import { html, render } from "lit-html"
    const template = html\`
    \` 
        class ${capitalizeFirstLetter(componentName)} extends HTMLElement {
            constructor() {
                super()
                this.attachShadow({mode: "open"})
            }
            connectedCallback() {
                this.render()
            }
            private render() {
                render(template, this.shadowRoot)
            }
        }
        customElements.define("${componentName}-component", ${capitalizeFirstLetter(componentName)})
`;

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    fs.writeFileSync(path.join(componentFolderPath, `${componentName}-component.ts`), componentContent);

    console.log(`Komponente ${componentName} wurde erfolgreich generiert.`);
} catch (error) {
    console.error('Fehler beim Generieren der Komponente:', error);
}
