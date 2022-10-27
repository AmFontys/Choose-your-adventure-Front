import React, {useState,useEffect} from 'react';
import { Container } from '@mui/system';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import {getStories} from "../Services/storyService";

export default function Story() {  
    const paperStyle ={padding:'50px 20px', width:600,margin:"20px auto"}
    const[stories,setStories]=useState([])


 
useEffect(()=>{
  getStories()
  .then(res=>{
    setStories(res.data);
  })

},[])
  return (
    <Container>
     
    <h1>Stories</h1>
    <Paper elevation={3} style={paperStyle}>

      {stories.map(story=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={story.storyid}>
     
         Title:{story.title}<br/>
         <Link to={{
          pathname: `/ReadStory/${story.storyid}`}}
          state={{ stories: story }}
          key={story.storyid}>
         <Button variant="contained" color="secondary">
  Go to</Button>
</Link>
        </Paper>
      ))
}


    </Paper>

    </Container>
  );
}
