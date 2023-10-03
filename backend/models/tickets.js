const database = require('../db/database.js');

/**
 * Object for working with collection tickets in database
 */
const tickets = {
    collectionName: "tickets",

    getTickets: async function getTickets(req, res) {
        const allTickets = await database.getCollection(tickets.collectionName);

        // return await res.json({
        //     data: allTickets
        // });

        return allTickets;
    },

    createTicket: async function createTicket(req, res) {
        const db = await database.openDb();
        const collection = await db.collection(tickets.collectionName);

        const result = await collection.insertOne({
            code: req.body.code,
            trainnumber: req.body.trainnumber,
            traindate: req.body.traindate
        });

        await db.client.close();

        return await res.status(201).json({
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
