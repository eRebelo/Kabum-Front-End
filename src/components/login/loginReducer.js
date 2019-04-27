const INITIAL_STATE = {
    loggedUser: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOGGED_USER':
            return { ...state, loggedUser: action.payload }
        default:
            return state
    }
}