const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const login = require('./login');

const app = express();

//allow cross-origin requests
app.use(cors());

mongoose.connect(login.login, { useNewUrlParser: true, useUnifiedTopology: true });//connect to MongoDB
mongoose.connection.once('open', () =>{
    console.log('Connected to database: ' + login.login);
});

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000');
});