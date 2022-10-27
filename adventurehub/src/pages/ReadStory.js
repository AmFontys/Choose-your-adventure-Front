import * as React from 'react';
import { Container } from '@mui/system';
import { useLocation, Link } from "react-router-dom";


export default function ReadStory() {  
  const { state } = useLocation();
console.log(state.stories)
  return (
    <Container>
<Link to="/">
        <button>Back</button>
      </Link>
    <h1>Read {state.stories.title}</h1>

    </Container>
  );
}
