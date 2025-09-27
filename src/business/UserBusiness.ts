import { PostData } from "../data/Postdata";
import { UserData } from "../data/UserData";
import { User } from "../types/types";

export class UserBusiness {
    private userData = new UserData();
    private postData = new PostData();

    public getUserById = (id: number) => {
        if (isNaN(id)) {
            throw new Error("ID inválido. Deve ser um número.");
        }
        const user = this.userData.findById(id);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
        return user;
    }

    public getUsersByAgeRange = (min: number, max: number) => {
        if (isNaN(min) || isNaN(max)) {
            throw new Error("Parâmetros 'min' e 'max' são obrigatórios e devem ser números.");
        }
        return this.userData.findByAgeRange(min, max);
    }
    
    public cleanupInactiveUsers = (confirm: string) => {
        if (confirm !== "true") {
            throw new Error("Para confirmar a limpeza, envie 'true' no parâmetro de consulta 'confirm'");
        }
        
        const allPosts = this.postData.findAllPosts();
        const allUsers = this.userData.findAllUsers();
        
        const usersToRemove = allUsers.filter((user) => {
            const hasPosts = allPosts.some((post) => post.authorId === user.id);
            return !hasPosts && user.role !== "admin";
        });

        if (usersToRemove.length > 0) {
            this.userData.deleteUsers(usersToRemove);
        }

        return usersToRemove;
    }
}