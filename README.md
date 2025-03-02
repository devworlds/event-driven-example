# Event Driven Architecture

This project is an example of event-driven architecture using SQS/SNS and RabbitMQ.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Technologies Used](#technologies-used)

## Installation

To install the project dependencies, run:
```bash
npm install
```
## Configuration

### Configure SQS/SNS using Docker
To configure SQS/SNS using a Docker image, follow the steps below:
```
# Commands to configure SQS/SNS
```
### Configure RabbitMQ using Docker
```
# Commands to configure RabbitMQ
```

### Configure the .env file
```
#publisher and receiver type
RECEIVER_TYPE=rabbitmq
PUBLISHER_TYPE=rabbitmq

#rabbitmq config
RABBITMQ_URL=amqp://localhost
QUEUE_NAME=order-queue
EXCHANGE_NAME=orders
ROUTING_KEY=""

#aws config
ACCESS_KEY_ID=""
SECRET_ACCESS_KEY=""
SESSION_TOKEN=""
REGION="us-east-1"

#sns config
TOPIC_ARN="arn:aws:sns:us-east-1:000000000000:ORDERS-CREATED"

#sqs config
QUEUE_URL="http://localhost.localstack.cloud:4566/000000000000/orders-process"
```

## Usage
To start the application, run:
```bash
npm run start
```

## Available Scripts

- Generate Documentation:
```bash
npm run docs
```
- Start the Application:
```bash
npm run start
```

## Technologies Used
- Node.js
- Express
- TypeScript
- AWS SDK
- RabbitMQ
- Docker
- Pino (for logging)