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
import TripPage from './components/TripPage/TripPage'
import DestinationForm from './components/DestinationForm/DestinationFrom';
import Profile from './components/Profile/Profile';
import DestinationPage from './components/DestinationPage/DestinationPage'
import GenerateQr from './components/QR/GenerateQr';
import Scan from './components/QR/Scan';





function App() {
    console.log("Estoy dandolo todo")
    const isAuthenticated = localStorage.getItem("token") !== "null";
    console.log(isAuthenticated);
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("token")!=="null");



    
    return (

        isAuthenticated ? (
        <HashRouter>
            <div className="App">

            <div className="App__content">
                <TopNav />
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route exact path="/profile" element={<Profile />} />
                        <Route exact path="/trips" element={<TripsPage />} />
                        <Route exact path="/friends" element={<FriendsPage />} />
                        <Route exact path="/map" element={<MapPage />} />
                        <Route exact path="/search" element={<SearchPage />} />
                        <Route path="/trip/:tripId" element={<TripPage />} />
                        <Route path="/trip/:tripId/destination" element={<DestinationForm />} />
                        <Route path="/destination/:destinationId" element={<DestinationPage />} />
                        <Route path='/generate_qr'element={<GenerateQr />}/>
                        <Route path='/scan' element={<Scan />} />



                    </Routes>
            </div>
        </div>

            <BottomBar />
        </HashRouter>
        
    ):
    (
        <HashRouter>

        <Routes>
            <Route exact path="/" element={<SignIn/>} />
        </Routes>
        </HashRouter>


    )


    );
}


export default App;
