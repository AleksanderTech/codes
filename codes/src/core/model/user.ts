import { UserResponse } from "./user-response";

export class User {
    
    constructor(
        public login: string,
        public avatarUrl: string,
        public createdAt: Date
    ) { }

    static fromUserResponse(res: UserResponse): User {
        return new User(res.login, res.avatar_url, new Date(res.created_at));
    }
}