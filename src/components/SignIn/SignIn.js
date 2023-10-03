import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useNavigate} from "react-router-dom";
import { makeStyles } from "@mui/styles";
import backgroundImage from "./background.png";
import { BACK_URL } from "../../constants";
let base64 = require('base-64');

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    minHeight: "100vh", // Ensure the container covers the entire viewport height
  },
}));

function SignIn() {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
        email: data.get("email"),
        password: data.get("password"),
    };
    fetch(BACK_URL+"/api/v1/api-keys", {
            method: "post",
            headers: new Headers({
                "Authorization": `Basic ${base64.encode(`${payload.email}:${payload.password}`)}`
            }),
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorText => {
                    throw new Error(`Request failed with status ${response.status}: ${errorText}`);
                });
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("token",data.token);
            navigate('/trips');
            window.location.reload();
            //here
            

        })
        .catch(error => {
            alert(error)
            console.log(error)
        });
}
  
  return (
    <Container component="main" maxWidth="6000px" className={classes.container} sx={{
      paddingTop: 15,
      paddingBottom: 15,
    }}>
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h6" sx={{fontSize:50, border:1, borderRadius:2, paddingLeft: 2, paddingRight: 2}}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#2D9BF0", color: "white" }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2"
              sx={{color: "white",  border: 1, borderRadius: 1, p: 1, backgroundColor:"#2D9BF0"}}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" sx={{color: "white",  border: 1, borderRadius: 1, p: 1, backgroundColor:"#2D9BF0"}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;