const express = require('express');
const router = express.Router();

const tickets = require("../models/tickets.js");

// TODO If needed tickets for frontend-vue when changing to GraphQL this needs to be changed
// Now the function is returning an array and not a json-response
router.get('/', (req, res) => tickets.getTickets(req, res));

router.post('/', (req, res) => tickets.createTicket(req, res));

module.exports = router;
