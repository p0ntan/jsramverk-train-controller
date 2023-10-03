const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

// const OrderType = require("./order.js");
const TicketType = require("./ticket.js");
const ticketsModel = require('../models/tickets.js');

// const ordersModel = require("../models/orders.js");

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
            type: new GraphQLList(TicketType),
            description: 'A list of tickets',
            resolve: async function() {
                const res = await ticketsModel.getTickets();

                return res;
            }
        },
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