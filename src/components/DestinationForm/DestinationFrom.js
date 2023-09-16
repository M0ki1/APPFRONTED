import React from 'react'
import TextField from "@mui/material/TextField";
import {Box, Button, Container, CssBaseline, Paper, Stack, styled} from "@mui/material";
import MapPage from "../MapPage/MapPage";






function DestinationForm() {


    return(
        <Container direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{ mx: 2, mt: '90px' }}
        >
            <TextField id="name" label="Name" variant="outlined" />
            <TextField id="country" label="Country" variant="outlined" />
            <TextField id="city" label="City" variant="outlined" />
            <MapPage></MapPage>

        </Container>

    )
}

export default DestinationForm;
