import { html, render } from "lit-html"

const template = html`
    <p>Nice nice nice</p>
` 

class Test extends HTMLElement {
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

customElements.define("test-component", Test)
