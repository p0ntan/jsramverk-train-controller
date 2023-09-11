const database = require('../db/database.js');

/**
 * Object for working with collection tickets in database
 */
const tickets = {
    getTickets: async function getTickets(req, res){
        const collectionName = "tickets";
        const db = await database.openDb();
        const collection = await db.collection(collectionName);
        const allTickets = await collection.find().toArray();

        await db.client.close();

        return res.json({
            data: allTickets
        });
    },

    createTicket: async function createTicket(req, res){
        const collectionName = "tickets";
        const db = await database.openDb();
        const collection = await db.collection(collectionName);

        const result = await collection.insertOne({
            code: req.body.code,
            trainnumber: req.body.trainnumber,
            traindate: req.body.traindate
        })

        await db.client.close();

        return res.json({
            data: {
                id: result.insertedId,
                code: req.body.code,
                trainnumber: req.body.trainnumber,
                traindate: req.body.traindate,
            }
        });
    }
};

module.exports = tickets;
