import {LoginResponseDataType} from "../api/types";
import {API} from "../api/api";

export const login = async (credential: string, password: string): Promise<LoginResponseDataType> => {
    const {data} = await API.login(credential, password)
    if (data.ok) {
        data.accessToken && localStorage.setItem("accessToken", data.accessToken)
        data.refreshToken && localStorage.setItem("refreshToken", data.refreshToken)
    }
    return data
}

export const logout = async (refreshToken: string) => {
    const {data} = await API.logout(refreshToken)
    if (data.ok) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
    }
    return data
}
