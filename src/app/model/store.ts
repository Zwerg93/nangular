import produce from "immer"
import {BehaviorSubject} from "rxjs"
import {Model} from "./model"
import {User} from "./User.model"
import {Post} from "./Post.model";

const store = createStore()

export function setUsers(users: User[]) {
    let nextState = produce(store.getValue(), draft => {
        draft.users = users
    })
    store.next(nextState)
}

export function setPosts(posts: Post[]) {
    let nextState = produce(store.getValue(), draft => {
        draft.posts = posts
    })
    store.next(nextState)
}

function createStore() {
    const initialState: Model = {
        users: [],
        posts: []
    }
    return new BehaviorSubject<Model>(initialState)
}

export default store
