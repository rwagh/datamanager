import env from "secretenvmgr";
await env.load();

import db from "./pgql.js";
export default async (args) => {
  try {
    let { table, columns, criteria, values, setcolumns } = args;
    // let excludeparams = ["resources"];
    let parameters = parameter.get(columns, setcolumns);
    //let paramArray = parameter.get(values);
    parameter.get(values).forEach((x) => {
      parameters.push(x);
    });
    let params = [];

    let keys = Object.keys(columns);
    let p = 1;
    keys.forEach((k) => {
      if (k == "resources") {
        params.push(`${k} = ${k} + {${columns.resources}}`);
      } else {
        params.push(`${k} = $${p}`);
      }

      p += 1;
    });

    let query = `UPDATE ${table} SET ${params.join(", ")} `;
    if (criteria) {
      query += `${criteria}`;
    }
    console.log(query);
    console.log(parameters);
    let result = await db.write(query, parameters);
    if (result.rowCount > 0) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
};
