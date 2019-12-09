import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getPlayersQuery} from '../queries/queries';



class PlayerList extends Component {
    displayPlayers(){
        var data = this.props.data;
        if(data.loading){
            return <div>Loading Players...</div>
        }
        else{
            var players = data.players.sort((a,b) => (a.fName + a.lName > b.fName + b.lName) ? 1 : -1)
            return players.map(player => {
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