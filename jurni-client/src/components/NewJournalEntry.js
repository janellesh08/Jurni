import React from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap'
import { useState } from "react"
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

function NewJournalEntry(props) {

    var url = window.location.pathname;
    const journeyId = url.substring(url.lastIndexOf('/') + 1);

    let history = useHistory();

    const [journey, setJourney] = useState({})

    const [entry, setEntry] = useState({})

    

    const handleEntryChange = (e) => {

        setEntry({
            ...entry,
            [e.target.name]: e.target.value
        })

    }

    // const handleLoadJourney = () => {
    //     fetch(`/api/journey-detail/${props.journeyId}`)
    //     .then(response => response.json())
    //     .then(journey => {
    //         setJourney(journey)
    //     })
    // }


    const handleEntrySave = (e) => {


        var url = window.location.pathname;
        const journeyId = url.substring(url.lastIndexOf('/') + 1);
        console.log(journeyId)

        fetch(`http://localhost:8080/api/add-entry/${journeyId}`, {
        method: 'POST',
            headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: entry.title,
            entry: entry.entry,
            userId: entry.userId,
            journeyId: journeyId
        })
    }).then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem('journeyId', result.journeyId)
            props.onSaveEntry(result.journeyId)
            // props.history.push(`/journey-detail/${journeyId}`)
        })
}




return (
    <div>
        <FloatingLabel
            controlId="floatingInput"
            label="Title"
            className="mb-3"
        >
            <Form.Control name="title" onChange={handleEntryChange} type="text" placeholder="title" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Entry">
            <Form.Control name="entry" onChange={handleEntryChange} type="text" placeholder="entry" />
        </FloatingLabel>

        <Button onClick={handleEntrySave} variant="primary">Add Journal Entry</Button>{' '}

    </div>

    )
}

const mapStateToProps = (state) => {
    return {
      userId: state.userId,
      journeyId: state.journeyId
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        onSaveEntry: (journeyId) => dispatch({type: 'ADD_ENTRY', payload: journeyId}),
    //     onLoad: (journeyId) => dispatch({type: 'LOAD_JOURNEY', payload: journeyId})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewJournalEntry);