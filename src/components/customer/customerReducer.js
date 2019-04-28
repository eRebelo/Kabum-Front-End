const INITIAL_STATE = {
    loading: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOADING_CUSTOMER':
            return { ...state, loading: state.loading === false ? true : false }
        default:
            return state
    }
}