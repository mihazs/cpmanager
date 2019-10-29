import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Layout from "./components/layout";
import Switch from 'react-router-transition-switch'
import Fader from 'react-fader'
import Home from "./pages/home.js";
import './nprogress.css';
import useProgress from 'use-progress';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloNetworkStatusProvider, useApolloNetworkStatus} from 'react-apollo-network-status';
import PageLoader from "./components/page-loader";

//Componente para lidar com o progresso das queries e mostrar o nprogress
function NProgressLoader() {  
  const [status, done] = useProgress({ mountOnly: false });
  const {numPendingQueries} = useApolloNetworkStatus();
  if (numPendingQueries == 0) {
    done();
  } 
  return (<></>);
}

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client = {client}>
      <ApolloNetworkStatusProvider>
      <NProgressLoader/>
      <Layout>
        <Router>          
          <Switch component={Fader}>
            <Route exact path="/" component={Home} />

            </Switch>
        </Router>
      </Layout>
      </ApolloNetworkStatusProvider>
    </ApolloProvider>
    );
}

export default App;
