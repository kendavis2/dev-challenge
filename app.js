'use strict';

const Hapi = require('hapi');

console.log("trying...");

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    port: process.env.PORT || 5000 
});

// Add the route
server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, reply) {

        return reply('hello world!');
    }
});

// Start the server
server.start(function(err) {
    console.log("still trying...");
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});