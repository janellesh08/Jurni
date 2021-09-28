import { useEffect, useState } from 'react';
import './App.css';
import DisplayUserJourneys from './components/DisplayUserJourneys';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginRegister from './components/LoginRegister';


function App() {
return(
<div><DisplayUserJourneys />
<LoginRegister />
</div>
)

}

export default App;
