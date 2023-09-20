/**
 * Test the route /tickets
 */

/*global it describe before */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const database = require('../../db/database.js');
const httpServer = require('../../app.js');

chai.should();

chai.use(chaiHttp);

/**
 * Test the route /tickets that used the database.
 * Checking that the properties used in frontend is returned.
 */
describe('route', () => {
    /**
     * Before test, reset the collection
     */
    before(async () => {
        const db = await database.openDb();

        try {
            const col = await db.collection('tickets');

            await col.deleteMany(); // This deletes the data in the collection
        } catch (err) {
            console.log("During setup following error occured:", err);
        } finally {
            await db.client.close();
        }
    });

    describe('GET and POST /tickets', () => {
        /**
         * First test to see that the collection is empty since all collections are
         * dropped before test.
         */
        it('should get status 200 with empty array', (done) => {
            chai.request(httpServer)
                .get('/tickets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.should.have.lengthOf(0);

                    done();
                });
        });

        /**
         * Insert ticket with POST same way as in frontend
         */
        it('should get status 201 with inserted data', (done) => {
            const inData = {
                code: "ANAtest01",
                trainnumber: "12345",
                traindate: "2020-02-20"
            };

            chai.request(httpServer)
                .post('/tickets')
                .send(inData)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.data.should.have.property('id');
                    res.body.data.trainnumber.should.equal(inData.trainnumber);

                    done();
                });
        });

        /**
         * Get tickets after inserting one ticket
         */
        it('should get status 200 with 1 ticket', (done) => {
            chai.request(httpServer)
                .get('/tickets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.should.have.lengthOf(1);
                    res.body.data[0].should.have.property('_id');
                    res.body.data[0].should.have.property('code');
                    res.body.data[0].should.have.property('traindate');
                    res.body.data[0].should.have.property('trainnumber');

                    done();
                });
        });

        /**
         * Insert another ticket into the collection
         */
        it('should get status 201 with inserted data', (done) => {
            const inData = {
                code: "ANAtest02",
                trainnumber: "151hhd",
                traindate: "2021-12-20"
            };

            chai.request(httpServer)
                .post('/tickets')
                .send(inData)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.data.should.have.property('id');
                    res.body.data.trainnumber.should.equal(inData.trainnumber);

                    done();
                });
        });

        /**
         * Check that two documents are returned as expected
         */
        it('should get status 200 with 2 ticket', (done) => {
            chai.request(httpServer)
                .get('/tickets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.should.have.lengthOf(2);
                    res.body.data[0].should.have.property('_id');
                    res.body.data[0].should.have.property('code');
                    res.body.data[0].should.have.property('traindate');
                    res.body.data[0].should.have.property('trainnumber');

                    done();
                });
        });
    });
});
