import API from "../lib/axios";

export const predictDisease = (data: any) =>
  API.post("/ai/predict", data);

export const chatbotReply = (data: any) =>
  API.post("/chatbot/reply", data);

export const checkFakeMedicine = (data: any) =>
  API.post("/fake-medicine/check", data);
