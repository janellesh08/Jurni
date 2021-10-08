import React from 'react';
import { FloatingLabel, Form, Button } from 'react-bootstrap'
import { connect, useDispatch } from 'react-redux'
import { useState } from "react"
import * as actionCreators from '../store/creators/actionCreators'


function NewJourney(props) {

    const [journey, setJourney] = useState({})

    const handleJourneyChange = (e) => {

        // let is_public = e.target.checked;

        setJourney({
            ...journey,
            [e.target.name]: e.target.value
        })
    }

    const handleJourneySave = (e) => {

        fetch(`https://serene-reaches-03833.herokuapp.com/api/new-journey/${props.userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: journey.title,
                description: journey.description,
                // is_public: journey.is_public,
                userId: journey.user_id
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                // console.log(journey.title)
                // localStorage.setItem('userId', result.userId)
                // props.onJourneysLoaded(result.userId)
                props.history.push(`/journey-detail/${props.userId}`)
            })
    }

    return (
        <div>
            <Form><FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
                <Form.Control name="title" onChange={handleJourneyChange} type="text" placeholder="title" />
            </FloatingLabel>
                <FloatingLabel name="description" controlId="floatingTextarea2" label="Description" className="mb-3">
                    <Form.Control onChange={handleJourneyChange} as="textarea" name="description" placeholder="Description" />
                </FloatingLabel>

                {['checkbox'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                        <Form.Check
                            type={type}
                            id={`default-${type}`}
                            label="Make public"
                            name="is_public"
                        />
                    </div>
                )
                )}

                <Button onClick={handleJourneySave} variant="primary">Save Journey</Button>{' '}
            </Form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      userId: state.userId
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        onJourneysLoaded: () => dispatch(actionCreators.fetchJourneys())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewJourney);