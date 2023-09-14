const mongo = require("mongodb").MongoClient;

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
            let dsn = "mongodb://localhost:27017/trains";

            // Use test database when doing test
            if (process.env.NODE_ENV === 'test') {
                dsn = "mongodb://localhost:27017/test";
            }

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
