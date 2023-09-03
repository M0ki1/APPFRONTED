import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './theme';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {setContext} from '@apollo/client/link/context';
import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';
import {AUTH_TOKEN} from "./constants";
import SignIn from './components/SignIn/SignIn'
 


//This function sets the headers for authentication every time using the bearer token
const authLink = setContext((_, {headers}) => {
    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${AUTH_TOKEN}`,
            // accessControlAllowOrigin: '*',
            // accessControlAllowHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
        }
    };
});

const hostname = window.location.hostname;
const baseUrl = `http://${hostname}:3000/`
let gqlUrl = `${baseUrl}/api/v1/graphql`;

//Esto es el HTTPLINK DE GRAPHQL
const gqlHTTPLink = createHttpLink({
    uri: gqlUrl,
});

//esto es el cliente para GraphQl
const client = new ApolloClient({
    link: authLink.concat(gqlHTTPLink),
    cache: new InMemoryCache({
    },),
});

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get("email"),
      password: data.get("password"),
    };
    
  };


//Aqui trabajamos el root
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}

            <SignIn handleSubmit={handleSubmit}/>

    </ThemeProvider>
    </ApolloProvider>
);
reportWebVitals(console.log);