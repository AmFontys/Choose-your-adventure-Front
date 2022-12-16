import httpCommons from "../http-commons";


export const getStories = () => {
    return httpCommons.get("/story");
}

export const getUserStories = (json) => {
    let token = JSON.parse(sessionStorage.getItem('user')).accesToken;

    let jsonD = {
        userid: json
    }
    console.log(jsonD);
    return httpCommons.get("/story/user", { params: jsonD, headers: { Authorization: `Bearer ${token}` } });
}

export const postStory = async (ldata) => {
    console.log(ldata);
    return await httpCommons.post("/story", ldata);

}

export const deleteStory = async (id) => {
    return await httpCommons.delete("/story/" + id);
}

