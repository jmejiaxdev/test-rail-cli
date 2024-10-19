import OpenAI from "openai";
import { Config } from "../definitions/config.definitions";

const api = new OpenAI({ apiKey: Config.openAI.apiKey });

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
