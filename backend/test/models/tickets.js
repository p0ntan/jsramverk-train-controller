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
    const colName = 'tickets';
    /**
     * Before test, reset the user database
     */

    before(async () => {
        const db = await database.openDb();

        try {
            const col = await db.collection(colName);

            await col.deleteMany(); // This deletes the data in the collection
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
        let ticketId = null;
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

            // Set ticket id to use in other test
            ticketId = res._id;
        });

        it('should return array with one item', async () => {
            const res = await ticketsModel.getTickets();

            res.should.be.a('array');
            res.should.have.lengthOf(1);
            res[0].should.have.property('_id');
            res[0].trainnumber.should.equal('13579');
        });

        it('should throw TypeError', async () => {
            let error;

            try {
                await ticketsModel.createTicket();
            } catch (e) {
                error = e;
            }

            error.should.be.an.instanceOf(TypeError);
        });

        it('should change code on ticket', async () => {
            const args = {
                _id: ticketId,
                code: "ANAedit020"
            }
            
            let res = await ticketsModel.updateTicket(args)

            res.should.be.a('object');
            res.should.have.property('_id');
            res.code.should.equal('ANAedit020');

            res = await ticketsModel.getTickets();
            res[0].code.should.equal('ANAedit020');
        });

        it('delete should empty collection', async () => {
            const args = {
                _id: ticketId,
            }
            
            let res = await ticketsModel.deleteTicket(args)

            res.should.be.a('object');
            res.should.have.property('_id');
            res._id.should.equal(ticketId);

            res = await ticketsModel.getTickets();
            res.should.be.a('array');
            res.should.have.lengthOf(0);
        });
    });
});
