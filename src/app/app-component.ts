import {html, render} from "lit-html"

import "./components/user-component"
import "./components/song-component"
import "./components/test"
import "./components/posts"
import {USER_SELECTED_EVENT} from "../app/components/user-component"


const template = html`
    <p>Test</p>
    <user-component></user-component>
    <song-component></song-component>
    <test-component></test-component>
    <posts-component></posts-component>
`

class AppComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        console.log("app component connected")
        this.render()
    }

    private render() {
        render(template, this.shadowRoot)
        const userTableComponent = this.shadowRoot.querySelector<HTMLElement>("song-component")
        const userComponent = this.shadowRoot.querySelector<HTMLElement>("user-component")

        userTableComponent.addEventListener(USER_SELECTED_EVENT, (e: CustomEvent) => {
            const user = e.detail.user
            userComponent.setAttribute("selected-user", user.id)
            userComponent.style.display = "block"
            userTableComponent.style.display = "none"
            console.log("event: user selected:", user)
        })

    }
}

customElements.define("app-component", AppComponent)