import amqplib from "amqplib";
import { rabbitMQConfig } from "../config/rabbitMQConfig";
import logger from "../utils/logger";

export default class RabbitMQReceiver {
  connection!: amqplib.ChannelModel;
  channel!: amqplib.Channel;

  constructor() {
    this.initiate();
  }

  private async initiate() {
    try {
      this.connection = await amqplib.connect(rabbitMQConfig.GetRabbitmq_url());
      this.channel = await this.connection.createChannel();

      await this.channel.assertQueue(rabbitMQConfig.GetQueue_name(), { durable: true });
      await this.channel.bindQueue(rabbitMQConfig.GetQueue_name(), rabbitMQConfig.GetExchange_name(), rabbitMQConfig.GetRouting_key());

      logger.info(`RabbitMQReceiver: Connected: ${rabbitMQConfig.GetQueue_name()}`);
    } catch (error) {
      logger.error(`RabbitMQ: ${error}`);
      throw error;
    }
  }

  async receive() {
    await this.channel.consume(rabbitMQConfig.GetQueue_name(), (msg) => {
      if (msg) {
        logger.info(
          `RabbitMQReceiver: Order Proccessed: ${msg.content.toString()}`
        );
        this.channel.ack(msg);
      }
    });
  }
}
