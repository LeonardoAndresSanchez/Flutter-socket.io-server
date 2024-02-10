const { io } = require('../index');


// Mensajes Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');
    client.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });

    client.on('Mensaje', (payload) => {
        console.log(payload);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    })

});