import axios from "axios";
import { Config } from "../definitions/config.definitions";
import { Suite, TestCase } from "../definitions/test-case.definitions";

const { organizationUrl, username, password, projectId, testCase, suiteId } = Config.testRails;

const api = axios.create({
  baseURL: `${organizationUrl}/api/v2/`,
  auth: { username, password },
  headers: { "Content-Type": "application/json" },
});

const addTestCase = async (testCase: TestCase): Promise<TestCase> => {
  const response = await api.post(`add_case/${testCase.section_id}`, testCase);
  return response.data;
};

const deleteTestCase = async (id: TestCase["id"]): Promise<TestCase> => {
  const response = await api.post(`delete_case/${id}`);
  return response.data;
};

const getSuites = async (): Promise<Suite[]> => {
  const response = await api.get(`get_suites/${projectId}`);
  return response.data;
};

const getTestCases = async (): Promise<TestCase[]> => {
  const response = await api.get(`get_cases/${projectId}&suite_id=${suiteId}&section_id=${testCase.section_id}`);
  return response.data.cases;
};

const getTestCase = async (id: TestCase["id"]): Promise<TestCase> => {
  const response = await api.get(`get_test/${id}`);
  return response.data;
};

const updateTestCase = async (id: TestCase["id"], data: any): Promise<TestCase> => {
  const response = await api.post(`update_case/${id}`, data);
  return response.data;
};

const TestRailsApi = {
  addTestCase,
  deleteTestCase,
  getSuites,
  getTestCases,
  getTestCase,
  updateTestCase,
};

export default TestRailsApi;
