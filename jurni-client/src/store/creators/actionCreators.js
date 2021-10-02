export const fetchJourneys = () => {

    return(dispatch)=>{
        fetch('/api/all-journeys/:userId')
        .then(response => response.json())
        .then(journeys => {
            dispatch({type: 'JOURNEYS_LOADED', payload: journeys})
        })
    }
}


