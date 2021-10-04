import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';


function DisplayUserJournalEntries(props){

    const [entries, setEntries] = useState([])

    console.log('id',props.journeyId)

    useEffect(() => {
        console.log('fired')
        loadEntries()
    }, [])

    const loadEntries = () => {
        fetch(`https://git.heroku.com/serene-reaches-03833.git/api/all-journal-entries/${props.journeyId}`)
            .then(response => response.json())
            .then(fetchedEntries => {
                console.log('entires',fetchedEntries)
                setEntries(fetchedEntries)
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

export default DisplayUserJournalEntries;