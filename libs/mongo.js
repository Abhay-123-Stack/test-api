const { MongoClient } = require("mongodb");

let db = null;

exports.DB = () => db;

exports.Connect = async function () {
  const client = new MongoClient(process.env.MONGOURI);
  await client.connect();
  db = client.db(process.env.MONGODBNAME);
};

// exports.Disconnect = async function () {
//   await client?.close();
// };
