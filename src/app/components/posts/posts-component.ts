import {html, render} from "lit-html"
import {Post} from "../../model/Post.model"
import httpservice from "../../service/http.service"
import store from "../../model/store"
import {distinctUntilChanged, map} from "rxjs"

const template = html`

`

const rowTemplate = (post: Post, onclick: (post: Post) => void) => html`
    <tr @click=${() => onclick(post)}>
        <td>${post.id}</td>
        <td>${post.title}</td>
    </tr>
`

class Posts extends HTMLElement {
    private _updateComplete = false

    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }

    get updateComplete(): Boolean {
        return this._updateComplete
    }

    connectedCallback() {
        httpservice.fetchPosts()
        store
            .pipe(
                map(model => model.posts),
                distinctUntilChanged()
            )
            .subscribe(posts => {
                this.render(posts)
            })
    }

    render(posts: Array<Post>) {
        this._updateComplete = false
        const userClicked = (post: Post) => {
            alert(`user ${post.body} selected`)
        }
        const rows = posts.map(user => rowTemplate(user, userClicked))
        const tableTemplate = html`
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <table class="w3-table-all">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                ${rows}
                </tbody>
            </table>
        `
        render(tableTemplate, this.shadowRoot)
        this._updateComplete = true
    }
}

customElements.define("posts-component", Posts)
