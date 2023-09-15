import React from "react";
import './TripCard.css';
import { Link } from "react-router-dom";
import {Button, Chip, Container} from "@mui/material";
import placeholder from "./placeholder.png";
import tripImage from "./tripImage.webp";
import TripPage from "../../TripPage";
import ImageList from '@mui/material/ImageList';
import { useNavigate,Route } from "react-router-dom";
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';



function TripCard({trip}) {
    const navigate = useNavigate(); 
    const myImageStyle = { width: '75%',objectFit: 'contain' };
    let chipColor;
    let chipText;
    let today = new Date();
    let start = new Date(trip.startDate);
    let end = new Date(trip.endDate);

    if (end > today && end < today) {
        chipColor = "info";
        chipText = "Ongoing";
    }
    else if (end > today) {
        chipColor = "warning";
        chipText = "Upcoming";
    }
    else {
        chipColor = "error";
        chipText = "Ended";
    }

  return (

    <Container sx = {{ pt:2}} >
        <ImageListItem key={tripImage}>
          <img
            src={tripImage}
            alt={"placeholder"}
            loading="lazy"
          />
          <ImageListItemBar
            title={trip?.name}
            subtitle={trip?.description}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${trip?.name}`}
                onClick={()=> navigate('/trip')}
              >
                <InfoIcon />
              </IconButton>
            }
          />
          <Button variant="contained" style = {{float: 'right',marginTop:12}} onClick= {()=>navigate(`/trip/${trip.id}`)} >View More</Button>


        </ImageListItem>

    </Container>
  );
}
export default TripCard;
