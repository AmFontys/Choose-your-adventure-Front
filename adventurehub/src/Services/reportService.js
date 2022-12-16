import httpCommons from "../http-commons";

export const getReportType= () =>{
    console.log("Report types loaded");
    return httpCommons.get("/report/type")
}

export const postReport = async(data) =>{
    return await httpCommons.post("/report",data)
}

export const getReports = () =>{
    let token = JSON.parse(sessionStorage.getItem('user')).accesToken;  
    
    return httpCommons.get("/report",{ headers: { Authorization: `Bearer ${token}` } });
}

export const deleteReports = (id) =>{
    console.log("delete log");
    return httpCommons.delete("/report/"+id);
}

export const updateReport = (data) =>{
    return httpCommons.put("/report",data);
}