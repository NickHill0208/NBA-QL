const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLNonNull} = graphql;

const Player = require('../models/player');
const Team = require('../models/team');


var playersData = [
    {id: '1', fName: 'James', lName: 'Harden', teamId: '1', number: 13},
    {id: '2', fName: 'Kawhi', lName: 'Leonard', teamId: '2', number: 2},
    {id: '3', fName: 'Jimmy', lName: 'Butler', teamId: '3', number: 22},
    {id: '4', fName: 'Russell', lName: 'Westbrook', teamId:'1', number: 0},
    {id: '5', fName: 'Paul', lName: 'George', teamId: '2', number: 13},
];

var teamsData = [
    {id:'1', city:'Houston', name: 'Rockets'},
    {id:'2', city:'Los Angeles', name: 'Clippers'},
    {id:'3', city:'Miami', name: 'Heat'}
];

const PlayerType = new GraphQLObjectType({
    name:'Player',
    fields:() => ({
        id: {type: GraphQLID},
        fName: {type: GraphQLString},
        lName: {type: GraphQLString},
        teamId: {type: GraphQLID},
        number: {type: GraphQLInt},
        team: { 
            type: TeamType,
            resolve(parent, args){
                return _.find(teamsData,{id: parent.teamId})
                //return Team.findById(parent.teamId);
            }
        }
    })
});

const TeamType = new GraphQLObjectType({
    name:'Team',
    fields:() => ({
        id: {type: GraphQLID},
        city: {type: GraphQLString},
        name: {type: GraphQLString},
        players: {
            type: new GraphQLList(PlayerType),
            resolve(parent, args){
                return _.filter(playersData, {teamId: parent.id})
                //return Player.find({teamId:parent.id});
            }
        }
    })
});

const GameType = new GraphQLObjectType({
    name:'Game',
    fields:() => ({
        id: {type: GraphQLID},
        date: {type: GraphQLString}, 
        homeTeamId: {type: GraphQLID},
        awayTeamId: {type: GraphQLID},
        homeTeam: {
            type: TeamType,
            resolve(parent, args){
                return Team.findById(parent.homeTeamId);
            }
        },
        awayTeam: {
            type: TeamType,
            resolve(parent, args){
                return Team.findById(parent.awayTeamId);
            }
        }
    })
});

const StatlineType = new GraphQLObjectType({
    name:'Statline',
    fields:() => ({
        id: {type: raphQLID},
        gameId: {type: GraphQLID},
        playerId: {type: GraphQLID},
        minutes: {type: GraphQLFloat},
        points: {type: GraphQLInt},
        rebounds: {type: GraphQLInt},
        assists: {type: GraphQLInt},
        blocks: {type: GraphQLInt},
        steals: {type: GraphQLInt},
        turnovers: {type: GraphQLInt},
        fouls: {type: GraphQLInt},
        blocks: {type: GraphQLInt},
        player: {
            type: PlayerType,
            resolve(parent, args){
                return Player.findById(parent.playerId);
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
                return _.find(playersData,{id:args.id});
                //return Player.findById(args.id);
            }
        },
        team: {
            type: TeamType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
                return _.find(teamsData,{id:args.id});
                //return Team.findById(args.id)
            }
        },
        players: {
            type: new GraphQLList(PlayerType),
            resolve(parent,args){
                return playersData;
                //return Player.find({});
            }
        },
        teams: {
            type: new GraphQLList(TeamType),
            resolve(parent,args){
                return teamsData;
                //return Team.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addPlayer: {
            type: PlayerType,
            args: {
                fName: {type: new GraphQLNonNull(GraphQLString)},
                lName: {type: new GraphQLNonNull(GraphQLString)},
                teamId: {type: new GraphQLNonNull(GraphQLID)},
                number: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let player = new Player({
                    fName: args.fName,
                    lName: args.lName,
                    teamId: args.teamId,
                    number: args.number
                });
                return player.save();
            }
        },
        addTeam: {
            type: TeamType,
            args: {
                city: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                let team = new Team({
                    city: args.city,
                    name: args.name
                });
                return team.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})