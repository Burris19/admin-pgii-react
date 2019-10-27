import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import Home from './component/Admin/home'
import WineList from './component/Admin/wineries/container/list';
import WineForm from './component/Admin/wineries/container/form';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route exact path="/bodegas" component={WineList} />
          <Route exact path="/bodegas/:id" component={WineForm} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
