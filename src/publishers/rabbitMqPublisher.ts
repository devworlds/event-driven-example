import amqplib from "amqplib";
import { Event } from "../events/event";
import { rabbitMQConfig } from "../config/rabbitMQConfig";

export default class RabbitMQPublisher {
  private connection!: amqplib.Connection;
  private channel!: amqplib.Channel;

  constructor() {
    this.init();
  }

  private async init() {
    try {
      this.connection = await amqplib.connect(rabbitMQConfig.GetRabbitmq_url());
      this.channel = await this.connection.createChannel();

      await this.channel.assertExchange(rabbitMQConfig.GetExchange_name(), "fanout", {
        durable: true,
      });

      console.info("RabbitMQPublisher: Connected and Channel is open.");
    } catch (error) {
      console.error(
        "RabbitMQPublisher: Fail to connect or create channel",
        error
      );
    }
  }

  private async ensureChannel() {
    if (!this.channel || !this.channel.connection) {
      console.info("RabbitMQPublisher: Reconnecting channel...");
      await this.init();
    }
  }

  async publish(event: Event) {
    try {
      await this.ensureChannel();

      this.channel.publish(
        rabbitMQConfig.GetExchange_name(),
        rabbitMQConfig.GetRouting_key(),
        Buffer.from(JSON.stringify(event.data))
      );
      console.info(
        `RabbitMQPublisher: Order Published on Exchange: ${rabbitMQConfig.GetExchange_name()}`
      );
    } catch (error) {
      console.error("RabbitMQPublisher: Error to publish order:", error);
    }
  }

  async close() {
    try {
      if (this.channel) {
        await this.channel.close();
        console.info("RabbitMQPublisher: Channel closed.");
      }
      if (this.connection) {
        await this.connection.close();
        console.info("RabbitMQPublisher: Connection closed.");
      }
    } catch (error) {
      console.error(
        "RabbitMQPublisher: Error closing RabbitMQ connection or channel:",
        error
      );
    }
  }
}
