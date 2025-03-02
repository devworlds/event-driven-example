import { SQS } from "@aws-sdk/client-sqs";
import { sqsConfig } from "../config/sqsConfig";
import logger from "../utils/logger";
import { Event } from "../events/event";

export default class SqsReceiver {
  sqs: SQS;

  constructor() {
    this.sqs = new SQS({
      region: sqsConfig.GetRegion(),
      credentials: sqsConfig.GetCredentials(),
      endpoint: "http://localhost:4566",
    });
  }

  async receive() {
    while (true) {
      try {
        const response = await this.sqs.receiveMessage({
          QueueUrl: sqsConfig.GetQueue_url(),
          MaxNumberOfMessages: 1,
          WaitTimeSeconds: 10,
        });

        if (response.Messages) {
          for (const message of response.Messages) {
            const event: Event = JSON.parse(message.Body!);
            logger.info(`SqsReceiver: Order Processed - ${JSON.stringify(event)}`);

            await this.sqs.deleteMessage({
              QueueUrl: sqsConfig.GetQueue_url(),
              ReceiptHandle: message.ReceiptHandle!,
            });
          }
        } else {
          logger.info("SqsReceiver: Empty Queue...");
        }
      } catch (error) {
        logger.error(`SqsReceiver: ${error}`);
      }
    }
  }
}