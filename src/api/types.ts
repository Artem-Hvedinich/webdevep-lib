export type RegisterDataType = {
    email?: string,
    emailConfirmCode?: number,
    phone?: string,
    phoneConfirmCode?: number,
    inn?: string,
    password: string,
    usernfo: {},
    recapthcaToken?: string,
    roles?: string
}
export type LoginResponseDataType = {
    accessToken?: string,
    ok: boolean,
    refreshToken?: string,
    msg?: string,
    code?: number
}
export type RegisterResponseType = {
    "ok": true,
    "uid": "string"
}
export type UserType = {
    ok: boolean,
    roles: Array<string>,
    email: string,
    emailIsConfirmed: boolean,
    phone: string,
    phoneIsConfirmed: boolean,
    inn: string,
    is_online: boolean,
    userinfo: any
}
