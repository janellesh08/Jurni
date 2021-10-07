import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';


function DisplayUserJournalEntries(props){

    const [entries, setEntries] = useState([])

    console.log('id',props.journeyId)

    useEffect(() => {
        console.log('fired')
        loadEntries()
    }, [])

    const loadEntries = () => {

        const token = localStorage.getItem('jsonwebtoken')

        fetch(`http://localhost:8080/api/all-journal-entries/${props.journeyId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(fetchedEntries => {
                console.log('entries',fetchedEntries)
                setEntries(fetchedEntries)
                props.onEntriesLoaded(fetchedEntries)
            })
    }

    const entryItems = entries.map(entry => {
        return <div>
            <li key={entry.entry_id}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{entry.title}</Card.Title>
                    <Card.Text>
                        {entry.entry}
                    </Card.Text>
                </Card.Body>
            </Card>
        </li>
        </div >
    })
     return (
        <ul>
            {entryItems}
        </ul>
    )
}


const mapStateToProps = (state) => {
    return {
         journeys: state.journeys
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEntriesLoaded: (entries) => dispatch({type: 'ENTRIES_LOADED', payload: entries})
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (DisplayUserJournalEntries);