// test for io socket
// import tickets from './tickets';
const tickets = require('./tickets');

async function editTicket(io) {
    let allTickets = await tickets.getTickets();
    let editedTickets = []

    io.sockets.on('connection', function(socket) {
        // console.log("test socket", socket.id);

        // Get all tickets
        // console.log(allTickets);
        socket.emit("tickets", allTickets);

        socket.on('startEditingTicket', (data) => {
            // returns the ticket it being modified
            editedTickets.push(data);
            console.log(editedTickets);
        })

        // Join room when created
        // socket.on('create', function(room) {
        //     socket.join(room);
        //     console.log(room);
        // });

        socket.on('stopEditingTicket', (data) => {
            let index = editedTickets.indexOf(data);

            editedTickets.splice(index, 1);
            console.log(editedTickets)
        })

    })
}

module.exports = editTicket;
