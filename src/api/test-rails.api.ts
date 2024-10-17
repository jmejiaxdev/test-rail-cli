import axios from "axios";
import { config } from "../definitions/config.definitions";
import { Suite, TestCase } from "../definitions/test-rails.definitions";

const api = axios.create({
  baseURL: config.testRails.baseURL,
  auth: { username: config.testRails.username, password: config.testRails.password },
  headers: { "Content-Type": "application/json" },
});

const getSuites = async (): Promise<Suite[]> => {
  const response = await api.get(`get_suites/${config.testRails.projectId}`);
  return response.data;
};

const getTestCases = async (): Promise<TestCase[]> => {
  const response = await api.get(`get_cases/${config.testRails.projectId}&suite_id=${config.testRails.suiteId}`);
  return response.data;
};

const getTestCase = async (id: TestCase["id"]): Promise<TestCase> => {
  const response = await api.get(`get_test/${id}`);
  return response.data;
};

// FIXME: does it return something?
const createTestCase = async (testCase: TestCase): Promise<TestCase> => {
  const response = await api.post(`add_case/${config.testRails.suiteId}`, testCase);
  return response.data;
};

const deleteTestCase = async (id: TestCase["id"]): Promise<TestCase> => {
  const response = await api.post(`/index.php?/api/v2/delete_test/${id}`);
  return response.data;
};

const testRailsAPI = {
  getSuites,
  getTestCases,
  getTestCase,
  createTestCase,
  deleteTestCase,
};

export default testRailsAPI;
