import { useState } from "react";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';

const MsgSend = (props) => {

  const [message, setMessage] = useState('');

  if (!props.username) {
    return <></>;
  }

  const onMessageSend = () => {
    if (!message) {
      alert('Please type a message!');
    }

    props.onMessageSend({ 'text': message, });
    setMessage('');
  }

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <Grid container style={{ padding: '20px' }}>
      <Grid item xs={11}>
        <form onSubmit={onSubmit}>
          <TextField id="outlined-basic-email" label="Type Something" fullWidth onChange={(event) => setMessage(event.target.value)} value={message} />

        </form>
      </Grid>
      <Grid xs={1} align="right">
        <Fab color="primary" aria-label="add" onClick={onMessageSend}><SendIcon /></Fab>
      </Grid>
    </Grid>

  );
}

export default MsgSend;