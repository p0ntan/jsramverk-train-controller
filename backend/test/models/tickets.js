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

        it('should data and array with 1 ticket', async () => {
            const inData = {
                code: "ANAtest03",
                trainnumber: "13579",
                traindate: "1984-01-01"
            };
            const res = await ticketsModel.createTicket(inData);

            res.should.be.a('object');
            res.should.have.property('_id');
            res.code.should.equal('ANAtest03');
        });

        it('should return array with one item', async () => {
            const res = await ticketsModel.getTickets();

            res.should.be.a('array');
            res.should.have.lengthOf(1);
            res[0].should.have.property('_id');
            res[0].trainnumber.should.equal('13579');
        });

        it('should throw TypeError', async () => {
            try {
                await ticketsModel.createTicket();
            } catch (error) {
                error.should.be.an.instanceOf(TypeError);
            }
        });
    });
});
