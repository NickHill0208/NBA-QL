import React, {Component} from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getTeamsQuery = gql`
    {
        teams{
            id
            city
            name
        }
    }
`

class AddPlayer extends Component {
    displayTeams(){
        var data = this.props.data;
        if(data.loading){
            return <option disabled>Loading Teams...</option>
        }
        else{
            var teams = data.teams.sort((a,b) => (a.city + a.name > b.city + b.name) ? 1 : -1);
            return teams.map(team => {
                return <option key={team.id} value={team.id}>{team.city} {team.name}</option>
            });
        }
    }
    render() {
        return (
            <form id="add-player">
                <div className="field">
                    <label>First Name </label>
                    <input type="text"/>
                </div>
                <div className="field">
                    <label>Last Name </label>
                    <input type="text"/>
                </div>
                <div className="field">
                    <label>Jersey Number </label>
                    <input type="text"/>
                </div>
                <div className="field">
                    <label>Team </label>
                    <select>
                        <option>Select Team</option>
                        {this.displayTeams()}
                    </select>
                </div>

                <button>+</button>
            </form>
        );
    }
}

export default graphql(getTeamsQuery)(AddPlayer);