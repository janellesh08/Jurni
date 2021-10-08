import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function DisplayUserJourneys(props) {
    const [journeys, setJourneys] = useState([]

    )

    useEffect(() => {
        loadJourneys()
    }, [])

    const loadJourneys = () => {

        const token = localStorage.getItem('jsonwebtoken')
        const userId = localStorage.getItem('userId')
        fetch(`http://localhost:8080/api/all-journeys/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(journeys => {
                console.log(journeys)
                setJourneys(journeys)
                props.onJourneysLoaded(journeys)
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
        // journeys: state.journeys
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onJourneysLoaded: (journeys) => dispatch({type: 'JOURNEYS_LOADED', payload: journeys})
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(DisplayUserJourneys);