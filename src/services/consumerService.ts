import Receiver from "../consumers/consumer";
import { consumerFactory } from "../factories/consumerFactory";
import dotenv from 'dotenv';

dotenv.config();

class ConsumerService {
  private receiver: Receiver;

  constructor(receiver: Receiver) {
    this.receiver = receiver;
  }

  receiveEvent() {
    this.receiver.receive();
  }
}

const receiverType = process.env.RECEIVER_TYPE || "rabbitmq";
export const consumerService = new ConsumerService(consumerFactory.createConsumer(receiverType));