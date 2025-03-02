import express from "express";
import axios from "axios";
import { publishService } from "./services/publisherService";
import { eventFactory } from "./factories/eventFactory";
import { consumerService } from "./services/consumerService";
import pinoHttp from "pino-http";
import logger from "./utils/logger";

const app = express();
app.use(express.json());
app.use(pinoHttp({ logger }));

app.post("/order", async (req, res) => {
  const orderType = "order-created";
  const { orderId, customerName, orderValue } = req.body;
  const data = {
    orderId,
    customerName,
    orderValue,
  };
  const event = eventFactory.createEvent(orderType, data);

  await publishService.publishEvent(event);
  res.status(201).json({ Order: event });
});

setTimeout(async () => {
  try {
    consumerService.receiveEvent();
  } catch (error) {
    logger.error("GetOrder:", error);
  }
}, 1000);

app.listen(5000, () => logger.info("OrderService running on 5000"));
