import db from "./pgql.js";
export default async (table) => {
  let query = `SELECT column_name name, data_type as type FROM information_schema.columns
    WHERE table_name = '${table}'`;

  let row = null;
  let result = await db.read(query);
  if (result.rows.length > 0) {
    row = result.rows;
  }
  return row;
};
