/**
 * Test the route /codes
 */

/*global it describe */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const httpServer = require('../../app.js');

chai.should();

chai.use(chaiHttp);

/**
 * Test the route /codes. Checking that the properties used in frontend is returned
 */
describe('route', () => {
    describe('GET /codes', () => {
        it('should get status 200 with a non empty array', (done) => {
            chai.request(httpServer)
                .get('/codes')
                .end((err, res) => {
                    const firstElement = res.body.data[0];

                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.above(0);
                    firstElement.should.have.property("Code");
                    firstElement.should.have.property("Level3Description");

                    done();
                });
        });
    });
});
