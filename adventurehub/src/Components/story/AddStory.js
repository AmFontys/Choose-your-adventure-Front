import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from "@mui/system";
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import { postStory, getUserStories } from '../../Services/storyService';
import { getStoryBodyType, postStoryBody } from '../../Services/storyBodyService';


const steps = ['Create a story', 'Create the index', 'Create the option 1 first depth', 'create option 2 first depth', 'Option level 2 option 1A', 'Option level 2 option 1B', 'Option level 2 option 2A', 'Option level 2 option 2B'];

export default function AddStory() {

  const [stories, setStories] = useState([]);
  const [story, setStory] = useState('');
  const [types, setTypes] = useState([]);
  const [type, setType] = useState('');

  const paperStyle = { padding: '50px 20px', width: 700, margin: "20px auto" }
  const textareaStyle = { width: "90%", padding: '50px 20px', height: 200 }
  const [errors, setErrors] = React.useState([])

  var person = JSON.parse(sessionStorage.getItem('user'));

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [isAdded, setAdded] = React.useState(false);

  /////////
  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (isAdded) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      setAdded(false)
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  /////////

  useEffect(() => {



    getStoryBodyType()
      .then(res => {
        setTypes(res.data);
      })
      .catch(r => { console.log(r) })

  }, [])

  function handleValidation(formData) {
    let formIsValid = true;
    let errors = {};
    //Name
    if (formData.get('title') != null) {
      console.log(formData.get('title'));
      if (!formData.get('title').match(/^[a-zA-Z_\s]{5,}$/)) {
        formIsValid = false;
        errors["title"] = "You have invalid charters in your title or your title is too short.";
      }
    }

    if (formData.get('textbody') != null) {
      //Text
      if (!formData.get('textbody').match(/^[^\-0-9; ]{1,}[a-zA-Z-_ \',.\r\n0-9.;]*$/)) {
        formIsValid = false;
        errors["textbody"] = "You have invalid charters in your body.";
      }
    }

    if (formData.get('bodytitle') != null) {
      //body title
      if (!formData.get('bodytitle').match(/^[a-zA-Z_\s ]{5,}$/)) {
        formIsValid = false;
        errors["bodytitle"] = "You have invalid charters in your body title or your title is too short.";
      }
    }
    console.log(errors);
    setErrors(errors);
    return formIsValid;
  }


  const handleClick = (e) => {
    console.log(e);
    e.preventDefault();
    const fdata = new FormData(e.currentTarget);
    const story = fdata.get('title');


    if (handleValidation(fdata)) {
      let json = {
        title: story, user: person
      };
      postStory(json)
        .then(res => {
          if (res.data === "New Story added") {
            alert("Story was added");
            setAdded(true);

            getUserStories(person.userid)
              .then(res => {
                console.log(res);
                setStories(res.data);
              })

          }
          else if (res.data === "Max reached") {
            alert("You have reached the max amount")
          }
          else { alert("Something went wrong please try again later") }
        })
        .catch(err => { alert("Something went wrong please try again later") })
    }
    else { alert("form has errors!"); }
  }

  const handleStorybodyClick = (e) => {
    e.preventDefault();
    const fdata = new FormData(e.currentTarget);
    const title = fdata.get('bodytitle');
    const btext = fdata.get('textbody');

    if (handleValidation(fdata)) {
      let data = { story: { storyid: story }, type: { typename: type }, bodyTitle: title, text: btext }
      postStoryBody(data)
        .then(res => {
          if (res.data === "New Storybody added") {
            alert("Storybody was added");
            setAdded(true)
          }
          else { alert("Something went wrong please try again later") }
        })
        .catch(err => { alert("Something went wrong please try again later") })
    }
    else {
      alert("form has errors!");

    }
  }

  const handleStoryChange = (event) => {
    setStory(event.target.value);
  };


  const handleTypeChange = (event) => {
    setType(event.target.value);
  }

  // I need to make this into a stepper (https://mui.com/material-ui/react-stepper/)
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>


            {activeStep === 0 ? (
              /****************Adding a story title**********************/
              <Paper elevation={5} style={paperStyle}>
                <h1>Make a title for your story</h1>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleClick}
                >
                  <TextField id="standard-basic" label="Story title" variant="standard"
                    name="title" type="text" required />
                  <span className="error">{errors["title"]}</span>
                  <Button variant="contained" color="secondary" type="submit">
                    Submit
                  </Button>
                </Box>
              </Paper>
            ) : (
              /************Adding the contents of the story************/
              <Paper elevation={5} style={paperStyle} >
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleStorybodyClick}
                >
                  <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Story selected</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="storytitle"
                      value={story}
                      onChange={handleStoryChange}
                      autoWidth
                      label="story"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {stories.map(story => (
                        <MenuItem value={story.storyid} key={story.storyid}>{story.title}</MenuItem>
                      ))}

                    </Select></FormControl>
                  <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Story type selected</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="storybodytype"
                      value={type}
                      onChange={handleTypeChange}
                      autoWidth
                      label="type"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {types.map(type => (
                        <MenuItem value={type.typename} key={type.typename
                        }>{type.typename}</MenuItem>
                      ))}

                    </Select>
                  </FormControl><br />
                  <h4 style={paperStyle}>The title of this story body will be used as the title for the options </h4>
                  <p style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: '35%' }}
                  ></p>
                  <TextField id="standard-basic" label="Story title" variant="standard"
                    name="bodytitle" type="text" required />
                  <span className="error">{errors["bodytitle"]}</span>
                  <br />
                  <h4 style={paperStyle}>Type below your story content</h4>
                  <textarea id="standard-basic" label="Story body" variant="standard"
                    name="textbody" type="text" required style={textareaStyle} /><br />
                  <span className="error">{errors["textbody"]}</span>
                  <br />
                  <Button variant="contained" color="secondary" type="submit">
                    Submit
                  </Button>
                </Box>
              </Paper>
            )}


            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button onClick={handleNext} disabled={isAdded ? false : true}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>

    </div>
  );
}

