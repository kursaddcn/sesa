const userReducer = (state = {
    userMail:"",
}, action) => {
    switch (action.type) {
        case "SET_NEW_USER":
            state = {
                ...state,
                userMail:action.payload.userMail,
            }
            break;
        default:
            break;
    }
    return state;
}
export default userReducer;
