import React, { useEffect } from 'react';
import DisplayUserJournalEntries from './DisplayUserJournalEntries';
import NewJournalEntry from './NewJournalEntry';
import { Alert } from 'react-bootstrap'

function JourneyDetail({ match }){



    const journeyId = match.params.journeyId
    console.log('Journey id =', journeyId)

   

    return(
        <div>
            <Alert variant="success">
  <Alert.Heading>Journal Entries</Alert.Heading>
  <p>
    This is your journey detail page! You can find all of your journal entries for this journey right here.
    </p>
  <hr />
  <p className="mb-0">
    Have something to add? Enter your new journal entry below!
    </p>
</Alert>
            <NewJournalEntry />
            <DisplayUserJournalEntries journeyId={journeyId} />
        </div>
    )

}

export default JourneyDetail;