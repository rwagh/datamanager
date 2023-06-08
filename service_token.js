import env from "secretenvmgr";
await env.load();
export default {
  get: () => {
    let user = JSON.stringify({
        username: process.env.DB_USER,
        password: process.env.DB_PASS
    });
    let encoded = Buffer.from(user).toString("base64");
    return encoded;
  },
};
