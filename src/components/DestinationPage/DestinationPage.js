import {useState,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Box, Typography, CircularProgress, Paper, styled, Button } from '@mui/material';
import Container from '@mui/material/Container'



const GET_DESTINATION_DETAILS = gql`
  query GetTripDetails($destinationId: ID!) {
    destination(id: $destinationId) {
        id
        name
        latitude
        longitude
        country
        city
        # created_at
      
    }
  }
`;




const DestinationPage = ()=>{

    const {destinationId} = useParams() ;
    console.log(destinationId)
    const { loading, error, data } = useQuery(GET_DESTINATION_DETAILS, {
        variables: { destinationId },
      });
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
    const destination = data.destination;


    
     
    


    return(
        <Container 
    direction="column"
    justifyContent="flex-start"
    alignItems="center"
    spacing={2}
    sx={{ mx: 2, mt: '90px' }}
    >
      <Typography variant="h4">{destination.name}</Typography>
      <Typography variant="subtitle1"><strong>Country:</strong> {destination.country}</Typography>
      <Typography variant="subtitle1"><strong>City:</strong> {destination.city}</Typography>
      <Typography variant="body1"><strong>Latitude:</strong> {destination.latitude}</Typography>
      <Typography variant="body1"><strong>Longitude:</strong> {destination.longitude}</Typography>
      
     


    </Container>

    )
}

export default DestinationPage