/**
 * Test the route / and 404
 */

/*global it describe */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const httpServer = require('../../app.js');

chai.should();

chai.use(chaiHttp);

/**
 * Test the route /delayed. Checking that the properties used in frontend is returned.
 */
describe('route', () => {
    describe('/', () => {
        it('should get status 200 with message', (done) => {
            chai.request(httpServer)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('string');

                    done();
                });
        });
    });

    describe('/non-existing-route', () => {
        it('should get status 404 with error', (done) => {
            chai.request(httpServer)
                .get('/non-existing-route')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.errors.should.be.a('array');
                    res.body.errors[0].should.have.property('status');

                    done();
                });
        });
    });
});
