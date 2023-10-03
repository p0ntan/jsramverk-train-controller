/**
 * Test opening and resetting the database
 */

/*global it describe before */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const database = require('../../db/database.js');
const ticketsModel = require('../../models/tickets.js');

chai.should();

describe('Test model', () => {
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
     * Test the model ticketssetup
     */
    describe('tickets', () => {
        // Get tickets, should be empty
        it('should return empty array', async () => {
            const res = await ticketsModel.getTickets();

            res.should.be.a('array');
            res.should.have.lengthOf(0);
        });

        // TODO set up test to insert data, ticket model needs to be updated for that
        // it('should data and array with 1 ticket', async () => {
        //     const inData = {
        //         code: "ANAtest01",
        //         trainnumber: "12345",
        //         traindate: "2020-02-20"
        //     };
        //     const res = await ticketsModel.createTicket();

        //     res.should.be.a('array');
        //     res.should.have.lengthOf(0);
        // });
    });
});
