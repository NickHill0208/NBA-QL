import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getPlayersQuery} from '../queries/queries';

//components
import PlayerDetails from './PlayerDetails';

class PlayerList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }
    displayPlayers(){
        var data = this.props.data;
        if(data.loading){
            return (<div>Loading Players...</div>);
        }
        else{
            var players = data.players.sort((a,b) => (a.fName + a.lName > b.fName + b.lName) ? 1 : -1)
            return players.map(player => {
                return (<li key={player.id} onClick={(e) => this.setState({selected: player.id})}>{player.fName} {player.lName}, #{player.number}</li>);
            })
        }
    }
    render() {
        return (
            <div>
                <ul id="player-list">
                    { this.displayPlayers() }
                </ul>
                <PlayerDetails playerId={this.state.selected}/>
            </div>
        );
    }
}

export default graphql(getPlayersQuery)(PlayerList);