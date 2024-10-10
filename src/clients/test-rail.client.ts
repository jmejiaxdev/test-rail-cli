import axios from "axios";

const baseURL = process.env.TEST_RAIL_BASE_URL;
const username = process.env.TEST_RAIL_USERNAME || "";
const password = process.env.TEST_RAIL_API_KEY || "";

const testrailClient = axios.create({
  baseURL,
  auth: { username, password },
  headers: { "Content-Type": "application/json" },
});

export default testrailClient;
