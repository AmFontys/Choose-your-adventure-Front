import * as React from 'react';
import { Container } from '@mui/system';
import { useLocation, Link } from "react-router-dom";
import { getStoryBody, postIncrementOption } from '../Services/storyBodyService';
import ReportBox from '../Components/ReportBox';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ReadStory() {
  const { state } = useLocation();
  const [bodies, setBodies] = React.useState([]);

  React.useEffect(() => {
    let storyid = getStorylocation();
    getStoryBody(JSON.parse(storyid))
      .then(res => {
        console.log(res.data);
        setBodies(res.data);
      })
      .catch(r => { console.log(r) })
  }, []
  )

  function getStorylocation() {
    // (A) FILE NAME ONLY
    var fileonly = window.location.pathname;
    // fileonly = fileonly.substring(fileonly.lastIndexOf("/")+1);
    fileonly = fileonly.replace(/^.*[\\\/]/, "");
    console.log(fileonly);
    return fileonly;
  }

  function handleOption(bodyToShow) {
    console.log(bodyToShow);

    if (document.getElementById(bodyToShow.bodyTitle).style.display === "none") {
      incrementChosen(bodyToShow);
    }

    document.getElementById(bodyToShow.bodyTitle).style.display = "flex";

  }


  function incrementChosen(chosenBody) {
    postIncrementOption(chosenBody.id)
  }

  console.log(state.stories)
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="stretch"
    >
      <Grid item>
        <Item>
          <Link to="/">
            <button>Back</button>
          </Link>
        </Item>
        <Item>
          <ReportBox story={state} /></Item>
      </Grid>

      <Grid item>
        <Item>
          <h1>Read {state.stories.title}</h1>
        </Item>
      </Grid>





      {bodies.map(body => {
        let number = body.type.typename.replace(/^[a-zA-Z]*_/, "");

        if (body.type.typename === "Intial") {
          return (
            <Grid item>
              <Item>
                <>
                  <h1 key={body.id}>{body.bodyTitle}</h1><div>
                    <p>
                      {body.text}
                    </p>
                    <div key={1} onClick={() => handleOption(bodies.at(1))}>{bodies.at(1).bodyTitle} ({bodies.at(1).chosen === null ? 1 : bodies.at(1).chosen})</div>
                    <div key={2} onClick={() => handleOption(bodies.at(2))}>{bodies.at(2).bodyTitle} ({bodies.at(2).chosen === null ? 1 : bodies.at(1).chosen})</div>
                  </div>
                </>
              </Item>
            </Grid>
          )
        }
        else if (number.length < 2) {
          return (

            <Grid container style={{ display: "none" }} id={body.bodyTitle} direction="column"
              justifyContent="space-evenly"
              alignItems="stretch">
              <Grid item  >
                <Item>
                  <h1 key={body.id}>{body.bodyTitle}</h1>
                </Item></Grid>
              <Grid item>
                <Item>
                  <p>
                    {body.text}
                  </p>
                  <p onClick={() => handleOption(bodies.find(e => e.type.typename === "Option_" + number + "A"))}>
                    {bodies.find(e => e.type.typename === "Option_" + number + "A").bodyTitle}
                    ({bodies.find(e => e.type.typename === "Option_" + number + "A").chosen === null ? 1 : bodies.find(e => e.type.typename === "Option_" + number + "A").chosen})
                  </p>
                  <p onClick={() => handleOption(bodies.find(e => e.type.typename === "Option_" + number + "B"))}>
                    {bodies.find(e => e.type.typename === "Option_" + number + "B").bodyTitle}
                    ({bodies.find(e => e.type.typename === "Option_" + number + "B").chosen === null ? 1 : bodies.find(e => e.type.typename === "Option_" + number + "B").chosen})
                  </p></Item>
              </Grid>
            </Grid>
          )
        }
        else {
          return (
            <Grid container style={{ display: "none" }} id={body.bodyTitle} direction="column"
              justifyContent="space-evenly"
              alignItems="stretch">
              <Grid item  >
                <Item>

                  <h1 key={body.id}>{body.bodyTitle}</h1>
                </Item>
              </Grid>
              <Grid item>
                <Item>
                  <p key={body.id}>
                    {body.text}
                  </p></Item>
              </Grid>
            </Grid>
          )
        }
      })}

    </Grid>



  );
}
