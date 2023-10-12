// Function that handles the separation of tickets being updated
const tickets = require('./tickets');

async function editTicket(io) {
    // Get all tickets
    let allTickets = await tickets.getTickets();
    // List with tickets that are being edited
    let editedTickets = []

    io.sockets.on('connection', function(socket) {
        // Emit all tickets
        socket.on('fetchTickets', () => {
            socket.emit("tickets", allTickets);
        })

        socket.on('fetchBlockedTickets', () => {
            socket.emit("blockedTickets", editedTickets);
        })

        socket.on('startEditingTicket', (data) => {
            // Add the _id of the ticket being modified
            editedTickets.push(data);
            console.log(editedTickets);
            io.emit('blockedTickets', editedTickets);
        })

        socket.on('stopEditingTicket', (data) => {
            let index = editedTickets.indexOf(data);

            // Removes the _id of the ticket being modified
            editedTickets.splice(index, 1);
            console.log(editedTickets)

            io.emit('blockedTickets', editedTickets);
        })

        socket.on('updateTickets', async (ticketData) => {
            // Ticketdata is provieded when updating or creating new ticket
            if (ticketData) {
                let found = false;

                allTickets.map(ticket => {
                    if (ticket._id.toString() === ticketData._id) {
                        found = true;

                        ticket.code = ticketData.code;
                    }

                    return ticket;
                })

                if (!found) {
                    allTickets.push(ticketData);
                }
            }
            io.emit('tickets', allTickets);
        })
    })
}

module.exports = editTicket;
