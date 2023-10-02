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
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    
    return(

    <React.Fragment>
        <h1>Profile</h1>
        <h2>First Name: {data?.user?.firstName}</h2>
        <h2>Email: {data?.user?.email}</h2>
        <h2>Your id: {data?.user?.id}</h2>
        <ProfilePic userId={userId} />
        
    </React.Fragment>

    )
}


export default Profile;