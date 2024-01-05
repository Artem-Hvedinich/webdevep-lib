import axios from "axios";

export const instance = axios.create({
    baseURL: "/api/v2/",
    headers: {
        "content-type": "application/json",
        Accept: "application/json",
    },
});
export type LoginResponseType = {
    accessToken?: string,
    ok: boolean,
    refreshToken?: string,
    msg?: string,
    code?: number
}

export const authentication = (credential: string, password: string): Promise<{
    data: LoginResponseType
}> => instance.post("login", {
    credential,
    password
})

