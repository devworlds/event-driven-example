import dotenv from 'dotenv';
import { AwsConfig } from './awsConfig';

dotenv.config();

export class SnsConfig extends AwsConfig{
    topic_arn: string;

    constructor(){
        super();
        this.topic_arn = process.env.TOPIC_ARN!;
    }

    GetTopicArn(){
        return this.topic_arn;
    }
}

export const snsConfig = new SnsConfig();
