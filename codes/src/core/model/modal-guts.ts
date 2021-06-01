import { ModalCallback } from "../types";

export class ModalGuts {

    constructor(
        public title: string,
        public texts: string[],
        public callback: ModalCallback,
        public errors: boolean) { }

    static blank(): ModalGuts {
        return new ModalGuts('', [], () => { }, false);
    }

    static modalGuts(title = '', texts:string[] = [], callback = () => { }, errors = false): ModalGuts {
        return new ModalGuts(title, texts, callback, errors);
    }

    static errorModalGuts(title = '', texts:string[] = [], callback = () => { }, errors = true): ModalGuts {
        return new ModalGuts(title, texts, callback, errors);
    }
}