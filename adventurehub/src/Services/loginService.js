import httpCommons from "../http-commons";

export const postRegister = async (json) => {
    return await httpCommons.post("/register", json);
}

export const getLogin = (json) => {
    return httpCommons.get("/login", { params: json });
}
