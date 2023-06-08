import env from "secretenvmgr";
import format from "string-format";
import api from "./api.js";
import service_token from "./service_token.js";
await env.load();
console.log(process.env);
export default async (args) => {
  try {
    let gql = {
      query: "mutation($input:Insert) { insert(input:$input) }",
      variables: {
        input: args,
      },
    };
    let token = service_token.get();
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    console.log(JSON.stringify(gql));

    let url = format(process.env.BASE_URL, "data");
    //url = "http://localhost:9000/data";
    let result = await api(url, gql, headers);
    console.log("tracking.service.insert:", result);
    return result.data.insert;
  } catch (e) {
    console.log("tracking.service.insert.error: ", e);
    throw e;
  }
};
