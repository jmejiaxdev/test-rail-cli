import { fetchSuites } from "../api/test-rails.api";

export const getSuitesCommand = async () => {
  console.log("\nGetting test suites...\n");

  const suites = await fetchSuites();

  suites.forEach((suite) => {
    console.log(`ID: ${suite.id} || Name: ${suite.name} || URL: ${suite.url}`);
  });

  console.log(`${suites.length} suites in total`);
};
