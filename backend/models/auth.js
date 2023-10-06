const database = require('../db/database.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
const saltRounds = 10;

/**
 * Object for register, login and other auth related things
 */
const auth = {
    collectionName: "users",

    // Get users, will likley only be used for test
    getUsers: async function getUsers() {
        const users = await database.getCollection(auth.collectionName);

        return users;
    },

    /**
     * Register function for register new users
     *
     * @returns object with message or error if not successful
     */
    register: async function register({ email, password }) {
        // Return error message if missing some input
        if (!email || !password) {
            return {
                errors: {
                    title: "Register error",
                    detail: "Missing email or password."
                }
            };
        }

        // TODO email and password validation

        // Check if email exists, if it already does return an object with errormessage
        const user = await auth._emailExist(email);

        if (user) {
            return {
                errors: {
                    title: "Register error.",
                    detail: "User already exists."
                }
            };
        }

        // db needs to be defined outside try/catch/finally to work
        let db;

        try {
            // Hash password
            const hash = await bcrypt.hash(password, saltRounds);

            // Open and save new user to database
            db = await database.openDb();
            const collection = await db.collection(auth.collectionName);

            await collection.insertOne({
                email: email,
                password: hash // is the password that been hashed by bcrypt
            });

            return {
                message: "User successfully registred."
            };
        } catch (err) {
            return {
                errors: {
                    title: "Db input error",
                    detail: err
                }
            };
        } finally {
            await db.client.close();
        }
    },

    /**
     * Login function for logging in a user
     *
     * @returns object with data or error if not successful
     */
    login: async function login({ email, password}) {
        // Return error message if missing some input
        if (!email || !password) {
            return {
                errors: {
                    title: "Login error",
                    detail: "Missing email or password."
                }
            };
        }

        // Check if email exists, if it already does return an object with errormessage
        const user = await auth._emailExist(email);

        if (!user) {
            return {
                errors: {
                    title: "Login error.",
                    detail: `User with e-mail ${email} dosen't exist.`
                }
            };
        }

        try {
            // Control password
            const success = await bcrypt.compare(password, user.password);

            // If the passwords don't match
            if (!success) {
                return {
                    errors: {
                        title: "Login error",
                        detail: "Wrong password"
                    }
                };
            }

            // TODO now payload is only using email, if more data is wanted it can be put here
            let payload = { email: user.email };
            let jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });

            return {
                jwt: jwtToken,
                message: "User successfully logged in."
            };
        } catch (err) {
            return {
                errors: {
                    title: "bcrypt error",
                    detail: err
                }
            };
        }
    },

    /**
     * Function used as middleware to verify jwt
     * 
     * @returns void
     */
    checkToken: function checkToken(req, res, next) {
        const jwtToken = req.headers['x-access-token'];
        // const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlY29uZFRlc3RAdXNlci5sb2dpbiIsImlhdCI6MTY5NjU3NjM5NywiZXhwIjoxNjk2NjYyNzk3fQ.Q6TaezxcPb-encdtoTECzti6Qem7JVBLc9_nRfydp1E";
        req.isAuth = false; // Boolean to use check if a user is verified

        if (jwtToken) {
            try {
                const decoded = jwt.verify(jwtToken, jwtSecret)
                req.user = {};
                req.user.email = decoded.email;
                req.isAuth = true;

            } catch (err) {
                console.log(err);
                req.isAuth = false;
            }
        }

        next();
    },

    // Function is not supposed to be used outside model
    _emailExist: async function _emailExist(email) {
        const db = await database.openDb();
        const collection = await db.collection(auth.collectionName);
        const user = await collection.findOne({ email: email });

        return user;
    }
};

module.exports = auth;
