import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postRegister } from '../Services/loginService';
import {useNavigate} from 'react-router-dom';

import background from '../img/witch_img_800.png';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="#">
          AdventureHub
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const theme = createTheme(); 

export default function Register() {  
const [errors,setErrors]=React.useState([])
const navigate = useNavigate();

function handleValidation(formData) {
    let formIsValid = true;
    let errors = {};

    //Name
    if(!formData.get('username').match(/^[a-zA-Z0-9]+$/)){
      formIsValid = false;
      errors["username"]="You have invalid charters in your username.";
    }
  

    //email
    if(typeof formData.get('email') !== "undefined"){
      let lastAtPos = formData.get('email').lastIndexOf('@');
      let lastDotPos = formData.get('email').lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && formData.get('email').indexOf('@@') === -1 && lastDotPos > 2 && (formData.get('email').length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    //Password
    //maybe some checks

    setErrors(errors);
    return formIsValid;
  }


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if(handleValidation(data))
        {
          let jsonData = {
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            keyword: "none"
           }
          postRegister(jsonData)
          .then(res =>{
            return res.status === 201 ? true : false;
        })
        .then(boolVal => {
          boolVal ?
          navigate('/Login')
        :
        alert("Something went wrong please try again later")
      });
    }      
        else{ alert("form has errors!"); }
      };

    return (
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                
                
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="username"
                    label="User name"
                    type="text"
                    id="username"
                  />
                  <span className="error">{errors["username"]}</span>
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
                  <span className="error">{errors["email"]}</span>
                  
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
                  <span className="error">{errors["password"]}</span>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Register
                  </Button>
                  <Grid container>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      );
    
}
