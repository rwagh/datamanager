import format from "string-format";
import env from "secretenvmgr";
await env.load();
import api from "./api.js";
import service_token from "./service_token.js";

export default async (input) => {
  let gql = {
    query: "query($input: Count) { count (input: $input) }",
    variables: { input: input },
  };
  let token = service_token.get();
  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  let url = format(process.env.BASE_URL, "data");
  let result = await api(url, gql, headers);
  let rows = 0;
  if (result.data.count !== null) {
    rows = result.data.count;
  }
  return rows;
};
