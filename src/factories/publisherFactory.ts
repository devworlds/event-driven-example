import { SnsPublisher } from "../publishers/snsPublisher";
import Publisher from "../publishers/publisher";
import RabbitMQPublisher from "../publishers/rabbitMqPublisher";

class PublisherFactory {
  createPublisher(type: string): Publisher {
    switch (type) {
      case "sns":
        return new SnsPublisher();
      case "rabbitmq":
        return new RabbitMQPublisher();
      default:
        throw new Error("Publisher type not supported.");
    }
  }
}

export const publisherFactory = new PublisherFactory();
