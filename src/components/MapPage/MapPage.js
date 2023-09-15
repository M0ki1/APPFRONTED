// MapPage

import React, { Component,useState,useEffect } from 'react';
import {compose, withProps } from "recompose"
import {Box, Container, CssBaseline, Paper, Stack, styled} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SpinnerOfDoom from "../HomePage/SpinnerOfDoom";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";



const api_key = process.env.REACT_APP_GAPI_KEY




const MyMapComponent = compose(
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${api_key}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.isMarkerShown && (
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    )}
  </GoogleMap>
));

function MapPage(props) {
   
    return (
        <Container direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            sx={{ mx: 2, mt: '90px' }}
            >
                <MyMapComponent isMarkerShown/>
        </Container>
    );
}

export default MapPage;