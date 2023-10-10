const { ObjectId } = require('mongodb');
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
        // Create a new ObjectId for the new document
        const newId = new ObjectId();

        // TODO Should it be possible to create more than one ticket for the same train?
        const result = await collection.insertOne({
            _id: newId,
            code: args.code,
            trainnumber: args.trainnumber,
            traindate: args.traindate
        });

        await db.client.close();

        // Here we return the string of the ObjectId but alternatives are available
        // https://www.mongodb.com/docs/manual/reference/method/ObjectId/#ObjectId
        // TODO discuss and agree on returned value
        return {
            _id: newId.toString(),
            code: args.code,
            trainnumber: args.trainnumber,
            traindate: args.traindate,
        };
    },

    updateTicket: async function updateTicket(args) {
        const db = await database.openDb();
        const collection = await db.collection(tickets.collectionName);
        // Create ObjectId based on given _id string
        const ticketId = new ObjectId(args._id);

        const result = await collection.updateOne(
            { _id: ticketId },
            { $set: { code: args.code } }
        );

        await db.client.close();

        if ( result.modifiedCount > 0 ) {
            return {
                _id: args._id
            };
        }
    },

    deleteTicket: async function deleteTicket(args) {
        const db = await database.openDb();
        const collection = await db.collection(tickets.collectionName);
        // Create ObjectId based on given _id string
        const ticketId = new ObjectId(args._id);

        const result = await collection.deleteOne(
            { _id: ticketId }
        );

        await db.client.close();

        if ( result.deletedCount > 0 ) {
            return {
                _id: args._id
            }
        }
    }
};

module.exports = tickets;
