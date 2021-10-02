import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function DisplayUserJourneys(props) {
    const [journeys, setJourneys] = useState([]
        // title: '',
        // description: '',
        // user_id: '',
        // journey_id: '',
    )



    useEffect(() => {
        console.log('fired')
        loadJourneys()
    }, [])

    const loadJourneys = () => {
        fetch(`http://localhost:8080/api/all-journeys/${props.userId}`)
            .then(response => response.json())
            .then(journeys => {
                setJourneys(journeys)
            })
    }


    const journeyItems = journeys.map(journey => {
        return <div>
            <li key={journey.journey_id}>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{journey.title}</Card.Title>
                        <Card.Text>
                            {journey.description}
                        </Card.Text>
                        <NavLink to={`/journey-detail/${journey.journey_id}`} className="nav-link">Details</NavLink>
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

const mapStateToProps = (state) => {
    return {
        userId: state.userId,
        journeys: state.journeys
    }
}



export default connect(mapStateToProps)(DisplayUserJourneys);