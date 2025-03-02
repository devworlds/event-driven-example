import dotenv from 'dotenv';

dotenv.config();

export class AwsConfig {
  private region: string;
  private credentials: {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
  };

  constructor() {
    this.credentials = {
      accessKeyId: process.env.ACCESS_KEY_ID!,
      secretAccessKey: process.env.SECRET_ACCESS_KEY!,
      sessionToken: process.env.SESSION_TOKEN!,
    };
    this.region = process.env.REGION!
  }

  GetRegion() {
    return this.region;
  }

  GetCredentials(){
    return this.credentials;
  }
}

export const awsConfig = new AwsConfig();