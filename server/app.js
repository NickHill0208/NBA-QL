const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cross-origin requests
app.use(cors());

//user:Test
//pw: 1234567890123456
// var login = 'mongodb://Test:1234567890123456@SG-Test-28803.servers.mongodirector.com:27017/Test';


// mongoose.connect(login);//connect to MongoDB
// mongoose.connection.once('open', () =>{
//     console.log('Connected to database');
// });

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000');
});