import { Post } from "../types/types";
import { posts } from "./database";

export class PostData {
    public findAllPosts = () => {
        return posts;
    }

    public findById = (id: number) => {
        return posts.find((p) => p.id === id);
    }

    public create = (newPost: Post) => {
        posts.push(newPost);
    }
    
    public update = (id: number, updatedPost: Post) => {
        const index = posts.findIndex(p => p.id === id);
        if (index > -1) {
            posts[index] = updatedPost;
        }
    }
    
    public delete = (id: number) => {
        const index = posts.findIndex(p => p.id === id);
        if (index > -1) {
            posts.splice(index, 1);
        }
    }
}