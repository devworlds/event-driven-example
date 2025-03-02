import dotenv from 'dotenv';
import { AwsConfig }  from './awsConfig'
dotenv.config();

class SqsConfig extends AwsConfig{
  private queue_url: string;

  constructor(){
    super()
    this.queue_url = process.env.QUEUE_URL!;
  }

  GetQueue_url(){
    return this.queue_url
  }
}

export const sqsConfig = new SqsConfig();
