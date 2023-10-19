import { CurrencyType, CurrencyTypeRes } from "../currency/model/currency.type"


export interface LoginPropsReq{
    username: string
    password: string
}

export interface LoginPropsResData {
    id: string
    token: string
}

export interface LoginPropsRes {
    data?: {
        login: LoginPropsResData
    }
}

export interface RegisterPropsReq{
    username: string
    password: string
    email?: string
}

export interface RegisterPropsResData {
    id: string
}

export interface RegisterPropsRes {
    data: {
        login: RegisterPropsResData
    }
}

export interface IUserRepository {
    sendLoginRequest(data:LoginPropsReq): Promise<LoginPropsRes | string>
    sendRegisterRequest(data:RegisterPropsReq): Promise<RegisterPropsRes | string>
    getUserSearches(token: string): Promise<CurrencyType[] | string>
    sendCurrencyRequest(name: string): Promise<CurrencyTypeRes | string>
}