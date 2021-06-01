import { OrganizationResponse } from "./organization-response";

export class Organization {

    constructor(
        public login: string,
        public followers: number,
        public repos: number,
        public createdAt: Date
    ) { }

    static fromOrganizationResponse(res: OrganizationResponse): Organization {
        return new Organization(res.login, res.followers, res.public_repos, new Date(res.created_at));
    }
}