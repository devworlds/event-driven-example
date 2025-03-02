import { Event } from "../events/event";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import Publisher from "./publisher";
import { snsConfig } from "../config/snsConfig";
import logger from "../utils/logger";

export class SnsPublisher implements Publisher {
  private sns: SNSClient;

  constructor() {
    this.sns = new SNSClient({
      region: snsConfig.GetRegion(),
      credentials: snsConfig.GetCredentials(),
      endpoint: "http://localhost:4566",
    });
  }
  async publish(event: Event) {
    const params = {
      Message: JSON.stringify(event.data),
      TopicArn: snsConfig.GetTopicArn(),
    };
    try {
      await this.sns.send(new PublishCommand(params));
    } catch (err) {
      console.error(`SnsPublisher: ${err}`);
    }
    logger.info(`SnsPublisher: Order published on ${event.topic}`);
  }
}
