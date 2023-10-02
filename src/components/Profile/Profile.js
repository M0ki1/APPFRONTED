import React from "react";
import ProfilePic from "./ProfilePic";
import { Link } from "react-router-dom";
import {Button, Chip, Container} from "@mui/material";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useNavigate,Route } from "react-router-dom";
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Typography, CircularProgress, Paper, styled } from '@mui/material';

let email = "admin@admin.com"

const GET_DATA = gql`
    query {
      user(email: "${email}") {
        id
        firstName
        lastName
        email
      }
    }
  `;
  




const Profile = (props, {email}) => {
    const {loading, error, data} = useQuery(GET_DATA);
    
    const userId = data?.user?.id;
    console.log(userId);
    
    if (loading) {
      // Muestra un spinner mientras se cargan los datos
          return (
              <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
              <CircularProgress />
              </Box>
          );
          }
  
      if (error) {
          return (
            <Container 
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            sx={{ mx: 2, mt: '90px' }}
            >
              <Typography variant="h6">Error: {error.message}</Typography>
          </Container>)
          }
    console.log(data.user.avatar)
    return(

      <Container 
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      sx={{ mx: 2, mt: '90px' }}
      >
        <h1>Profile</h1>
        <h2>First Name: {data?.user?.firstName}</h2>
        <h2>Email: {data?.user?.email}</h2>
        <h2>Your id: {data?.user?.id}</h2>
        
        <ProfilePic userId={userId} />
        
      </Container>

    )
}


export default Profile;