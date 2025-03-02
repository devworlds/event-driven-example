import Receiver from "../consumers/consumer";
import RabbitMQReceiver from "../consumers/rabbitMqReceiver";
import SqsReceiver from "../consumers/sqsReceiver";

class ConsumerFactory {
  createConsumer(type: string): Receiver {
    switch (type) {
      case "sqs":
        return new SqsReceiver();
      case "rabbitmq":
        return new RabbitMQReceiver();
      default:
        throw new Error("consumer type not supported.");
    }
  }
}

export const consumerFactory = new ConsumerFactory();
