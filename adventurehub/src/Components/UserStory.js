import React, {useState,useEffect} from 'react';
import { Container } from '@mui/system';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { deleteStory, getUserStories } from '../Services/storyService';

export default function UserStory() {  
    const paperStyle ={padding:'50px 20px', width:600,margin:"20px auto"}
    const[stories,setStories]=useState([])
    const cookie =JSON.parse(sessionStorage.getItem('user'));

 
useEffect(()=>{
 //TODO adding user specific function
 
  getUserStories(cookie.userid)
  .then(res => {
    console.log(res);
    setStories(res.data);
  })

},[])

 function handleDeleteClick(id){
  if(window.confirm("Are you sure you want to delete this story?")){
  deleteStory(id)
  .then(r =>{
    alert("Story was deleted");    
  })
  .catch(alert("We got some problems"));
  }
 }


  return (
    <Container>
     
    <h1>Your stories</h1>
    <Paper elevation={3} style={paperStyle}>

    {stories.map(story=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={story.storyid}>
     
         Title:{story.title}<br/>
        <Button  variant="contained" color="secondary" onClick={()=>handleDeleteClick(story.storyid)}>Delete</Button>
        </Paper>
      ))
}


    </Paper>

    </Container>
  );
}
