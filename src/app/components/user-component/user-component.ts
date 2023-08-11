import {html, render} from "lit-html"

const template = html`
    <p>So, this is template driven HTML</p>
    <h1>Überschrift</h1>
`


class UserComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this.render()
        this.attachClickEvent()
    }

    private attachClickEvent() {
        // Wähle das Element aus dem Shadow DOM aus, auf das der Event-Listener angewendet werden soll
        const heading = this.shadowRoot.querySelector("h1");

        // Füge den Event-Listener hinzu
        heading.addEventListener("click", () => {
            this.showMessage("You clicked the heading!");
        });
    }

    private showMessage(message) {
        // Erstelle ein neues Element für die Nachricht
        const messageElement = document.createElement("p");
        messageElement.textContent = message;

        // Füge das Element dem Shadow DOM hinzu
        this.shadowRoot.appendChild(messageElement);
    }

    private render() {

        render(template, this.shadowRoot)
    }
}

customElements.define("user-component", UserComponent)