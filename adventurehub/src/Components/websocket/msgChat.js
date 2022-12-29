
import { makeStyles } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@mui/material/Fab';
import { width } from '@mui/system';




const headBG = {
    backgroundColor: '#e0e0e0'
};
const borderRight500 = {
    borderRight: '1px solid #e0e0e0'
};
const messageArea = {
    height: '70vh',
    overflowY: 'auto',
    width: '100%'
}



const MessageReceived = (props) => {
    let date = Date.now();

    console.log(props)
    let leftOrRight = (props.from !== props.username ? "left" : "right")

    return (
        <ListItem key={props.text + date}>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText align={leftOrRight} primary={props.text}> {props.direct ? <b>(direct)</b> : ''}</ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align={leftOrRight} secondary={props.from}></ListItemText>
                </Grid>
            </Grid>
        </ListItem>

    );
};


const MsgChat = (props) => {


    return (

        <Grid item xs={20}>
            <List style={messageArea}>
                {props.messagesReceived

                    .map(message => <MessageReceived key={message.id} from={message.from} direct={message.to === props.username} text={message.text} username={props.username} />)}
            </List>

        </Grid>
    );
};

export default MsgChat