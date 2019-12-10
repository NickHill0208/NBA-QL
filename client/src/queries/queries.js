import {gql} from 'apollo-boost';

const getPlayersQuery = gql`
    {
        players{
            id
            fName
            lName
            number
            teamId
        }
    }
`;

const getPlayerQuery = gql`
    query GetPlayer($id:ID){
        player(id:$id){
            id
            fName
            lName
            number
            teamId
            team{
                id
                city
                name
                players{
                    id
                    fName
                    lName
                    number
                }
            }
        }
    }
`;


const getTeamsQuery = gql`
    {
        teams{
            id
            city
            name
        }
    }
`;

const addPlayerMutation = gql`
    mutation($fName: String!, $lName: String!, $number:Int!, $teamId:ID!){
        addPlayer(fName:$fName,lName:$lName,number:$number,teamId:$teamId){
            fName
            lName
            id
        }
    }
`;

export {getPlayersQuery,getTeamsQuery,addPlayerMutation, getPlayerQuery};