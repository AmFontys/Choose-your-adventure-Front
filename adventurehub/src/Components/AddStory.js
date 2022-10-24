import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from "@mui/system";
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';

export default function AddStory() {  
    const paperStyle ={padding:'50px 20px', width:600,margin:"20px auto"}
    const[title,setTitle]=useState('')
    
const handleClick=(e)=>{
    e.preventDefault()
    const story={title}
    console.log(story)
    fetch("http://localhost:8080/api/story/",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(story)
 
  }).then(()=>{
    console.log("New Story added")
  })
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
>    
 <TextField id="standard-basic" label="Story title" variant="standard" fullWidth  value={title}
 onChange={(e)=>setTitle(e.target.value)}/>
 <Button variant="contained" color="secondary" onClick={handleClick}>
Submit
</Button>
</Box>
</Paper>
</Container>
);
}
