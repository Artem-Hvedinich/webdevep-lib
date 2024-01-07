import axios from "axios";
import {LoginResponseDataType, RegisterDataType, RegisterResponseType, UserType} from "./types";

export const instance = axios.create({
    baseURL: "/api/v2/",
    headers: {
        "content-type": "application/json",
        Accept: "application/json",
    },
});

export const API = {
    login(credential: string, password: string): Promise<{ data: LoginResponseDataType }> {
        return instance.post("login", {credential, password})
    },
    register(
        emailOrPhone: {
            email?: string,
            emailConfirmCode?: number,
            phone?: string,
            phoneConfirmCode?: number,
        },
        password: string,
        usernfo: {},
        inn?: string,
        recapthcaToken?: string,
        roles?: string
    ): Promise<{ data: RegisterResponseType }> {
        let data: RegisterDataType = {...emailOrPhone, password, usernfo}
        if (inn) data["inn"] = inn
        if (recapthcaToken) data["recapthcaToken"] = recapthcaToken
        if (roles) data["roles"] = roles
        return instance.post(`register`, data);
    },
    sendConfirmCode(use_call: boolean, emailOrPhone: { email?: string, phone?: string }) {
        return instance.post(`sendConfirmCode`, {use_call, ...emailOrPhone});
    },
    logout(refreshToken: string): Promise<{ data: { ok: boolean } }> {
        return instance.post(`logout`, {refreshToken})
    },
    getUserInfo(accessToken: string): Promise<{ data: UserType }> {
        return instance.post(`getUserInfo`, {accessToken})
    }
};
