//Create starter component
import {useEffect} from 'react';
import { Box ,Button,Container} from "@mui/material";
import { useNavigate } from 'react-router-dom';

import SpinnerOfDoom from "../HomePage/SpinnerOfDoom";

function FriendsPage(props) {
    const navigate = useNavigate();

    return (


        <Container 
    direction="column"
    justifyContent="flex-start"
    alignItems="center"
    spacing={2}
    sx={{ mx: 2, mt: '90px' }}
    >
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh" // Set to full height
    >
      <Button
        variant="contained"
        color="primary"
        onClick={()=>navigate('/generate_qr')}
        fullWidth
        sx={{ marginBottom: '16px' }} // Add some space between the buttons
      >
        Generate Code
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={()=>navigate('/scan')}
        fullWidth
      >
        Scan Code
      </Button>
    </Box>
    </Container>
    );
}

export default FriendsPage;