import {useState,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Box, Typography, CircularProgress, Paper, styled, Button } from '@mui/material';
import Container from '@mui/material/Container'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { compose, withProps } from 'recompose';




const GET_TRIP_DETAILS = gql`
  query GetTripDetails($tripId: ID!) {
    trip(id: $tripId) {
      id
      name
      description
      startDate
      endDate
      destinations {
        id
        name
        latitude
        longitude
        country
        city
      }
    }
  }
`;

const ImageContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

const Image = styled('img')({
  maxWidth: '100%',
  maxHeight: '400px',
  objectFit: 'contain',
});

const api_key = process.env.REACT_APP_GAPI_KEY;




function TripPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
 

  const { loading, error, data } = useQuery(GET_TRIP_DETAILS, {
    variables: { tripId },
  });


  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [markers, setMarkers] = useState([]); // State variable for markers


  useEffect(()=>{
    if(data && data.trip && data.trip.destinations){
      setMarkers(data.trip.destinations);
      setLongitude(data.trip.destinations[0].longitude)
      setLatitude(data.trip.destinations[0].latitude)
    }
  },[data])
  

  if (loading) {
    // Muestra un spinner mientras se cargan los datos
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography variant="h6">Error: {error.message}</Typography>;
  }
  
 


  //MAPA
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
          <Marker key={index} onClick={()=> navigate(`/destination/${marker.id}`)} position={{ lat: marker.latitude, lng: marker.longitude }} />
        ))}
    </GoogleMap>
  ));
  const trip = data.trip;
 


  //

  return (
    <Container 
    direction="column"
    justifyContent="flex-start"
    alignItems="center"
    spacing={2}
    sx={{ mx: 2, mt: '90px' }}
    >
      <Typography variant="h4">{trip.name}</Typography>
      <Typography variant="subtitle1">{trip.description}</Typography>
      <Typography variant="body1">
        Start Date: {new Date(trip.startDate).toLocaleDateString()}
      </Typography>
      <Typography variant="body1">
        End Date: {new Date(trip.endDate).toLocaleDateString()}
      </Typography>
      <Button variant="contained" color="primary" onClick={()=>navigate(`/trip/${trip.id}/destination`)}>
        Add Destination
      </Button>
      <MyMapComponent isMarkerShown />





     
    </Container>
  );
}

export default TripPage;