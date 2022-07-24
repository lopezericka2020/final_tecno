
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import AppMain from "./layouts/app";

const client = new ApolloClient( {
  uri: 'http://localhost:7777/graphql',
  cache: new InMemoryCache( {
    typePolicies: {
      Query: {
        fields: {
          memorandum: {
            merge( existing, incoming ) {
              return incoming;
            }
          },
          projects: {
            merge( existing, incoming ) {
              return incoming;
            }
          }
        }
      }
    }
  } ),
} );

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AppMain />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
