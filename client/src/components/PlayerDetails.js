import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getPlayerQuery} from '../queries/queries';

class PlayerDetails extends Component{
    displayPlayerDetails(){
        const {player} = this.props.data;
        if(player){
            return (
                <div>
                    <h2>{player.fName} {player.lName}, #{player.number}</h2>
                    <p>{player.team.city} {player.team.name}</p>
                    <p>Teammates</p>
                    <ul className="other-players">
                        { player.team.players.filter(teammate => teammate.fName !== player.fName && teammate.lName !== player.lName).map(teammate => {
                            return (<li key={teammate.id}>{teammate.fName} {teammate.lName}</li>)
                        })}
                    </ul>
                </div>
            );
        }
        else{
            return (<div>No player selected...</div>);
        }
    }
    render(){
        console.log(this.props);
        return(
            <div id="player-details">
                {this.displayPlayerDetails()}
            </div>
        );
    }
}

export default graphql(getPlayerQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.playerId
            }
        }
    }
})(PlayerDetails);