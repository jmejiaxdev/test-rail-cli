import getChatGPTResponse from "../api/get-chat-gpt-response.api";

export default async function getUnitTestsFromChatGPT(fileContent: string): Promise<string | null> {
  const prompt = `
    Using jest, create unit tests using Gherkin languange with the format: [Given] condition [Then] result" for the following function: 
    "${fileContent}"
  `;
  return await getChatGPTResponse(prompt);
}
