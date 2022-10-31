import * as React from 'react';
import { Container } from '@mui/system';
import { getUsers } from '../Services/userService';

export default function Users() {  
  const [data,setData] = React.useState()

  React.useEffect(()=>{
   getUsers()
   .then(res => {setData(res.data);})
  },[])
 
  return (
    <Container>

    <h1>Users</h1>
    </Container>
  );
}
