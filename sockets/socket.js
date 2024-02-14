const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon jovi'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Metalica'));

console.log(bands);

// Mensajes Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });

    client.on('Mensaje', (payload) => {
        console.log(payload);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });
    client.on('emitir-mensaje', (payload) => {
        console.log(payload);

        // io.emit('nuevo-mensaje', payload);  emite a todos
        client.broadcast.emit('nuevo-mensaje', payload); // Emite a tods menos el que lo emitio
    });
    client.on('vote-band', (payload) => {
        console.log(payload);
        bands.voteBand(payload.id);

        io.emit('active-bands', bands.getBands());
        // client.broadcast.emit('nuevo-mensaje', payload); // Emite a tods menos el que lo emitio
    });
    client.on('add-band', (payload) => {
        console.log(payload);
        const newBand = new Band(payload['name']);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });
    client.on('delete-band', (payload) => {
        console.log(payload);

        bands.deleteBand(payload['id']);
        io.emit('active-bands', bands.getBands());
    });

});