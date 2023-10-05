const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const TicketType = require('./ticket.js');
const ticketsModel = require('../models/tickets.js');

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        createTicket: {
            type: TicketType,
            description: 'Create a new ticket',
            args: {
                code: { type: GraphQLNonNull(GraphQLString) },
                trainnumber: { type: GraphQLNonNull(GraphQLString) },
                traindate: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async function(_, args) {
                try {
                    const newTicket = await ticketsModel.createTicket(args);

                    return newTicket;
                } catch (error) {
                    throw new Error('Error creating a ticket: ' + error.message);
                }
            },
        },
    }),
});

module.exports = RootMutationType;
