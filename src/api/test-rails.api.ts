import axios from "axios";
import { config } from "../definitions/config.definitions";
import { Suite, TestCase } from "../definitions/test-case.definitions";

const { testRails } = config;
const { baseURL, username, password, projectId, testCase, suiteId } = testRails;

const api = axios.create({ baseURL, auth: { username, password }, headers: { "Content-Type": "application/json" } });

// FIXME: does it return something?
const addTestCase = async (testCase: TestCase): Promise<TestCase> => {
  const response = await api.post(`add_case/${suiteId}`, testCase);
  return response.data;
};

const deleteTestCase = async (id: TestCase["id"]): Promise<TestCase> => {
  const response = await api.post(`/index.php?/api/v2/delete_test/${id}`);
  return response.data;
};

const getSuites = async (): Promise<Suite[]> => {
  const response = await api.get(`get_suites/${projectId}`);
  return response.data;
};

const getTestCases = async (sectionId: TestCase["section_id"] = testCase.section_id): Promise<TestCase[]> => {
  const response = await api.get(`get_cases/${projectId}&suite_id=${suiteId}&section_id=${sectionId}`);
  return response.data.cases;
};

const getTestCase = async (id: TestCase["id"]): Promise<TestCase> => {
  const response = await api.get(`get_test/${id}`);
  return response.data;
};

const updateTestCase = async (id: TestCase["id"], data: any): Promise<TestCase> => {
  const response = await api.post(`/index.php?/api/v2/update_case/${id}`, data);
  return response.data;
};

const testRailsAPI = {
  addTestCase,
  deleteTestCase,
  getSuites,
  getTestCases,
  getTestCase,
  updateTestCase,
};

export default testRailsAPI;
