const Reducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_START" :
            return {
                user : null,
                currentPage : state.currentPage
            }
        case "LOGIN_SUCCESS" :
            return {
                user : action.payload,
                currentPage : state.currentPage
            }
        case "LOGIN_FAILURE" :
            return {
                user : null,
                currentPage : state.currentPage
            }
        case "LOGOUT" :
            return {
                user : null,
                currentPage : state.currentPage
            }
            case "setCurrentPage" :
                return {
                    user : state.user,
                    currentPage : action.payload
                }
        default :
            return state
    }
}

export default Reducer;