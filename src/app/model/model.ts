import { User } from "./User.model";
import {Post} from "./Post.model";

/**
 * Our readonly single source of truth model
 */
export interface Model {
    readonly users: User[]
    readonly posts: Post[]
}