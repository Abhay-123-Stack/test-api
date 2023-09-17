const { MongoClient } = require("mongodb");

let client = null;

exports.Connect = async function () {
  client = new MongoClient(process.env.MONGOURI);
  await client?.connect();
  return client.db(process.env.MONGODBNAME);
};

exports.Disconnect = async function () {
  await client?.close();
};
