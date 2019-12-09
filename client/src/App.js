import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//components
import PlayerList from './components/PlayerList';
import AddPlayer from './components/AddPlayer';

//apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>NBA API Client</h1>
        <PlayerList/>
        <AddPlayer/>
      </div>
    </ApolloProvider>
  );
}

export default App;
