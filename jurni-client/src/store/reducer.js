const initialState = {
    userId: '',
    journeyId: '',
    journeys: [],
    entries: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                userId: action.payload
            }
        case 'ADD_ENTRY':
            return {
                ...state,
                journeyId: action.payload
            }
        case 'JOURNEYS_LOADED':
            return {
                ...state,
                journeys: action.payload
            }  
        case 'ENTRIES_LOADED':
            return {
                ...state,
                entries: action.payload
            } 
        
            default:
                return state
    }

}


export default reducer;


