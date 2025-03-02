import amqplib from "amqplib";
import { Event } from "../events/event";
import { rabbitMQConfig } from "../config/rabbitMQConfig";
import logger from "../utils/logger";

export default class RabbitMQPublisher {
  private connection!: amqplib.ChannelModel;
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

      logger.info("RabbitMQPublisher: Connected and Channel is open.");
    } catch (error) {
      logger.error(
        "RabbitMQPublisher: Fail to connect or create channel",
        error
      );
    }
  }

  private async ensureChannel() {
    if (!this.channel || !this.channel.connection) {
      logger.info("RabbitMQPublisher: Reconnecting channel...");
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
      logger.info(
        `RabbitMQPublisher: Published on ${rabbitMQConfig.GetExchange_name()}`
      );
    } catch (error) {
      logger.error(`RabbitMQPublisher: ${error}`);
    }
  }

  async close() {
    try {
      if (this.channel) {
        await this.channel.close();
        logger.info("RabbitMQPublisher: Channel closed.");
      }
      if (this.connection) {
        await this.connection.close();
        logger.info("RabbitMQPublisher: Connection closed.");
      }
    } catch (error) {
      logger.error(
        "RabbitMQPublisher: Error closing RabbitMQ connection or channel:",
        error
      );
    }
  }
}
