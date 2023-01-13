import * as React from 'react';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select, Box,TextField,Button,Paper } from '@mui/material';
import { searchStoryByName, searchStoryByUser } from '../Services/storyService';

export default function SearchStory() {
  const [stories, setStories] = React.useState([])
  const [searchOn,setSearchOn] = React.useState('');
  const [errors,setErrors]= React.useState([])

  const handleSelectChange = (event)=>{
    setSearchOn(event.target.value);
  }

  const checkInput = (input)=>{
    if(input===""||input.length<=2)return false;
    else return true;
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let errorHold={};

    const formData = new FormData(e.currentTarget);
    const text = formData.get("searchText");
    const searchOn = formData.get("searchOn");

    var check= checkInput(text)

    if(searchOn==="Title" && check){
searchStoryByName(text).then(res =>{
  loadSearchResult(res.data)});
    }
    else if(searchOn==="user"){
searchStoryByUser(text).then(res =>{loadSearchResult(res.data)});
    }
    else if(!check) errorHold["searchtext"]="You have inputted in the search box not enough charters";
    else errorHold["searchtext"]="You have not selected a option you want to search on please select one of them";

    setErrors(errorHold);
  }

  const loadSearchResult = (data) => {
let errorHold = {};
if(data !== null && data !== undefined && data !==""){ setStories(data);}
else errorHold["result"] = "There is no result please type something else or change what you search on.";
setErrors(errorHold);
  }
 

  return (
    <Container>

      <h1>Search Stories</h1>
      <br/>{errors["searchtext"]}<br/>
      <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSearchSubmit}
          >
             <TextField
          required
          id="outlined-required"
          label="Search..."
          name='searchText'
          type="text"
        />
      <FormControl>
        <InputLabel id='search-on-select-label'>Search on *</InputLabel>
      <Select
        labelId='search-on-select-label'
        value={searchOn}
        label="Search on*"
        onChange={handleSelectChange}
        name="searchOn"
        required
        >
          <MenuItem value={"Title"}>On title</MenuItem>
          <MenuItem value={"user"}>On username</MenuItem>
        </Select>
        </FormControl>
        <Button variant="contained" color="secondary" type="submit">
              Submit
            </Button>
        </Box>
        <Container>
        

{stories.map(story => (
  <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={story.storyid}>

    Title:{story.title}<br />
    <Link to={{
      pathname: `/ReadStory/${story.storyid}`
    }}
      state={{ stories: story }}
      key={story.storyid}>
      <Button variant="contained" color="secondary">
        Go to</Button>
    </Link>
  </Paper>
))
}
<h3>{errors["result"]}</h3>


        </Container>
    </Container>
  );
}
