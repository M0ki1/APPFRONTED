import React from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Box, Typography, CircularProgress, Paper, styled, Button } from '@mui/material';
import Container from '@mui/material/Container'

const GET_TRIP_DETAILS = gql`
  query GetTripDetails($tripId: ID!) {
    trip(id: $tripId) {
      id
      name
      description
      startDate
      endDate
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

function TripPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_TRIP_DETAILS, {
    variables: { tripId },
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

  const trip = data.trip;
  console.log(trip)
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

      {/* <ImageContainer>
        {trip.images.map((image, index) => (
          <Image
            key={index}
            src={image.url}
            alt={`Image ${index + 1}`}
          />
        ))}
      </ImageContainer> */}
    </Container>
  );
}

export default TripPage;