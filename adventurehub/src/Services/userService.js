import httpCommons from "../http-commons";


export const getUsers = () => {
    return httpCommons.get("/user");
}

export const updateUser = async(json) => {
    return await httpCommons.put("/user", json);
}

export const deleteUser = async(json) =>{
    return await httpCommons.delete("/user",{data:json });
}