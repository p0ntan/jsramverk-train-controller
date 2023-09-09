/**
 * Connect to the database and setup it with some default data.
 */
"use strict";

const mongo = require("mongodb").MongoClient;
const dsn =  process.env.DBWEBB_DSN || "mongodb://127.0.0.1:27017/trains";

const setupFile = "setup.json";
const fs = require("fs");
const path = require("path");
const docs = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, setupFile),
    "utf8"
));

// Do it.
resetCollection(dsn, "tickets", docs)
    .catch(err => console.log(err));

/**
 * Reset a collection by removing existing content and insert a default
 * set of documents.
 *
 * @async
 *
 * @param {string} dsn     DSN to connect to database.
 * @param {string} colName Name of collection.
 * @param {string} doc     Documents to be inserted into collection.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<void>} Void
 */
async function resetCollection(dsn, colName, doc) {
    try {
        const client  = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(colName); // Can be used for getting 1 wanted collections by name and delete only the data keeping the collection itself
        await db.createCollection(colName); // Create collection if it dosen't exist
        // const collections = await db.listCollections().toArray(); // This finds all collections // TODO remove this and other code if not wanted
        
        // for (const collection of collections) {
        //     await db.collection(collection.name).drop(); // This removes each collection, completly resetting the database
        //     // await col.deleteMany(); // This deletes only the data in the collection
        // }

        await col.deleteMany(); // This deletes the data in one the collectio
        // await col.insertMany(doc); // Uncomment this to insert data based on the doc file (setup.json in the folder)
    
        await client.close();
    } catch (err) {
        console.log(err);
        throw err;
    }

}
