import { User } from "../types/types";
import { users } from "./database";

export class UserData {
    public findAllUsers = () => {
        return users;
    }

    public findById = (id: number) => {
        return users.find((u) => u.id === id);
    };

    public findByEmail = (email: string) => {
        return users.find(u => u.email === email);
    }

    public findByAgeRange = (min: number, max: number) => {
        return users.filter((user) => user.age >= min && user.age <= max);
    };
    
    public deleteUsers = (usersToDelete: User[]) => {
        const idsToDelete = usersToDelete.map(u => u.id);
        const updatedUsers = users.filter(user => !idsToDelete.includes(user.id));

        users.splice(0, users.length, ...updatedUsers);
    }
}