/**
 * Test opening and resetting the database
 */

/*global it describe before */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const database = require('../../db/database.js');
const resetCollection = require('../../db/setup.js');
const fs = require("fs");
const path = require("path");

chai.should();

chai.use(chaiHttp);

describe('Test database', () => {
    /**
     * Before each test, reset the database and remove all collections
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

    describe('Test reset function', () => {
        const colName = "testCol";

        it('should return empty array', async () => {
            await resetCollection(colName);

            const res = await database.getCollection(colName);

            res.should.be.a('array');
            res.should.have.lengthOf(0);
        });

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
        });
    });
});
