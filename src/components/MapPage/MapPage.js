import React, { useState, useEffect } from 'react';
import { compose, withProps } from 'recompose';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  Grid,
  styled,
  TextField,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SpinnerOfDoom from '../HomePage/SpinnerOfDoom';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const api_key = process.env.REACT_APP_GAPI_KEY;

const SearchBar = ({ onSearch, onSearchCurrentLocation }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(search);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchClick}
          fullWidth
        >
          Search
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={onSearchCurrentLocation}
          fullWidth
        >
          Current Location
        </Button>
      </Grid>
    </Grid>
  );
};

function MapPage(props) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const onSearch = (location) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${api_key}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLatitude(data.results[0].geometry.location.lat);
        setLongitude(data.results[0].geometry.location.lng);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const onSearchCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const MyMapComponent = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${api_key}`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `80vh` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: latitude, lng: longitude }}>
      {props.isMarkerShown && <Marker position={{ lat: latitude, lng: longitude }} />}
    </GoogleMap>
  ));

  return (
    <Container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      sx={{ mx: 2, mt: '90px' }}
    >
      <SearchBar onSearch={onSearch} onSearchCurrentLocation={onSearchCurrentLocation} />
      <MyMapComponent isMarkerShown />
    </Container>
  );
}

export default MapPage;
