import { PostData } from "../data/Postdata";
import { UserData } from "../data/UserData";
import { Post } from "../types/types";

export class PostBusiness {
    private postData = new PostData();
    private userData = new UserData();

    public getAllPosts = () => {
        return this.postData.findAllPosts();
    }

    public createPost = (title: string, content: string, authorId: number) => {

      if (!title || !content || authorId === undefined) {
            throw new Error("Dados incompletos: 'title', 'content' e 'authorId' são obrigatórios.");
        }
        if (typeof title !== 'string' || title.length < 3) {
            throw new Error("Título inválido. Deve ser um texto com pelo menos 3 caracteres.");
        }
        if (typeof content !== 'string' || content.length < 10) {
            throw new Error("Conteúdo deve ter pelo menos 10 caracteres.");
        }
        if (!this.userData.findById(authorId)) {
            throw new Error("Autor não existe.");
        }
        
        const newPost: Post = {
            id: Date.now(),
            title,
            content,
            authorId,
            createdAt: new Date(),
            published: false,
        };
        
        this.postData.create(newPost);
        return newPost;
    }

    public updatePost = (id: number, dataToUpdate: any) => {
        if (isNaN(id)) { throw new Error("ID do post inválido."); }
        
        const post = this.postData.findById(id);
        if (!post) { throw new Error("Post não encontrado."); }
        
        if (dataToUpdate.id !== undefined || dataToUpdate.authorId !== undefined || dataToUpdate.createdAt !== undefined) {
            throw new Error("Não é possível atualizar os campos 'id', 'authorId' ou 'createdAt'.");
        }
        
        if (dataToUpdate.title !== undefined) {
            if (typeof dataToUpdate.title !== 'string' || dataToUpdate.title.length < 3) {
                throw new Error('Título deve ter pelo menos 3 caracteres.');
            }
            post.title = dataToUpdate.title;
        }
        if (dataToUpdate.content !== undefined) {
            if (typeof dataToUpdate.content !== 'string' || dataToUpdate.content.length < 10) {
                throw new Error('Conteúdo deve ter pelo menos 10 caracteres.');
            }
            post.content = dataToUpdate.content;
        }
        if (dataToUpdate.published !== undefined) {
            if (typeof dataToUpdate.published !== 'boolean') {
                throw new Error('O campo "published" deve ser booleano.');
            }
            post.published = dataToUpdate.published;
        }

        this.postData.update(id, post);
        return post;
    }
    
    public deletePost = (postId: number, userId: number) => {
        if (isNaN(postId) || isNaN(userId)) { throw new Error("IDs inválidos."); }
        
        const post = this.postData.findById(postId);
        if (!post) { throw new Error("Post não encontrado."); }

        const user = this.userData.findById(userId);
        if (!user) { throw new Error("Usuário não encontrado."); }
        
        if (post.authorId !== user.id && user.role !== 'admin') {
            throw new Error("Apenas o autor ou um admin podem deletar esse post.");
        }

        this.postData.delete(postId);
    }
}