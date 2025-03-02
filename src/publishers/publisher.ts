import { Event } from "../events/event"

export default interface Publisher {
    publish(message: Event): Promise<void>;
}