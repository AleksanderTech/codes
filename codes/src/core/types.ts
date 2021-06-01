import { DataPage } from './model/data-page';
import { Organization } from './model/organization';
import { Repository } from './model/repository';
import { Response } from './model/response'
import { User } from './model/user';

export type PromiseResponse<T> = Promise<Response<T>>;
export type ModalCallback = (obj?: any) => void;
export type ApiResponse = { message: string } | any;
export type OrgDataPage = DataPage<Organization>;
export type UserDataPage = DataPage<User>;
export type RepoDataPage = DataPage<Repository>;
export type Login = { login: string }
export type FullName = { full_name: string }