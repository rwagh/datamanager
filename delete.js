import env from "secretenvmgr";
await env.load();
import db from "./pgql.js";
export default async (args) => {
  try {
    let { criteria, parameters } = args;
    let query = `DELETE FROM ${args.table}`;

    query += `  ${criteria}`;
    console.log("query: ", query, parameters);

    let result = await db.write(query, parameters);
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
