import {setUsers, setPosts} from "../model/store"

const USER_URL = "https://jsonplaceholder.typicode.com/users"
const POST_URL = "https://jsonplaceholder.typicode.com/posts"

class Httpservice {
    async fetchAll() {
        const response = await fetch(USER_URL)
        const users = await response.json()
        setUsers(users)
    }

    async fetchPosts() {
        const response = await fetch(POST_URL)
        const posts = await response.json()
        setPosts(posts)
    }
}

const httpservice = new Httpservice()
export default httpservice