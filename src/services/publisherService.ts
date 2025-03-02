import { Event } from "../events/event";
import { publisherFactory } from "../factories/publisherFactory";
import Publisher from "../publishers/publisher";
import dotenv from 'dotenv';

dotenv.config();

const publisherType = process.env.PUBLISHER_TYPE || "rabbitmq";

class PublisherService {
  private publisher: Publisher;

  constructor(publisher: Publisher) {
    this.publisher = publisher;
  }

  async publishEvent(event: Event): Promise<void> {
    await this.publisher.publish(event);
  }
}

export const publishService = new PublisherService(publisherFactory.createPublisher(publisherType))