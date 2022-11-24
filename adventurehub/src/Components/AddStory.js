import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from "@mui/system";
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { postStory, getUserStories } from '../Services/storyService';
import { getStoryBodyType, postStoryBody } from '../Services/storyBodyService';

export default function AddStory() {

  const [stories,setStories]=useState([]);
  const [story,setStory]=useState('');
  const [types,setTypes]=useState([]);
  const [type,setType]=useState('');

  const paperStyle = { padding: '50px 20px', width: 300, margin: "20px auto" }  
  const [errors,setErrors]=React.useState([])

  var person =JSON.parse( sessionStorage.getItem('user'));


  useEffect(()=>{
    getUserStories(25)
    .then(res=>{
      console.log(res);
      setStories(res.data);
    })
    

    getStoryBodyType()
    .then(res=>{
      setTypes(res.data);
    })
    .catch(r =>{console.log(r)})
  
  },[])

  function handleValidation(formData) {
    let formIsValid = true;
    let errors = {};
    //Name
    if(formData.get('title')!=null){
      console.log(formData.get('title'));
    if(!formData.get('title').match(/^[a-zA-Z_\s]{5,}$/)){
      formIsValid = false;
      errors["title"]="You have invalid charters in your title or your title is too short.";
    }
  }

if(formData.get('textbody')!=null){
    //Text
    if(!formData.get('textbody').match(/^[^\-0-9; ]{1,}[a-zA-Z-_ \',.\r\n0-9.;]*$/)){
      formIsValid = false;
      errors["textbody"]="You have invalid charters in your body.";
    }
  }

  if(formData.get('bodytitle')!=null){
    //body title
    if(!formData.get('bodytitle').match(/^[a-zA-Z_\s ]{5,}$/)){
      formIsValid = false;
      errors["bodytitle"]="You have invalid charters in your body title or your title is too short.";
    }}
    console.log(errors);
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
  }

  const handleStorybodyClick = (e) =>{
  e.preventDefault();
const fdata = new FormData(e.currentTarget);
    const title = fdata.get('bodytitle');
    const btext = fdata.get('textbody');

    if(handleValidation(fdata)){
      let data = {type:{typename: type}, bodyTitle:title, text:btext }
      postStoryBody(data)
      .then(res =>{
        if(res.data==="New Storybody added"){
          alert("Storybody was added");
          }          
          else {alert("Something went wrong please try again later")}
      })
      .catch(err =>{alert("Something went wrong please try again later")})
    }
    else {alert("form has errors!");

  }
}

  const handleStoryChange = (event) => {
    setStory(event.target.value);
  };


  const handleTypeChange = (event) =>{
    setType(event.target.value);
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
          <TextField id="standard-basic" label="Story title" variant="standard"
             name="title" type="text" required />
             <span className="error">{errors["title"]}</span>
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </Box>
      </Paper>


      {/* StoryBody component */}
      <div>
      <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleStorybodyClick}
        >
          <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Story selected</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="storytitle"
          value={story}
          onChange={handleStoryChange}
          autoWidth
          label="story"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {stories.map(story =>(
            <MenuItem value={story.title} key={story.storyid}>{story.title}</MenuItem>
          ))}
         
        </Select></FormControl>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Story type selected</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="storybodytype"
          value={type}
          onChange={handleTypeChange}
          autoWidth
          label="type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {types.map(type =>(
            <MenuItem value={type.typename} key={type.typename
            }>{type.typename}</MenuItem>
          ))}
         
        </Select>
      </FormControl><br />
      <p style={{ alignItems:'center', justifyContent:'center', paddingLeft:'35%'}}
      ><b><i>The title of this story body will be used as the title for the options </i></b></p>
      <TextField id="standard-basic" label="Story title" variant="standard"
             name="bodytitle" type="text" required />
             <span className="error">{errors["bodytitle"]}</span>
          <br />
          <p style={{ alignItems:'center', justifyContent:'center', paddingLeft:'35%'}}>Type below your story content</p>
          <textarea id="standard-basic" label="Story body" variant="standard"
             name="textbody" type="text" required /><br />
             <span className="error">{errors["textbody"]}</span>
             <br />
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </Box>
      
    </div>
    </Container>
  );
}

