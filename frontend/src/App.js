import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./components/layout";
import Switch from "react-router-transition-switch";
import Fader from "react-fader";
import Home from "./pages/home.js";
import New from "./pages/new.js";
import "./nprogress.css";
import useProgress from "use-progress";
import { InMemoryCache, defaultDataIdFromObject} from "apollo-cache-inmemory";
import {
  ApolloNetworkStatusProvider,
  useApolloNetworkStatus
} from "react-apollo-network-status";
import PageLoader from "./components/page-loader";
import { createGlobalStyle } from "styled-components";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #494655;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 1000'%3E%3Cg %3E%3Ccircle fill='%23494655' cx='50' cy='0' r='50'/%3E%3Cg fill='%23504d5e' %3E%3Ccircle cx='0' cy='50' r='50'/%3E%3Ccircle cx='100' cy='50' r='50'/%3E%3C/g%3E%3Ccircle fill='%23575566' cx='50' cy='100' r='50'/%3E%3Cg fill='%235f5c6f' %3E%3Ccircle cx='0' cy='150' r='50'/%3E%3Ccircle cx='100' cy='150' r='50'/%3E%3C/g%3E%3Ccircle fill='%23666377' cx='50' cy='200' r='50'/%3E%3Cg fill='%236d6b80' %3E%3Ccircle cx='0' cy='250' r='50'/%3E%3Ccircle cx='100' cy='250' r='50'/%3E%3C/g%3E%3Ccircle fill='%23747288' cx='50' cy='300' r='50'/%3E%3Cg fill='%237b7991' %3E%3Ccircle cx='0' cy='350' r='50'/%3E%3Ccircle cx='100' cy='350' r='50'/%3E%3C/g%3E%3Ccircle fill='%23838199' cx='50' cy='400' r='50'/%3E%3Cg fill='%238a88a2' %3E%3Ccircle cx='0' cy='450' r='50'/%3E%3Ccircle cx='100' cy='450' r='50'/%3E%3C/g%3E%3Ccircle fill='%239190aa' cx='50' cy='500' r='50'/%3E%3Cg fill='%239897b3' %3E%3Ccircle cx='0' cy='550' r='50'/%3E%3Ccircle cx='100' cy='550' r='50'/%3E%3C/g%3E%3Ccircle fill='%239f9ebb' cx='50' cy='600' r='50'/%3E%3Cg fill='%23a7a6c4' %3E%3Ccircle cx='0' cy='650' r='50'/%3E%3Ccircle cx='100' cy='650' r='50'/%3E%3C/g%3E%3Ccircle fill='%23aeadcc' cx='50' cy='700' r='50'/%3E%3Cg fill='%23b5b4d5' %3E%3Ccircle cx='0' cy='750' r='50'/%3E%3Ccircle cx='100' cy='750' r='50'/%3E%3C/g%3E%3Ccircle fill='%23bcbcdd' cx='50' cy='800' r='50'/%3E%3Cg fill='%23c3c3e6' %3E%3Ccircle cx='0' cy='850' r='50'/%3E%3Ccircle cx='100' cy='850' r='50'/%3E%3C/g%3E%3Ccircle fill='%23cbcaee' cx='50' cy='900' r='50'/%3E%3Cg fill='%23d2d2f7' %3E%3Ccircle cx='0' cy='950' r='50'/%3E%3Ccircle cx='100' cy='950' r='50'/%3E%3C/g%3E%3Ccircle fill='%23d9d9ff' cx='50' cy='1000' r='50'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: contain;
    min-height:100vh;
  }
`;
//Componente para lidar com o progresso das queries e mostrar o nprogress
function NProgressLoader() {
  const [status, done] = useProgress({ mountOnly: false });
  const { numPendingQueries } = useApolloNetworkStatus();
  if (numPendingQueries == 0) {
    done();
  }
  return <></>;
}
const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'CadastroPessoa': return object._id
      default: return defaultDataIdFromObject(object)
    }
  }
})
const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloNetworkStatusProvider>
        <NProgressLoader />
        <ToastContainer/>
        <GlobalStyle />
        <Layout>
          <Router>
            <Switch component={Fader}>
              <Route exact path="/" component={Home} />
              <Route exact path="/new" component={New} />
            </Switch>
          </Router>
        </Layout>
      </ApolloNetworkStatusProvider>
    </ApolloProvider>
  );
}

export default App;
