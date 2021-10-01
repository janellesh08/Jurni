import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
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
        return <div>
            <li key={journey.journey_id}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{journey.title}</Card.Title>
                    <Card.Text>
                        {journey.description}
                    </Card.Text>
                    <NavLink to = "/journey-detail/:userId/:journeyId" className="nav-link">Details</NavLink>
                </Card.Body>
            </Card>
        </li>
        </div >
    })

return (
    <ul>
        {journeyItems}
    </ul>
)
}

export default DisplayUserJourneys;