import { Event } from "./event";

export class OrderCreatedEvent implements Event {
  topic: string = "order-created"
  data: any
  timestamp: string;

  constructor(orderId: string, customerName: string, orderValue: number) {
    this.data = {
      orderId,
      customerName,
      orderValue
    };
    this.timestamp = new Date().toISOString();
  }
}
