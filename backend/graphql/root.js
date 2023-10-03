const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
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
        test: {
            type: GraphQLString,
            description: 'A test',
            resolve: function() {
                return "hello world";
            }
        },
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
        // teacher: {
        //     type: TeacherType,
        //     description: 'A single teacher',
        //     args: {
        //         acronym: { type: GraphQLString }
        //     },
        //     resolve: async function (parent, args) {
        //         let teachers = await getPeople("teachers");

        //         return teachers.find(teacher => teacher.acronym === args.acronym)
        //     }
        // },
        // teachers: {
        //     type: GraphQLList(TeacherType),
        //     description: 'List of teachers',
        //     resolve: async function() {
        //         return await getPeople("teachers");
        //     }
        // },
        // students: {
        //     type: GraphQLList(StudentType),
        //     description: 'List of students',
        //     resolve: async function() {
        //         return await getPeople("students");
        //     }
        // }
    })
});

module.exports = RootQueryType;