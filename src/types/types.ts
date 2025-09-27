export type User = {
    id: number;
    name: string;
    email: string;
    senha: string;
    age: number;
    role: string;
};

export type Post = {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: Date;
    published: boolean;
};