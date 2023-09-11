/**
 * Connect to the database and setup it with some default data.
 */
"use strict";

const database = require('../db/database.js');

// // This is for setting up database with data from setup.json
// const setupFile = "setup.json";
// const fs = require("fs");
// const path = require("path");
// const docs = JSON.parse(fs.readFileSync(
//     path.resolve(__dirname, setupFile),
//     "utf8"
// ));

// Do it.
resetCollection("tickets")
    .catch(err => console.log(err));

/**
 * Reset a collection by removing existing content.
 * Can also be used to insert a default set of documents.
 *
 * @async
 *
 * @param {string} colName Name of collection.
 * @param {string=} doc    Documents to be inserted into collection.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<void>} Void
 */
async function resetCollection(colName, doc) {
    try {
        const db = await database.openDb();
        const col = await db.collection(colName); 

        await col.deleteMany(); // This deletes the data in the collection

        // Insert default data if provied as JSON-string
        if (doc) {
            await col.insertMany(doc);
        }

        await db.client.close();
    } catch (err) {
        console.log(err);
        throw err;
    }
}
