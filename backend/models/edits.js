// Function that handles the separation of tickets being updated
const tickets = require('./tickets');

async function editTicket(io) {
    // Get all tickets
    let allTickets = await tickets.getTickets();
    // List with tickets that are being edited
    let editedTickets = []

    io.sockets.on('connection', async function(socket) {
        // Emit all tickets
        socket.emit("tickets", allTickets);

        socket.on('startEditingTicket', (data) => {
            // Add the _id of the ticket being modified
            editedTickets.push(data);
            // console.log(editedTickets);
            io.emit("blockedTickets", editedTickets);
        })

        socket.on('stopEditingTicket', (data) => {
            let index = editedTickets.indexOf(data);
            // Removes the _id of the ticket being modified
            editedTickets.splice(index, 1);
            // console.log(editedTickets)
            io.emit("blockedTickets", editedTickets);
        })
    })
}

module.exports = editTicket;
