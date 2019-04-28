const INITIAL_STATE = {
    loading: false,
    list: []
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOADING_CUSTOMER':
            return { ...state, loading: state.loading === false ? true : false }
        case 'CUSTOMER_LIST':
            return { ...state, list: action.payload }
        default:
            return state
    }
}