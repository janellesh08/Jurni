const initialState = {
    userId: '',
    journeys: [],
    entries: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                userId: state.userId.concat(action.payload)
            }
    }
    return state
}

export default reducer


