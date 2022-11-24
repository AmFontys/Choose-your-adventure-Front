import httpCommons from "../http-commons";


export const getStoryBodyType = () => {
    let token = sessionStorage.getItem("user");
    let indexA = token.indexOf(`"accesToken":`,0)+13;
    let IndexB = token.indexOf(`","Role"`,0);
     let substringEnd = token.substring(indexA,IndexB);
    let concat = (substringEnd).replace(/"/g,``);
    return httpCommons.get("/story/body/type",{ headers: { Authorization: `Bearer ${concat}` } });
}

export const getStoryBody =(json) =>{
    return httpCommons.get("/story/body",{params: json})
}

export const postStoryBody = async(data) => {
    console.log(data);
    let token = sessionStorage.getItem("user");
    let indexA = token.indexOf(`"accesToken":`,0)+13;
    let IndexB = token.indexOf(`","Role"`,0);
     let substringEnd = token.substring(indexA,IndexB);
    let concat = (substringEnd).replace(/"/g,``);
    return await httpCommons.post(`/story/body/9`,data,{ headers: { Authorization: `Bearer ${concat}` } });
    
}

