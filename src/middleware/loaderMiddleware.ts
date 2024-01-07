import {instance} from "../api/api";

export const loaderMiddleware = (hide: any, show: any ) => {
    instance.interceptors.response.use(response => {
        hide()
        return response
    })
    instance.interceptors.request.use(conf => {
        show()
        return conf
    })
}
