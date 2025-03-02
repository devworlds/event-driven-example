import dotenv from 'dotenv';

dotenv.config();

class RabbitMQConfig {
    private rabbitmq_url: string;
    private queue_name: string;
    private exchange_name: string;
    private routing_key: string;

    constructor(){
        this.rabbitmq_url = process.env.RABBITMQ_URL!;
        this.queue_name = process.env.QUEUE_NAME!;
        this.exchange_name = process.env.EXCHANGE_NAME!;
        this.routing_key = process.env.ROUTING_KEY!;
    }

    GetRabbitmq_url(){
        return this.rabbitmq_url!;
    }

    GetQueue_name(){
        return this.queue_name!;
    }

    GetExchange_name(){
        return this.exchange_name!;
    }

    GetRouting_key(){
        return this.routing_key!;
    }

}

export const rabbitMQConfig = new RabbitMQConfig();