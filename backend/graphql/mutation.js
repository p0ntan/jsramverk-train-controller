const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const UserType = require('./user.js');
const TicketType = require('./ticket.js');
const ticketsModel = require('../models/tickets.js');
const authModel = require('../models/auth.js');

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
            resolve: async function(_, args, context) {
                if (!context.req.isAuth) {
                    // IF not authenticated this error-text will show in graphql-response
                    throw new Error("Not authenticated.")
                }

                try {
                    const newTicket = await ticketsModel.createTicket(args);

                    return newTicket;
                } catch (error) {
                    throw new Error('Error creating a ticket: ' + error.message);
                }
            }
        },
        createUser: {
            type: UserType,
            description: 'Create a new user',
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async function(_, args) {
                try {
                    const user = await authModel.register(args);

                    return user;
                } catch (error) {
                    throw new Error('Error creating a user: ' + error.message);
                }
            }
        }
    }),
});

module.exports = RootMutationType;
