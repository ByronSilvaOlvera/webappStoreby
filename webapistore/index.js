

var app = require('../webapistore/app');
require('dotenv').config();

const server = require('http').createServer(app);

server.listen( process.env.PORT || 3000 , ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});