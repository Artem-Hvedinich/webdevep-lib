# Webdevep Lib


### Installing

```bash
npm i webdevep-lib
```

### Usage
После установки пакет для подключения можно использовать import подход:
```javascript
import {loginOrRegister, UserType} from "webdevep-lib";
```

## lib API

### routerRedirectMiddleware
- Middleware для редиректов пользователья по вашим страницам.

```routerRedirectMiddleware(router, pathToLoginPage, "pathToTheAuthUserPage")```

router: это ваш vue-router

**pathToLoginPage:** путь к страницы логинизации

**pathToTheAuthUserPage:** путь к странице если пользователь авторизован

### loaderMiddleware
- Middleware для слежением за запросами внутри либы.

```loaderMiddleware(hide, show)```

##### Example
```loaderMiddleware(() => loaderStore.hideLoader(), () => loaderStore.showLoader())```

**hide:** функция отрабатывает когда запрос выполнен

**show:** функция отрабатывает когда запрос отправлен

### login
- Функция для авторизации пользователя.

```login(credential, password)```

*Значение переменных и их типы можно найти в документации

-Так же записывает токены **accessToken** и **refreshToken** в локальное хранилеще (localStorage)

### logout
- Функция для выхода пользователя из системы.

```logout(refreshToken)```

*Значение переменных и их типы можно найти в документации

-Так же удаляет токены **accessToken** и **refreshToken** из локального хранилеща (localStorage)

### register
- Функция регистрации пользователя.

```
register({
 password, 
 userinfo, 
 inn?, 
 recapthcaToken?, 
 roles?, 
 emailOrPhone: {email?, emailConfirmCode?, phone?, phoneConfirmCode?}
})
```


*Значение переменных и их типы можно найти в документации

### getUserInfo
- Функция получения данных о пользователе

```getUserInfo(accessToken)```

*Значение переменных и их типы можно найти в документации

### loginOrRegister
- Функция регистрации и авторизации пользователя, а в случае если пользователь не зарегистрирован его регистрирует **(register)** и авторизует **(login)**.

```loginOrRegister({ email?, phone?, emailConfirmCode?, phoneConfirmCode?, password})```

*Значение переменных и их типы можно найти в документации
