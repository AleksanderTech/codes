import { Resource } from "./Resource";

export class DataPage<T> {
    
    constructor(
        public data: T[],
        public nextResource: Resource) { }

        static empty<T>():DataPage<T>{
            return new DataPage([],{} as Resource);
        }
        static fromResource<T>(resource: Resource): DataPage<T> {
            return new DataPage([], resource);
        }
}