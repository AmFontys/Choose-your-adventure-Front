import React, {useState,useEffect} from 'react';
import { Container } from '@mui/system';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function Story() {  
    const paperStyle ={padding:'50px 20px', width:600,margin:"20px auto"}
    const[title,setTitle]=useState('')
    const[stories,setStories]=useState([])

 /*const handleClick=(e)=>{
   e.preventDefault()
   const story={title}
   console.log(story)
   fetch("http://localhost:8080/api/story/add",{
     method:"POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify(story)

 }).then(()=>{
   console.log("New Story added")
 })
}
*/
useEffect(()=>{
 fetch("http://localhost:8080/api/story/")
 .then(res=>res.json())
 .then((result)=>{
   setStories(result);
 }
)
},[])
  return (
    <Container>
     
    <h1>Stories</h1>
    <Paper elevation={3} style={paperStyle}>

      {stories.map(story=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={story.id}>
     
         Title:{story.title}<br/>
 <Button variant="contained" color="secondary">
  Go to
</Button>
        </Paper>
      ))
}


    </Paper>

    </Container>
  );
}
