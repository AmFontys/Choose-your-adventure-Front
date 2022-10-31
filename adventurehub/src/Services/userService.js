import httpCommons from "../http-commons";


export const getUsers = () => {
    return httpCommons.get("/user");
}

export const updateUser = async(json) => {
    console.log(json);
    return await httpCommons.patch("/user", json);
}

export const deleteUser = async(json) =>{
    console.log(json);
    return await httpCommons.delete("/user",json);
}