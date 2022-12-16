import httpCommons from "../http-commons";


export const getStoryBodyType = () => {
    let token = JSON.parse(sessionStorage.getItem('user')).accesToken;

    return httpCommons.get("/story/body/type", { headers: { Authorization: `Bearer ${token}` } });
}

export const getStoryBody = (json) => {
    return httpCommons.get("/story/body/" + json)
}

export const postStoryBody = async (data) => {
    let token = JSON.parse(sessionStorage.getItem('user')).accesToken;
    return await httpCommons.post(`/story/body/` + data.story.storyid, data, { headers: { Authorization: `Bearer ${token}` } });

}

