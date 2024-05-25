// dotenv is needed for accesing .env variables for tests.
require('dotenv').config();

const mongo = require("mongodb").MongoClient;
const dbUser = process.env.ATLAS_USERNAME;
const dbPass = process.env.ATLAS_PASSWORD;

/**
 * Object to use for opening the mongoDb connection
 */
const database = {
    /**
     * Opens a connection to the MongoDB database.
     *
     * @returns {Promise<object>} A Promise that resolves to a MongoDB database object.
     * @throws {Error} If there is an error connecting to the MongoDB database.
     */
    openDb: async function openDb() {
        try {
            let dbName = 'trains';

            // Use test database when doing test or a development db if in development
            if (process.env.NODE_ENV === 'test') {
                dbName = 'test';
            } else if (process.env.NODE_ENV === 'development') {
                dbName = 'development';
            }
            const dsn = `mongodb+srv://${dbUser}:${dbPass}@lenticode-apps.amlgurc.mongodb.net/` +
                `${dbName}?retryWrites=true&w=majority`;
            
            const client  = await mongo.connect(dsn);
            const db = await client.db();

            return db;
        } catch (err) {
            console.error("Error connecting to MongoDB:", err);
            throw err;
        }
    },

    /**
     * Get collection from database as an array
     *
     * @param {string} colName Name of the collection
     * @returns {array}
     */
    getCollection: async function getCollection(colName) {
        const db = await database.openDb();
        let data;

        try {
            const collection = await db.collection(colName);

            data = await collection.find().toArray();
        } catch (err) {
            console.error(`Error getting ${colName}:`, err);
        }

        await db.client.close();

        return data || [];
    }
};

module.exports = database;
