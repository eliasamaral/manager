import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import client from "./utility/apollo.js"
import { ApolloProvider } from "@apollo/react-hooks";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
