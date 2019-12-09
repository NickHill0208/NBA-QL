import React, {Component} from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

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

class PlayerList extends Component {
    displayPlayers(){
        var data = this.props.data;
        if(data.loading){
            return <div>Loading Players...</div>
        }
        else{
            return data.players.map(player => {
                return <li key={player.id}>{player.fName} {player.lName}</li>
            })
        }
    }
    render() {
        return (
            <div>
                <ul id="player-list">
                    { this.displayPlayers() }
                </ul>
            </div>
        );
    }
}

export default graphql(getPlayersQuery)(PlayerList);