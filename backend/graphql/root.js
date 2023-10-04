const {
    GraphQLObjectType,
    GraphQLList
} = require('graphql');


const TicketType = require("./ticket.js");
const CodeType = require("./code.js");
const DelayedType = require("./delayed.js");
const ticketsModel = require('../models/tickets.js');
const codeModel = require('../models/codes.js');
const delayedModel = require('../models/delayed.js');

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        tickets: {
            type: GraphQLList(TicketType),
            description: 'A list of tickets',
            resolve: async function() {
                return await ticketsModel.getTickets();
            }
        },
        codes: {
            type: GraphQLList(CodeType),
            description: 'A list of codes',
            resolve: async function() {
                return await codeModel.getCodes();
            }
        },
        delayed: {
            type: GraphQLList(DelayedType),
            description: 'A list of delayed trains',
            resolve: async function() {
                return await delayedModel.getDelayedTrains();
            }
        }
    })
});

module.exports = RootQueryType;
