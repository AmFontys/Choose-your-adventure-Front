import httpCommons from "../http-commons";


export const getStories = () => {
    return httpCommons.get("/story");
}

export const getUserStories = (json) => {
    let token = sessionStorage.getItem("user");    
    let indexA = token.indexOf(`"accesToken":`,0)+13;
    let IndexB = token.indexOf(`","Role"`,0);
     let substringEnd = token.substring(indexA,IndexB);
    
    let concat = (substringEnd).replace(/"/g,``)
    let jsonD = {
        userid: json
    }
    console.log(jsonD);
    return httpCommons.get("/story/user",{params: jsonD, headers: { Authorization: `Bearer ${concat}` } });
}

export const postStory = async(ldata) => {
    console.log(ldata);
    return await httpCommons.post("/story", ldata);
    
}

