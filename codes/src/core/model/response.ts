export class Response<T> {

    private  _value: T | null;
    private readonly _errors: string[]
    private readonly _headers: Headers

    constructor(value: T | null, errors: string[], headers: Headers) {
        this._value = value;
        this._errors = errors;
        this._headers = headers;
    }

    get value() {
        return this._value;
    }

    get errors() {
        return this._errors;
    }

    get headers() {
        return this._headers;
    }

    areErrors(): boolean {
        return this._errors && this._errors.length > 0;
    }

    toPromise(): Promise<Response<T>> {
        return new Promise(resolve => {
            resolve(this);
        });
    }

    static success<T>(): Response<T> {
        return new Response<T>(null, [], new Headers());
    }

    static successOf<T>(value: T, headers = new Headers()): Response<T> {
        return new Response<T>(value, [], headers);
    }

    static errors<T>(errors: string[], headers = new Headers()): Response<T> {
        return new Response<T>(null, errors, headers);
    }
}