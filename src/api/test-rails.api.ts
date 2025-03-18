import axios from "axios";
import { ENV } from "../config/env.config";
import { Suite } from "../definitions/suite.definitions";
import { TestCase } from "../definitions/test-case.definitions";

const { organizationUrl, username, password, projectId, suiteId } = ENV.api;
const { section_id } = ENV.testCase;

const axiosInstance = axios.create({
  baseURL: `${organizationUrl}/api/v2/`,
  auth: { username, password },
  headers: { "Content-Type": "application/json" },
});

export const addTestCase = async (testCase: TestCase): Promise<TestCase> => {
  const response = await axiosInstance.post(`add_case/${testCase.section_id}`, testCase);
  return response.data;
};

export const deleteTestCase = async (id: TestCase["id"]): Promise<TestCase> => {
  const response = await axiosInstance.post(`delete_case/${id}`);
  return response.data;
};

export const fetchSuites = async (): Promise<Suite[]> => {
  const response = await axiosInstance.get(`get_suites/${projectId}`);
  return response.data;
};

export const fetchTestCases = async (): Promise<TestCase[]> => {
  const response = await axiosInstance.get(`get_cases/${projectId}&suite_id=${suiteId}&section_id=${section_id}`);
  return response.data.cases;
};

export const fetchTestCase = async (id: TestCase["id"]): Promise<TestCase> => {
  const response = await axiosInstance.get(`get_test/${id}`);
  return response.data;
};

export const updateTestCase = async (testCase: TestCase): Promise<TestCase> => {
  const { id, ...data } = testCase;
  const response = await axiosInstance.post(`update_case/${id}`, data);
  return response.data;
};
