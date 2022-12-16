import * as React from 'react';
import { Container } from '@mui/system';
import { useLocation, Link } from "react-router-dom";
import { getStoryBody } from '../Services/storyBodyService';
import ReportBox from '../Components/ReportBox';


export default function ReadStory() {  
  const { state } = useLocation();
  const [bodies,setBodies] = React.useState([]);

  React.useEffect( ()=>
    {
     let storyid= getStorylocation();
      getStoryBody(JSON.parse(storyid))
      .then(res =>{
        console.log(res.data);
        setBodies(res.data);
      })
      .catch(r =>{console.log(r)})
    },[]
  )

  function getStorylocation(){
    // (A) FILE NAME ONLY
var fileonly = window.location.pathname;
// fileonly = fileonly.substring(fileonly.lastIndexOf("/")+1);
fileonly = fileonly.replace(/^.*[\\\/]/, "");
console.log(fileonly);
return fileonly;
  }

  function handleOption(bodyToShow){
    console.log(bodyToShow);
    document.getElementById(bodyToShow.bodyTitle).style.display = "flex";
  }

console.log(state.stories)
  return (
    <Container>
<Link to="/">
        <button>Back</button>
      </Link>
      <ReportBox story={state} />
    <h1>Read {state.stories.title}</h1>
    {bodies.map(body => {
      let number = body.type.typename.replace(/^[a-zA-Z]*_/,"");
      
      if(body.type.typename === "Intial"){
        return(
        <>
        <h1 key={body.id}>{body.bodyTitle}</h1><div>
        <p>
          {body.text}
        </p>
        <div key={1} onClick={()=>handleOption(bodies.at(1))}>{bodies.at(1).bodyTitle}</div>
        <div key={2} onClick={()=>handleOption(bodies.at(2))}>{bodies.at(2).bodyTitle}</div>
      </div>
      </>     
        )
      }
      else if(number.length <2){
        return(        
          <div id={body.bodyTitle} style={{ display: "none" }}>
          <h1 key={body.id}>{body.bodyTitle}</h1><div>
          <p>
            {body.text}
          </p>
          <p onClick={()=>handleOption(bodies.find(e => e.type.typename ==="Option_"+number+"A"))}>
            {bodies.find(e => e.type.typename === "Option_"+number+"A").bodyTitle}
            </p>
        <p onClick={()=>handleOption(bodies.find(e => e.type.typename ==="Option_"+number+"B"))}>
          {bodies.find(e => e.type.typename ==="Option_"+number+"B").bodyTitle}
          </p>
        </div>
        </div>    
        )
      } 
      else{
        return(        
          <div id={body.bodyTitle} style={{ display: "none" }}>
          <h1 key={body.id}>{body.bodyTitle}</h1><div>
          <p key={body.id}>
            {body.text}
          </p>
        </div>
        </div>    
        )
      }
})}
    </Container>
  );
}
