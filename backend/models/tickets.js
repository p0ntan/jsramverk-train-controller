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
    },

    updateTicket: async function updateTicket(args) {
        const db = await database.openDb();
        const collection = await db.collection(tickets.collectionName);

        const result = await collection.updateOne(
            { _id: args._id },
            { $set: { code: args.code } }
        );
        console.log(result)

        await db.client.close();

        if ( result.modifiedCount ) {
            return {
                _id: args._id,
                code: args.code
            };
        }
    }
};

module.exports = tickets;
