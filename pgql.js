import pg from "pg";
import env from "secretenvmgr";
await env.load();
const reader = new pg.Pool({
  host: process.env.READER_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  keepAlive: 30000,
  //KeepAliveInterval: 1000
  max: 20,
  poolSize: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000,
});

const writer = new pg.Pool({
  host: process.env.WRITER_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  keepAlive: 30000,
  //KeepAliveInterval: 1000
  max: 20,
  poolSize: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000,
});

export default {
  write: async (sql, values) => {
    let result;
    let client = await writer.connect();
    try {
      if (values && values.length > 0) {
        //console.log("executed: ", sql, values);
        result = await client.query(sql, values);
      } else {
        //console.log("execute: ", sql);
        result = await client.query(sql);
      }
      return result;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
  },
  read: async (sql, values) => {
    let result;
    let client = await reader.connect();
    try {
      if (values && values.length > 0) {
        //console.log("executed: ", sql, values);
        result = await client.query(sql, values);
      } else {
        //console.log("execute: ", sql);
        result = await client.query(sql);
      }
      return result;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
  },
};
