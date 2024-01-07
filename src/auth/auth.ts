import {
    IncomingRegisterData,
    IncomingRegisterEmailOrPhone,
    LoginResponseDataType,
    RegisterDataType,
    RegisterResponseType, UserType
} from "../api/types";
import {API} from "../api/api";

export const login = async (credential: string, password: string): Promise<LoginResponseDataType> => {
    const {data} = await API.login({credential, password})
    if (data.ok) {
        data.accessToken && localStorage.setItem("accessToken", data.accessToken)
        data.refreshToken && localStorage.setItem("refreshToken", data.refreshToken)
    }
    return data
}

export const logout = async (refreshToken: string): Promise<{ ok: boolean }> => {
    const {data} = await API.logout(refreshToken)
    if (data.ok) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
    }
    return data
}

export const register = async (data: IncomingRegisterData): Promise<{ data: RegisterResponseType }> => {
    let dataGeneration: RegisterDataType = {...data.emailOrPhone, password: data.password, userinfo: data.userinfo}
    if (data.inn) dataGeneration["inn"] = data.inn
    if (data.recapthcaToken) dataGeneration["recapthcaToken"] = data.recapthcaToken
    if (data.roles) dataGeneration["roles"] = data.roles
    return API.register(data)
}

export const loginOrRegister = async (
    {
        email,
        phone,
        emailConfirmCode,
        phoneConfirmCode,
        password
    }: IncomingRegisterEmailOrPhone & { password: string }): Promise<LoginResponseDataType | { msg: string }> => {
    async function checkRegistrationMethod(password: string, phone?: string, email?: string,): Promise<LoginResponseDataType> {
        let data = {} as LoginResponseDataType
        if (phone) data = await login(phone, password)
        else if (email) data = await login(email, password)
        return data
    }

    const data = await checkRegistrationMethod(password, phone, email)
    if (!data.ok && data.msg === "Неверный пароль") return {msg: data.msg}
    if (!data.ok && data.msg === "Пользователь не найден") {
        let emailOrPhone: IncomingRegisterEmailOrPhone = {} as IncomingRegisterEmailOrPhone
        if (phone) {
            emailOrPhone["phone"] = phone
            emailOrPhone["phoneConfirmCode"] = phoneConfirmCode
        }
        if (email) {
            emailOrPhone["email"] = email
            emailOrPhone["emailConfirmCode"] = emailConfirmCode
        }

        await API.sendConfirmCode(true, emailOrPhone)
        await register({emailOrPhone, password, userinfo: {}})
        return await checkRegistrationMethod(password, phone, email)
    }
    return {msg: "Неопределенная ошибка"}
}

export const getUserInfo = (accessToken: string): Promise<{ data: UserType }> => {
    return API.getUserInfo(accessToken)
}
