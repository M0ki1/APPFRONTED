import React, { useState, useEffect } from 'react';
import SpinnerOfDoom from '../HomePage/SpinnerOfDoom';
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
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from 'react-google-maps';
import { BACK_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';




const api_key = process.env.REACT_APP_GAPI_KEY;


//The search bar


const SearchBar = ({ onSearch, onSearchCurrentLocation }) => {
    const [address, setAddress] = useState('');
    const [country,setCountry] = useState('');
    const [city,setCity] = useState('');
    

  
    const handleAddressChange = (event) => {
      setAddress(event.target.value);
    };
    const handleCountryChange = (event) => {
      setCountry(event.target.value);
    };
    const handleCityChange = (event) => {
      setCity(event.target.value);
    };
  
  
    const handleSearchClick = () => {
      let search = address + ' ' + country + ' ' + city
      onSearch(search,country,city);
    };
  
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Country"
            variant="outlined"
            fullWidth
            value={country}
            onChange={handleCountryChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            fullWidth
            value={city}
            onChange={handleCityChange}
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



const DestinationForm = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [markers, setMarkers] = useState([]); // State variable for markers
  const [placeName,setPlaceName] = useState('');
  const navigate = useNavigate();


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
        {props.isMarkerShown &&
          markers.map((marker, index) => (
            <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
      </GoogleMap>
    ));


    const [country,setCountry] = useState('');
    const [city,setCity] = useState('');
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

    const onSearch = (location,country,city) => {
      setCountry(country)
      setCity(city)
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${api_key}`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          console.log(data.results[0].formatted_address);
          

          setLatitude(data.results[0].geometry.location.lat);
          setLongitude(data.results[0].geometry.location.lng);
          setPlaceName(data.results[0].formatted_address)
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

    const addMarker = () => {
      setMarkers((markers) => [
        ...markers,
        { lat: latitude, lng: longitude },
      ]);
      console.log('VOY A DECIR EL PLACENAME');
      // console.log();
      let trip_id = window.location.href.split('/')[5]
      console.log(trip_id)
      let data = { lat: latitude, lng: longitude ,city:city,country:country,name:placeName,trip_id:trip_id};
      const jsonData = JSON.stringify(data);
      console.log('Aca casi llego')
      let AUTH = localStorage.getItem("token" || "null") ;
      console.log(AUTH)
      fetch(BACK_URL+'/api/v1/new_destination',{
          method:'POST',
          headers: new Headers({
            Authorization: `Bearer ${AUTH}`,

        }),
          body:jsonData
      })
      .then(res=>res.json())
      .then(data => {
        alert('AGREGADO');
        navigate(-1)
        
          //
      })
      .catch(error => {
          console.log('uwu?')
          console.log('Error',error);
      })
      console.log('aca no llegue');
    };
    



    return(
        <Container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            sx={{ mx: 2, mt: '90px' }}
        >
            <SearchBar
                onSearch={onSearch}
                onSearchCurrentLocation={onSearchCurrentLocation}
            />
            <Grid item xs={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addMarker}
                    fullWidth
                >
                Add Location
                </Button>
            </Grid>

            <MyMapComponent isMarkerShown />

        </Container>
    )
}

export default DestinationForm