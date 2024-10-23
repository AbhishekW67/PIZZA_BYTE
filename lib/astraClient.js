const { Client } = require("cassandra-driver");

let client;

async function getAstraClient() {
  if (!client) {
    client = new Client({
      cloud: {
        secureConnectBundle: "./lib/secure-connect-pizza-shop.zip",
      },
      credentials: {
        username: `${process.env.ASTRA_DB_CLIENT_ID}`,
        password: `${process.env.ASTRA_DB_CLIENT_SECRET}`,
      },
    });
    await client.connect();
  }
  return client;
}

module.exports = { getAstraClient };
