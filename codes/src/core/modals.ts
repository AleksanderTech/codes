import { EventBus } from "./event/event-bus";
import { Events } from "./event/events";
import { ModalGuts } from "./model/modal-guts";

export function showErrorModal(modalGuts: ModalGuts): void {
    EventBus.$emit(Events.SHOW_MODAL, modalGuts);
}

export function showModal(modalGuts: ModalGuts): void {
    EventBus.$emit(Events.SHOW_MODAL, modalGuts);
}