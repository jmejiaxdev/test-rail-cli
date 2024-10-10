import getChatGPTResponse from "../api/get-chat-gpt-response.api";
import { TestCase } from "../definitions/test-case.definition";

// Might be a good idea to make the prompt configurable
export default async function transformToGherkin(title: TestCase["title"]): Promise<string | null> {
  const prompt = `Convert the following test title to Gherkin language: "${title}"`;
  return await getChatGPTResponse(prompt);
}
