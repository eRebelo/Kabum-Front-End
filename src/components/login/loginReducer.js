const INITIAL_STATE = {
    loading: false,
    loggedUser: false,
    loggedUsername: null
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOADING_LOGIN':
            return { ...state, loading: state.loading === false ? true : false }
        case 'LOGGED_USER':
            return { ...state, loggedUser: action.payload }
        case 'LOGGED_USERNAME':
            return { ...state, loggedUsername: action.payload }
        default:
            return state
    }
}