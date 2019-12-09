import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {getTeamsQuery, addPlayerMutation, getPlayersQuery} from '../queries/queries';


class AddPlayer extends Component {
    constructor(props){
        super(props);
        this.state = {
            fName: '',
            lName: '',
            jerseyNumber: '',
            teamId: ''
        }
    }
    displayTeams(){
        var data = this.props.getTeamsQuery;
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
    submitForm(e){
        e.preventDefault();
        var jerseyNumber;
        if(isNaN(this.state.jerseyNumber)){
            jerseyNumber = 0;
        }
        else{
            jerseyNumber = parseInt(this.state.jerseyNumber);
        }
        this.props.addPlayerMutation({
            variables: {
                fName: this.state.fName,
                lName: this.state.lName,
                number: jerseyNumber,
                teamId: this.state.teamId
            },
            refetchQueries: [{query: getPlayersQuery}]
        });
    }
    render() {
        return (
            <form id="add-player" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>First Name </label>
                    <input type="text" onChange={(e) => this.setState({fName: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Last Name </label>
                    <input type="text" onChange={(e) => this.setState({lName: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Jersey Number </label>
                    <input type="text" onChange={(e) => this.setState({jerseyNumber: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Team </label>
                    <select onChange={(e) => this.setState({teamId: e.target.value})}>
                        <option>Select Team</option>
                        {this.displayTeams()}
                    </select>
                </div>

                <button>+</button>
            </form>
        );
    }
}

export default compose(
    graphql(getTeamsQuery, {name: 'getTeamsQuery'}),
    graphql(addPlayerMutation, {name: 'addPlayerMutation'})
)(AddPlayer);