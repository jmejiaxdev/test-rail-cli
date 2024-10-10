import openaiClient from "../clients/open-ai.client";

export default async function getChatGPTResponse(prompt: string): Promise<string | null> {
  const response = await openaiClient.chat.completions.create({
    model: "gpt-3.5-turbo", // or "gpt-4" if you have access
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}
