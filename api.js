import fetch from "node-fetch";
import helper from "./index.js";
export default async (url, gql, headers) => {
  try {
    let response;
    let request = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(gql)
    };

    response = await fetch(url, request);
    //console.log(await response.text());
    let result = await response.json();
    //console.log("tracking.service.api.result: ", result);
    return result;
  } catch (e) {
    console.log(e);
    throw {
      success: false,
      message: await helper.message(1001),
      code: 1001,
    };
  }
};
