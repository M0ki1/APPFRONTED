import './App.css';
import {
    HashRouter,
    Route,
    Routes,
} from "react-router-dom";
import React from "react";
import TripsPage from "./components/TripsPage";
import BottomBar from "./components/BottomBar/BottomBar";
import TopNav from "./components/TopNav/TopNav";
import HomePage from "./components/HomePage/HomePage";
import FriendsPage from "./components/FriendsPage/FriendsPage";
import MapPage from "./components/MapPage/MapPage";
import SearchPage from "./components/SearchPage/SearchPage";
import SignIn from './components/SignIn/SignIn'
let base64 = require('base-64');






function App() {
    console.log("Estoy dandolo todo")
    const isAuthenticated = localStorage.getItem("token") !== "null";
    console.log(isAuthenticated);
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("token")!=="null");


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payload = {
            email: data.get("email"),
            password: data.get("password"),
        };
        fetch("http://localhost:3000/api/v1/api-keys", {
                method: "post",
                headers: new Headers({
                    "Authorization": `Basic ${base64.encode(`${payload.email}:${payload.password}`)}`
                }),
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorText => {
                        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem("token",data.token);
                window.location.href = "";
                

            })
            .catch(error => {
                alert(error)
                console.log(error)
            });
    }
    return (

        isAuthenticated ? 
        (<div className="App">
        <HashRouter>
            <div className="App__content">
                <TopNav />
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route exact path="/trips" element={<TripsPage />} />
                        <Route exact path="/friends" element={<FriendsPage />} />
                        <Route exact path="/map" element={<MapPage />} />
                        <Route exact path="/search" element={<SearchPage />} />
                    </Routes>
            </div>
            <BottomBar />
        </HashRouter>
    </div>
    ):
    ( 
        <SignIn handleSubmit={handleSubmit} />
    )                       
    );
}


export default App;
