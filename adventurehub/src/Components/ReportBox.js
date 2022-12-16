import * as React from 'react';
import { Container } from '@mui/system';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getReportType, postReport } from '../Services/reportService';

export default function ReportBox(formStory) {  
    const paperStyle = { padding: '50px 20px', width: 300, margin: "20px auto" }
    const [errors, setErrors] = React.useState([])
    const [types, setTypes] =  React.useState([]);
    const [type, setType] =  React.useState('');

    React.useEffect(()=>{
        getReportType()
        .then(res =>{
            setTypes(res.data);
        })
        .catch(r => { console.log(r) })

    },[])


    console.log(formStory);

    function openForm(){
        console.log("Clicked");
        document.getElementById('formReport').style.display === "none" ? document.getElementById('formReport').style.display = "flex" : document.getElementById('formReport').style.display = "none";
    }

    function handleValidation(formData) {
        let formIsValid = true;
    let errors = {};
    if(!formData.get('reportText').match(/^[a-zA-Z_\s]{5,}$/)){
        formIsValid = false;
        errors["reportText"] = "You have invalid charters in your text or your title is too short.";
    }
    
    setErrors(errors);    
    return formIsValid;

    }


    const handleClick = (e) =>{
        e.preventDefault();
        const fdata = new FormData(e.currentTarget);
const person = JSON.parse(sessionStorage.getItem("user"));
const formReportText = fdata.get("reportText");
const formType = type;

if(person === null) alert("You need to login before making a report");

        if (handleValidation(fdata)) {
            let json = {user: person, story: formStory.story.stories, type: {type: formType}, reportText: formReportText }
console.log("Watchout");
console.log(json);
            postReport(json)
            .then(res =>{
                if(res.data === "New Report added"){
                    alert("Report is made");
                }
                else alert("We are having issues regarding your regeust please try again later")
            })
        }
    }

    const handleTypeChange = (event) => {
        setType(event.target.value);
      }

  return (
    <Container>

    <h6 onClick={()=> openForm()}>Make a report</h6>

<div id='formReport' style={{ display: "none"}} >
<Paper elevation={3} style={paperStyle}>
        <h1>Adding a Report</h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleClick}
        >
          <TextField id="standard-basic" label="Story report text" variant="standard"
            name="reportText" type="text" required />
          <span className="error">{errors["reportText"]}</span>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Report type selected</InputLabel>
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
              {types.map(reportType => (
                <MenuItem value={reportType.type} key={reportType.type
                }>{reportType.type}</MenuItem>
              ))}

            </Select>
          </FormControl><br />
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </Box>
      </Paper>
</div>

    </Container>
  );
}
