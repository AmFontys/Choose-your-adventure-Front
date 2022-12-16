import httpCommons from "../http-commons";


export const getUsers = () => {
    let token = JSON.parse(sessionStorage.getItem('user')).accesToken;    
    return httpCommons.get("/user",{headers: { Authorization: `Bearer ${token}` } });
}

export const updateUser = async(json) => {
    return await httpCommons.put("/user", json);
}

export const deleteUser = async(json) =>{
    return await httpCommons.delete("/user",{data:json });
}