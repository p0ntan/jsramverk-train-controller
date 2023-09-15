/**
 * Test the route /tickets
 */

/*global it describe */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const httpServer = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('route', () => {
    describe('GET /delayed', () => {
        it('should get status 200 with an array in data', (done) => {
            chai.request(httpServer)
                .get('/delayed')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');

                    // If statement because there can be no delayed trains
                    if (res.body.data.length > 0) {
                        const firstElement = res.body.data[0];

                        firstElement.should.have.property("OperationalTrainNumber");
                        firstElement.should.have.property("LocationSignature");
                    }

                    done();
                });
        });
    });
});
