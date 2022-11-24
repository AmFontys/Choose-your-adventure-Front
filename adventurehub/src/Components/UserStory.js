import React, {useState,useEffect} from 'react';
import { Container } from '@mui/system';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

export default function UserStory() {  
    const paperStyle ={padding:'50px 20px', width:600,margin:"20px auto"}
    const[stories,setStories]=useState([])
    const cookie =sessionStorage.getItem('user');

 
useEffect(()=>{
 //TODO adding user specific function
 
  fetch(`http://localhost:8080/api/story/User/${cookie.userId}`)
 .then(res=>res.json())
 .then((result)=>{
   setStories(result);
 }
)
},[])
  return (
    <Container>
     
    <h1>Your stories</h1>
    <Paper elevation={3} style={paperStyle}>

      {stories.map(story=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={story.id}>
     
         Title:{story.title}<br/>
 <Button variant="contained" color="secondary">
  <Link to={`/${story.id}`}>Go to</Link>
</Button>
        </Paper>
      ))
}


    </Paper>

    </Container>
  );
}
