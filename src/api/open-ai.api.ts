import OpenAI from "openai";
import { Config } from "../definitions/config.definitions";

const api = new OpenAI({ apiKey: Config.openAI.apiKey });

// https://q4-desktop-api.postman.co/workspace/juanq4~1f692f69-d2ee-471b-9f42-abbbc7ce36b1/request/20263460-e1d8edff-1093-48f5-b919-8e3a2a54b6c6?action=share&source=copy-link&creator=20263460&ctx=documentation
const getChatGPTResponse = async (prompt: string): Promise<string | null> => {
  const response = await api.chat.completions.create({
    model: Config.openAI.model,
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
};

const OpenAIApi = {
  getChatGPTResponse,
};

export default OpenAIApi;
