import { useEffect, useState } from 'react';
// import './App.css';

function DisplayUserJourneys(props) {
    const [journeys, setJourneys] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/api/all-journeys/1')
            .then(response => response.json())
            .then(journeys => {
                setJourneys(journeys)
            })
    }, [])


        const journeyItems = journeys.map(journey => {
            return <li key = {journey.journey_id}><a>{journey.title}</a></li>
        })

        return(
            <ul>
                {journeyItems}
            </ul>
        )
}

export default DisplayUserJourneys;