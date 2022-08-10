export const LoginStart = () => ({
    type : "LOGIN_START",
    // error : ERROR
})

export const LoginSuccess = (user) => ({
    type : "LOGIN_SUCCESS",
    payload : user,
})

export const LoginFailure = () => ({
    type : "LOGIN_FAILURE"
})

export const Logout = () => ({
    type : "LOGOUT",
})

export const setCurrentPage = (page) => ({
    type : "setCurrentPage",
    payload : page
})