import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

const openaiClient = new OpenAI({ apiKey });

export default openaiClient;
