import { React } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import BaseLayout from './components/BaseLayout';
import Home from './components/Home'; 
import JourneyDetail from './components/JourneyDetail';
import NewJourney from './components/NewJourney';
import LoginRegister from './components/LoginRegister';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          <Route component={App} path="/" exact />
          <Route component={LoginRegister} path="/login/register" />
          <Route component={Home} path="/home" />
          <Route component={JourneyDetail} path="/journey-detail/:journeyId" />
          <Route component={NewJourney} path="/start-new-journey" />
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
