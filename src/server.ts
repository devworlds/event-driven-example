import express from "express";
import axios from "axios";
import { publishService } from "./services/publisherService";
import { eventFactory } from "./factories/eventFactory";
import { consumerService } from "./services/consumerService";

const app = express();
app.use(express.json());

app.post("/order", async (req, res) => {
  const orderType = "order-created";
  const { orderId, customerName, orderValue } = req.body;
  const data = {
    orderId,
    customerName,
    orderValue,
  };
  const event = eventFactory.createEvent(orderType, data);
  console.info(event)

  await publishService.publishEvent(event);
  res.status(201).json({ Order: event });
});

app.get("/order", async (_req, res) => {
  consumerService.receiveEvent();
  res.status(200);
});

setTimeout(async () => {
  try {
    await axios.get(`http://localhost:3000/order`);
  } catch (error) {
    console.error("GetOrder:", error);
  }
}, 1000);

app.listen(3000, () => console.info("OrderService running on 3000"));
