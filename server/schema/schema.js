const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

var testData = [
    {id: '1', fName: 'James', lName: 'Harden'},
    {id: '2', fName: 'Kawhi', lName: 'Leonard'},
    {id: '3', fName: 'Jimmy', lName: 'Butler'}
];


const PlayerType = new GraphQLObjectType({
    name:'Player',
    fields:() => ({
        id: {type:GraphQLString},
        fName: {type: GraphQLString},
        lName: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        player: {
            type: PlayerType,
            args: {id: {type:GraphQLString}},
            resolve(parent, args){
                //code to get data from db
                return _.find(testData,{id:args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})