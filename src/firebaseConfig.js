const admin = require("firebase-admin");
const config = require("./config");

admin.initializeApp({
  credential: admin.credential.cert(config.dbConfig.firebase),
});

const db = admin.firestore();


module.exports = db;
