import axios from "axios";

export const instance = axios.create({
    baseURL: "/api/v2/",
    headers: {
        "content-type": "application/json",
        Accept: "application/json",
    },
});
export type LoginResponseType = {
    data: {
        accessToken?: string,
        ok: boolean,
        refreshToken?: string,
        msg?: string,
        code?: number
    }
}

export const authentication = (credential: string, password: string): Promise<LoginResponseType> => instance.post("login", {
    credential,
    password
})

