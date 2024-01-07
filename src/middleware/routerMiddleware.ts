import {Router} from "vue-router";

export const routerRedirectMiddleware = (router: Router, pathToLoginPage: string, pathToTheAuthUserPage: string) => {
    router.beforeEach((to, _, next) => {
        const isAuth = localStorage.getItem("accessToken");
        if (to.path === pathToLoginPage && isAuth) next(pathToTheAuthUserPage);
        else if (to.path !== pathToLoginPage && !isAuth) next(pathToLoginPage);
        else next();
    });
}
