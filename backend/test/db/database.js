/**
 * Test opening and resetting the database
 */

/*global it describe before */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const database = require('../../db/database.js');
const resetCollection = require('../../db/setup.js');
const fs = require("fs");
const path = require("path");

chai.should();

describe('Test database', () => {
    /**
     * Before test, reset the database and remove all collections
     */
    before(async () => {
        const db = await database.openDb();

        try {
            const collections = await db.listCollections().toArray();

            for (const col of collections) {
                await db.collection(col.name).drop();
            }
        } catch (err) {
            console.log("During setup following error occured:", err);
        } finally {
            await db.client.close();
        }
    });

    /**
     * Test the database setup function. Maybe this could be removed or moved but
     * it's good to have a way to easy reset a collection while still in develop-mode that
     * is separated from the database.js file.
     */
    describe('Test reset function', () => {
        const colName = "testCol";

        // Resets the collection
        it('should return empty array', async () => {
            await resetCollection(colName);

            const res = await database.getCollection(colName);

            res.should.be.a('array');
            res.should.have.lengthOf(0);
        });

        // Using testdata.json to insert documents
        it('should return 2 documents', async () => {
            const testdata = "testdata.json";
            const doc = JSON.parse(fs.readFileSync(
                path.resolve(__dirname, testdata),
                "utf8"
            ));

            await resetCollection(colName, doc);

            const res = await database.getCollection(colName, doc);

            res.should.be.a('array');
            res.should.have.lengthOf(2);
            res[0].should.have.property("name");
            res[1].should.have.property("name");
        });

        // Resets the collection again
        it('should return empty array', async () => {
            await resetCollection(colName);

            const res = await database.getCollection(colName);

            res.should.be.a('array');
            res.should.have.lengthOf(0);
        });
    });
});
