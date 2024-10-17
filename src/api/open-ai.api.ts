import OpenAI from "openai";
import { config } from "../definitions/config.definitions";

const api = new OpenAI({ apiKey: config.openAI.apiKey });

const getChatGPTResponse = async (prompt: string): Promise<string | null> => {
  const response = await api.chat.completions.create({
    model: config.openAI.model,
    messages: [{ role: "user", content: prompt }],
  });
  return response.choices[0].message.content;
};

const openAIAPI = {
  getChatGPTResponse,
};

export default openAIAPI;
