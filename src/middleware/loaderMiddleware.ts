import {instance} from "../api/api";

export const loaderMiddleware = (loaderStore: any) => {
    instance.interceptors.response.use(response => {
        loaderStore.hideLoader()
        return response
    })
    instance.interceptors.request.use(conf => {
        loaderStore.showLoader()
        return conf
    })
}
