const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLNonNull} = graphql;

const Player = require('../models/player');
const Team = require('../models/team');


var playersData = [
    {id: '1', fName: 'James', lName: 'Harden', teamId: '1', number: 13, position: "SG"},
    {id: '2', fName: 'Kawhi', lName: 'Leonard', teamId: '2', number: 2, position: "SF"},
    {id: '3', fName: 'Jimmy', lName: 'Butler', teamId: '3', number: 22, position: "SF"},
    {id: '4', fName: 'Russell', lName: 'Westbrook', teamId:'1', number: 0, position: "PG"},
    {id: '5', fName: 'Paul', lName: 'George', teamId: '2', number: 13, position: "SF"},
];

var teamsData = [
    {id:'1', city:'Houston', name: 'Rockets'},
    {id:'2', city:'Los Angeles', name: 'Clippers'},
    {id:'3', city:'Miami', name: 'Heat'}
];

var gamesData = [
    {id:'1', date:'2020-08-03', homeTeamId: '1', awayTeamId: '2'},
    {id:'2', date:'2020-08-03', homeTeamId: '3', awayTeamId: '2'}
];

var statlinesData = [

];

const PlayerType = new GraphQLObjectType({
    name:'Player',
    fields:() => ({
        id: {type: GraphQLID},
        fName: {type: GraphQLString},
        lName: {type: GraphQLString},
        teamId: {type: GraphQLID},
        number: {type: GraphQLInt},
        position: {type: GraphQLString},
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
                return _.find(teamsData,{id: parent.homeTeamId});
                //return Team.findById(parent.homeTeamId);
            }
        },
        homeScore: {
            type: GraphQLInt,
            resolve(parent, args){
                let x = _.filter(statlinesData,{gameId: parent.id, teamId: parent.homeTeamId});
                let score = 0;
                x.forEach(element => {
                    score += element.points;
                });
                return score;
            }
        },
        awayTeam: {
            type: TeamType,
            resolve(parent, args){
                return _.find(teamsData,{id: parent.awayTeamId});
                //return Team.findById(parent.awayTeamId);
            }
        },
        awayScore: {
            type: GraphQLInt,
            resolve(parent, args){
                let x = _.filter(statlinesData,{gameId: parent.id, teamId: parent.awayTeamId});
                let score = 0;
                x.forEach(element => {
                    score += element.points;
                });
                return score;
            }
        }
    })
});

const StatlineType = new GraphQLObjectType({
    name:'Statline',
    fields:() => ({
        id: {type: GraphQLID},
        teamId: {type: GraphQLID},
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
                return _.find(playersData,{id: parent.playerId});
                //return Player.findById(parent.playerId);
            }
        },
        game: {
            type: GameType,
            resolve(parent, args){
                return _.find(gamesData,{id: parent.gameId});
                //return Game.findById(parent.gameId);
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
        },
        game: {
            type: GameType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(gamesData, {id: args.id});
            }
        },
        games: {
            type: new GraphQLList(GameType),
            resolve(parent, args){
                return gamesData;
            }
        },
        statline: {
            type: StatlineType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(statlinesData, {id: args.id});
            }
        },
        statlines: {
            type: StatlineType,
            args: {playerId: {type: GraphQLID}},
            resolve(parent, args){
                return _.filter(statlinesData, {playerId: args.playerId});
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
                number: {type: new GraphQLNonNull(GraphQLInt)},
                position: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                let player = new Player({
                    fName: args.fName,
                    lName: args.lName,
                    teamId: args.teamId,
                    number: args.number,
                    position: args.position
                });
                playersData.push(player);
                return player;
                //return player.save();
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
                teamsData.push(team);
                return team;
                //return team.save();
            }
        },
        removePlayer: {
            type: GraphQLString,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                playersData = playersData.filter(function(player) {
                    if(player.id === args.id) return false;
                    return true;
                });
                return "Success";
            }
        },
        editPlayer: {
            type: PlayerType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                fName: {type: GraphQLString},
                lName: {type: GraphQLString},
                teamId: {type: GraphQLID},
                number: {type: GraphQLInt},
                position: {type: GraphQLString},
            },
            resolve(parent, args){
                playersData.forEach(element => {
                    if(element.id == args.id){
                        if(args.fName != undefined) element.fName = args.fName;
                        if(args.lName != undefined) element.lName = args.lName;
                        if(args.teamId != undefined) element.teamId = args.teamId;
                        if(args.number != undefined) element.number = args.number;
                        if(args.position != undefined) element.position = args.position;
                        let player = new Player({
                            fName: element.fName,
                            lName: element.lName,
                            teamId: element.teamId,
                            number: element.number,
                            position: element.position
                        });
                        return player;
                    }
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})