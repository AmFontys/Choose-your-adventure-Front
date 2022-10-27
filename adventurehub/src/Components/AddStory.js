import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from "@mui/system";
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import { postStory } from '../Services/storyService';

export default function AddStory() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }  
  const [errors,setErrors]=React.useState([])

  const person = JSON.parse( sessionStorage.getItem('user'));

  function handleValidation(formData) {
    let formIsValid = true;
    let errors = {};

    //Name
    if(!formData.get('title').match(/^[a-zA-Z_\s]{5,}$/)){
      formIsValid = false;
      errors["title"]="You have invalid charters in your title or your title is too short.";
    }

    setErrors(errors);
    return formIsValid;
  }


  const handleClick = (e) => {
    e.preventDefault();
    const fdata = new FormData(e.currentTarget);
    const story = fdata.get('title');

    
    //{ userid:person.userid,username:person.username,email:person.email,password:person.password,keyword:person.keyword,ismod:false
  
    if(handleValidation(fdata))
        {
          let json = {title: story, user: person
          };
          postStory(json)
          .then(res =>{
            if(res.data==="New Story added"){
              alert("Story was added");
              }
              else if(res.data==="Max reached")
              {
                alert("You have reached the max amount")
              }
              else {alert("Something went wrong please try again later")}
          })
          .catch(err =>{alert("Something went wrong please try again later")})
        }
        else {alert("form has errors!");}

    
    // fetch("http://localhost:8080/api/story/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(story)
    // }).then(() => {
    //   console.log("New Story added")
    // })
  }
  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1>Adding a Story</h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleClick}
        >
          <TextField id="standard-basic" label="Story title" variant="standard" fullWidth
             name="title" type="text" required />
             <span className="error">{errors["title"]}</span>
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
