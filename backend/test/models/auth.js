/**
 * Test for model auth
 */

/*global it describe before */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const database = require('../../db/database.js');
const authModel = require('../../models/auth.js');

chai.should();

describe('Test model', () => {
    const colName = 'users';
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
     * Test to register a user
     */
    describe('auth register', () => {
        it('should return empty array', async () => {
            const res = await authModel.getUsers();

            res.should.be.a('array');
            res.should.have.lengthOf(0);
        });

        it('should return object with successfull message for new user', async () => {
            const res = await authModel.register({
                email: "test@user.login",
                password: "pAs$w0rD12345"
            });

            res.should.be.a('object');
            res.should.have.property('message');
            res.message.should.include('successfully');
        });

        it('should return error message when missing field password', async () => {
            const res = await authModel.register({
                email: "test@user.login",
            });

            res.should.be.a('object');
            res.should.have.property('error');
            res.error.title.should.include('error');
            res.error.detail.should.include('Missing');
            res.error.detail.should.include('password');
        });


        it('should return error message when user exists', async () => {
            const res = await authModel.register({
                email: "test@user.login",
                password: "pAs$w0rD12345"
            });

            res.should.be.a('object');
            res.should.have.property('error');
            res.error.title.should.include('Register');
            res.error.detail.should.include('already exists');
        });
    });

    /**
     * Test to see there are no users in collection
     */
    describe('auth login', () => {
        const credentials = {
            email: "secondTest@user.login",
            password: "pAs$w0rD12345"
        };

        // First create a user so this part of test not is depending on other description
        it('should return object with successfull message for new user', async () => {
            const res = await authModel.register(credentials);

            res.should.be.a('object');
            res.should.have.property('message');
            res.message.should.include('successfully');
        });

        it('should return object with error wrong password', async () => {
            const res = await authModel.login({
                email: "secondTest@user.login",
                password: "thisiswrong"
            });

            res.should.be.a('object');
            res.should.have.property('error');
            res.error.title.should.include('Login');
            res.error.detail.should.include('Wrong password');
        });

        it('should return object when trying to log in with jwt', async () => {
            const res = await authModel.login(credentials);
            const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
            
            console.dir(res);

            res.should.be.a('object');
            res.should.have.property('jwt');
            res.jwt.should.match(jwtRegex);
        });

        it('should return object with error missing email', async () => {
            const res = await authModel.login({password: "email missing"});

            res.should.be.a('object');
            res.should.have.property('error');
            res.error.title.should.include('Login');
            res.error.detail.should.include('Missing email');
        });

        it('should return object with error non existing email', async () => {
            const res = await authModel.login({
                email: "doesnotexist@no.where",
                password: "willnotwork"
            });

            res.should.be.a('object');
            res.should.have.property('error');
            res.error.title.should.include('Login');
            res.error.detail.should.include('e-mail doesnotexist@no.where dosen\'t exist');
        });
    });
});
