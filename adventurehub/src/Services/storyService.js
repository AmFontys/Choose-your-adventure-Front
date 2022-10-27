import httpCommons from "../http-commons";


export const getStories = () => {
    return httpCommons.get("/story");
}

export const getUserStroies = () => {
    return httpCommons.get("/story");
}

export const postStory = async(ldata) => {
    console.log(ldata);
    return await httpCommons.post("/story", ldata);
    
}

