import axios from "axios";
import {
    IncomingLoginData,
    IncomingRegisterData,
    LoginResponseDataType,
    RegisterResponseType,
    UserType
} from "./types";

export const instance = axios.create({
    baseURL: "/api/v2/",
    headers: {
        "content-type": "application/json",
        Accept: "application/json",
    },
});

export const API = {
    login(data: IncomingLoginData): Promise<{ data: LoginResponseDataType }> {
        return instance.post("login", data)
    },
    logout(refreshToken: string): Promise<{ data: { ok: boolean } }> {
        return instance.post(`logout`, {refreshToken})
    },
    register(data: IncomingRegisterData): Promise<{ data: RegisterResponseType }> {
        return instance.post(`register`, data);
    },
    sendConfirmCode(use_call: boolean, emailOrPhone: { email?: string, phone?: string }) {
        return instance.post(`sendConfirmCode`, {use_call, ...emailOrPhone});
    },
    getUserInfo(accessToken: string): Promise<{ data: UserType }> {
        return instance.post(`getUserInfo`, {accessToken})
    }
};
