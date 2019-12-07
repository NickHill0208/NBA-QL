const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

var playersData = [
    {id: '1', fName: 'James', lName: 'Harden', teamId: '1'},
    {id: '2', fName: 'Kawhi', lName: 'Leonard', teamId: '2'},
    {id: '3', fName: 'Jimmy', lName: 'Butler', teamId: '3'},
    {id: '4', fName: 'Russell', lName: 'Westbrook', teamId:'1'}
];

var teamsData = [
    {id:'1', city:'Houston', name: 'Rockets'},
    {id:'2', city:'Los Angeles', name: 'Clippers'},
    {id:'3  ', city:'Miami', name: 'Heat'}
];

const PlayerType = new GraphQLObjectType({
    name:'Player',
    fields:() => ({
        id: {type:GraphQLID},
        fName: {type: GraphQLString},
        lName: {type: GraphQLString},
        teamId: {type: GraphQLID},
        team: { 
            type: TeamType,
            resolve(parent, args){
                return _.find(teamsData,{id: parent.teamId})
            }
        }
    })
});

const TeamType = new GraphQLObjectType({
    name:'Team',
    fields:() => ({
        id: {type:GraphQLID},
        city: {type: GraphQLString},
        name: {type: GraphQLString},
        players: {
            type: new GraphQLList(PlayerType),
            resolve(parent, args){
                return _.filter(playersData, {teamId: parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        player: {
            type: PlayerType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
                //code to get data from db
                return _.find(playersData,{id:args.id});
            }
        },
        team: {
            type: TeamType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
                //code to get data from db
                return _.find(teamsData,{id:args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})