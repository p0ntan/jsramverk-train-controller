const mongo = require("mongodb").MongoClient;
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/trains";

/**
 * Object to use for opening the mongoDb connection
 */
const database = {
    openDb: async function openDb() {
        try {
            const client  = await mongo.connect(dsn);
            const db = await client.db();

            return db;
        } catch (err) {
            console.error("Error connecting to MongoDB:", err);
            throw err;
        }
    }
};

module.exports = database;
