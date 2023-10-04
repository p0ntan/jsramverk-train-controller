/**
 * Test the route /graphql
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
 * Test the route /graphql. Checking that the properties used in front-end exists.
 */
describe('route /graphql', () => {
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

    describe('tickets', () => {
        const query = `{
            tickets {
                _id
                code
                trainnumber
                traindate
            }
        }`;

        it('query should get status 200 with an array in data', (done) => {
            chai.request(httpServer)
                .post('/graphql')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({query: query})
                .end((err, res) => {
                    const tickets = res.body.data.tickets;

                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('tickets');
                    tickets.should.be.a('array');
                    tickets.should.have.lengthOf(0);
                    done();
                });
        });
        it('mutation should get status 200 with inserted data', (done) => {
            const mutation = `mutation {
                createTicket(
                    code: "ALATEST01"
                    trainnumber: "12345"
                    traindate: "2020-02-20"
                ) {
                    _id
                    code
                    trainnumber
                    traindate
                }
            }`;

            chai.request(httpServer)
                .post('/graphql')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({query: mutation})
                .end((err, res) => {
                    const ticket = res.body.data.createTicket;

                    res.should.have.status(200);
                    ticket.should.be.a('object');
                    ticket.should.have.property('_id');
                    ticket.code.should.equal('ALATEST01');
                    ticket.trainnumber.should.equal('12345');
                    ticket.traindate.should.equal('2020-02-20');
                    done();
                });
        });
        it('query should get status 200 with array and one item', (done) => {
            chai.request(httpServer)
                .post('/graphql')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({query: query})
                .end((err, res) => {
                    const tickets = res.body.data.tickets;

                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('tickets');
                    tickets.should.be.a('array');
                    tickets.should.have.lengthOf(1);
                    tickets[0].code.should.equal('ALATEST01');
                    done();
                });
        });
        it('mutation should get status 200 with inserted data', (done) => {
            const mutation = `mutation {
                createTicket(
                    code: "ALATEST02"
                    trainnumber: "67890"
                    traindate: "2022-02-20"
                ) {
                    _id
                    code
                    trainnumber
                    traindate
                }
            }`;

            chai.request(httpServer)
                .post('/graphql')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({query: mutation})
                .end((err, res) => {
                    const ticket = res.body.data.createTicket;

                    res.should.have.status(200);
                    ticket.should.be.a('object');
                    ticket.should.have.property('_id');
                    ticket.code.should.equal('ALATEST02');
                    ticket.trainnumber.should.equal('67890');
                    ticket.traindate.should.equal('2022-02-20');
                    done();
                });
        });
        it('query should get status 200 with array and two items', (done) => {
            chai.request(httpServer)
                .post('/graphql')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({query: query})
                .end((err, res) => {
                    const tickets = res.body.data.tickets;

                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('tickets');
                    tickets.should.be.a('array');
                    tickets.should.have.lengthOf(2);
                    tickets[1].trainnumber.should.equal('67890');
                    done();
                });
        });
    });

    describe('query for codes', () => {
        it('should get status 200 with an array in data', (done) => {
            const query = `{
                codes {
                    Code
                    Level1Description
                    Level2Description
                    Level3Description
                }
            }`;

            chai.request(httpServer)
                .post('/graphql')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({query})
                .end((err, res) => {
                    const codes = res.body.data.codes;
                    const firstElement = codes[0];

                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('codes');
                    codes.should.be.a('array');
                    codes.length.should.be.above(0);
                    firstElement.should.have.property("Code");
                    firstElement.should.have.property("Level3Description");
                    done();
                });
        });
    });

    describe('query for delayed trains', () => {
        it('should get status 200 with an array in data', (done) => {
            const query = `{
                delayed {
                    LocationSignature
                    OperationalTrainNumber
                    FromLocation {
                        LocationName
                    }
                    ToLocation {
                        LocationName
                    }
                }
            }`;

            chai.request(httpServer)
                .post('/graphql')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({query})
                .end((err, res) => {
                    const delayed = res.body.data.delayed;

                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('delayed');
                    delayed.should.be.a('array');

                    // If statement because there can be no delayed trains
                    if (delayed.length > 0) {
                        const firstElement = delayed[0];

                        firstElement.should.have.property("OperationalTrainNumber");
                        firstElement.should.have.property("LocationSignature");
                    }

                    // Loop is to find a delayed train with a FromLocation (not all have them)
                    for (const train of delayed) {
                        if (train.FromLocation) {
                            train.FromLocation.should.be.a('array');
                            train.FromLocation[0].should.have.property('LocationName');
                        }
                    }

                    done();
                });
        });
    });
});
