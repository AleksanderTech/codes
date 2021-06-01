import { PromiseResponse } from "../types";

export interface Requests {

    get<T>(url: string, headers?: Headers): PromiseResponse<T>
}