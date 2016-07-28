'use strict';

const Hapi = require('hapi');
const MongoClient = require('mongodb').MongoClient;
const Promise = require("bluebird");

const assert = require('assert');

const url = 'mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge';

// server config
const server = new Hapi.Server();
server.connection({ 
    port: process.env.PORT || 5000 
});

// routes
server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, reply) {
        return reply('hello world!');
    }
});

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected to database.");

    process.on('exit', exitHandler.bind(null,{cleanup:true, db}));
    process.on('SIGINT', exitHandler.bind(null, {exit:true, db}));
    process.on('uncaughtException', exitHandler.bind(null, {exit:true, db}));

    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});

function exitHandler(options, err) {
    console.log("Cleanup...");
    options.db.close();
}


