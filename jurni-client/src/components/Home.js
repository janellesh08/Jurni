import DisplayUserJourneys from "./DisplayUserJourneys";
import { Alert } from 'react-bootstrap';


function Home() {
    fetch('')

    return (
    <div>
        <Alert variant="success">
  <Alert.Heading>Welcome!</Alert.Heading>
  <p>
    Here you'll find all of your journeys. Click details on your journey cards to see more information and add journal entries.
  </p>
  <hr />
  <p className="mb-0">
    Starting something new can be hard. Let's take the first step together! Click the menu above to start a new journey.
  </p>
</Alert>
        <DisplayUserJourneys />
    </div>)
}

export default Home;
