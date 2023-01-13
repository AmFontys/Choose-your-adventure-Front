import * as React from 'react';
import { Container } from '@mui/system';
import Story from '../Components/story/story';

export default function Index() {

  return (
    <Container>

      <h1>Index Stories</h1>
      <Story loadStories={"all"}/>

    </Container>
  );
}
