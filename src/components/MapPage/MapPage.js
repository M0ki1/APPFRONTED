// MapPage

import React, { Component,useState,useEffect } from 'react';
import {compose, withProps } from "recompose"
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Box, Button, Container, CssBaseline, Paper, Stack, styled} from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid2 from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import SpinnerOfDoom from "../HomePage/SpinnerOfDoom";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";



const api_key = process.env.REACT_APP_GAPI_KEY







function MapPage(props) {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
              console.log(position.coords.latitude);
              console.log(position.coords.longitude);
          },
          (error) => {
              console.log(error);
          }
      );
  }, []);

    const ResetLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        },
        (error) => {
            console.log(error);
        }
    );
    }

    const SearchLocation = (event) => {
      event.preventDefault();
      const data = document.getElementById("outlined-basic");
      console.log(data.value);
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.value}&key=${api_key}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLatitude(data.results[0].geometry.location.lat);
        setLongitude(data.results[0].geometry.location.lng);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      
    }

  const MyMapComponent = compose(
    withProps({
      googleMapURL:
        `https://maps.googleapis.com/maps/api/js?key=${api_key}`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `80vh` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
  )(props => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: latitude, lng: longitude}}>
      {props.isMarkerShown && (
        <Marker position={{ lat: latitude, lng: longitude }} />
      )}
    </GoogleMap>
  ));
    
    // const [isLoading,setIsLoading] = useState(true);
    // if (isLoading) return(
    //     <SpinnerOfDoom/>
    // )
    return (
        
        <Container direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            sx={{ mx: 2, mt: '90px' }}
            >
            {/* <div style={{ height: '100vh', width: '100%' }} > */}
                <TextField id="outlined-basic" label="Search" variant="outlined" />
                <Button variant="contained" color="primary" onClick={SearchLocation}>
                    Search
                </Button>
                
                {/* <Button variant="contained" color="primary" onClick={ResetLocation}>
                    Back to Trips
                </Button> */}
                <MyMapComponent isMarkerShown/>
            {/* </div> */}
        </Container>
    );
}

export default MapPage;