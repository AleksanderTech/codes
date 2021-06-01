import { isNext } from "../link-parser";
import { DataPage } from "../model/data-page";
import { Requests } from "../request/requests";
import { PromiseResponse, Login, UserDataPage } from "../types";
import { Response } from '../model/response';
import { User } from "../model/user";
import { UserResponse } from "../model/user-response";
import { Errors } from "../error/errors";

export class UserController {
    constructor(
        private readonly usersEndpoint: string,
        private readonly requests: Requests
    ) { }

    nextUsers(perPage: number, url?: string): PromiseResponse<UserDataPage> {
        return this.requests.get<Login[]>(url ? url : `${this.usersEndpoint}?per_page=${perPage}`).then((r => {
            if (r.areErrors()) {
                return Response.errors<UserDataPage>(r.errors).toPromise();
            }
            if (r.value) {
                const link = r.headers.get("link");
                const userPage = DataPage.fromResource<User>(isNext(link));
                const userPromises = r.value.map(user => this.getUserByLogin(user.login));
                return this.promiseAllUsers(userPromises, userPage);
            }
            return Response.success<UserDataPage>().toPromise();
        }));
    }

    private getUserByLogin(login: string): PromiseResponse<User> {
        return this.requests.get<UserResponse>(`${this.usersEndpoint}/${login}`).then(r => {
            if (r.areErrors()) {
                return Response.errors<User>(r.errors).toPromise();
            }
            if (r.value) {
                return Response.successOf<User>(User.fromUserResponse(r.value)).toPromise();
            }
            return Response.errors<User>([Errors.USER_NOT_FOUND]).toPromise();
        })
    }

    private promiseAllUsers(promises: PromiseResponse<User>[], userPage: UserDataPage): PromiseResponse<UserDataPage> {
        return Promise.all(promises).then(r => {
            const errors = [] as string[]
            r.filter(r => r.areErrors()).forEach(r => errors.concat(r.errors))
            if (errors.length > 0) {
                return Response.errors<UserDataPage>(errors).toPromise();
            }
            userPage.data = r.filter(r => r.value).map(r => r.value as User)
            return Response.successOf<UserDataPage>(userPage).toPromise();
        });
    }
}