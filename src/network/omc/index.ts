import createClient from "openapi-fetch";
import type { paths } from "./generated";

const client = createClient<paths>({
  baseUrl: process.env.API_URL_OMC,
});

export default client;
