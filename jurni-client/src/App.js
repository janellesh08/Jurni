import 'bootstrap/dist/css/bootstrap.min.css';
import LoginRegister from './components/LoginRegister';
import React from 'react'


function App(props) {
  return (
    <div>
    <LoginRegister {...props} />
    </div>
  )

}

export default App;
