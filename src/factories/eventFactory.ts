import { Event } from "../events/event";
import { OrderCreatedEvent } from "../events/orderCreated";

class EventFactory {
  createEvent(type: string, data: any): Event {
    switch (type) {
      case "order-created":
        return new OrderCreatedEvent(
          data.orderId,
          data.customerName,
          data.orderValue,
        );
      default:
        throw new Error(`Event type ${type} not supported.`);
    }
  }
}

export const eventFactory = new EventFactory();