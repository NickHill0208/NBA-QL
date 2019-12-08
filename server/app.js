const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

var login = 'mongodb://Test:1234567890123456@SG-Test-28803.servers.mongodirector.com:27017/Test';
//user:Test
//pw: 1234567890123456

mongoose.connect(login);
mongoose.connection.once('open', () =>{
    console.log('Connected to database');
});

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000');
});