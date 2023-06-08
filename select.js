import format from "string-format";
import env from "secretenvmgr";
await env.load();
import api from "./api.js";
import service_token from "./service_token.js";

export default async (input) => {
  let gql = {
    query: "query($input: Select) { select (input: $input) { rows count } }",
    variables: { input: input },
  };
  let token = service_token.get();
  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  let url = format(process.env.BASE_URL, "data");
  let result = await api(url, gql, headers);
  console.log(result);
  let rows = [];
  if (result.data !== undefined && result.data.select !== null) {
    rows = result.data.select.rows;
  }
  return rows;
};
