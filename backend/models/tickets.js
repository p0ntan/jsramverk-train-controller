const database = require('../db/database.js');

/**
 * Object for working with collection tickets in database
 */
const tickets = {
    collectionName: "tickets",

    getTickets: async function getTickets() {
        const allTickets = await database.getCollection(tickets.collectionName);

        return allTickets;
    },

    createTicket: async function createTicket(args) {
        const db = await database.openDb();
        const collection = await db.collection(tickets.collectionName);

        const result = await collection.insertOne({
            code: args.code,
            trainnumber: args.trainnumber,
            traindate: args.traindate
        });

        await db.client.close();

        return {
            _id: result.insertedId,
            code: args.code,
            trainnumber: args.trainnumber,
            traindate: args.traindate,
        };
    }
};

module.exports = tickets;
