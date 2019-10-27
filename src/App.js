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
          {/* <Route exact path="/bodegas/:id" component={UserForm} />
          <Route exact path="/bodegas/delete/:id" component={UserDelete} /> */}

        </Switch>
      </div>
    </Router>
  );
}

export default App;
