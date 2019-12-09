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
`

const getPlayerQuery = gql`
    query($id:ID!){
        player(id:$id){
            id
            fName
            lName
            number
            teamId
        }
    }
`


const getTeamsQuery = gql`
    {
        teams{
            id
            city
            name
        }
    }
`

const addPlayerMutation = gql`
    mutation($fName: String!, $lName: String!, $number:Int!, $teamId:ID!){
        addPlayer(fName:$fName,lName:$lName,number:$number,teamId:$teamId){
            fName
            lName
            id
        }
    }
`

export {getPlayersQuery,getTeamsQuery,addPlayerMutation};