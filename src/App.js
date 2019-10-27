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
import WineDelete from './component/Admin/wineries/container/delete';

import CellarList from './component/Admin/hallways/container/list';
import CellarForm from './component/Admin/hallways/container/form';
import CellarDelete from './component/Admin/hallways/container/delete';

import RackList from './component/Admin/shelves/container/list';
import RackForm from './component/Admin/shelves/container/form';
import RackDelete from './component/Admin/shelves/container/delete';

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
          <Route exact path="/bodegas/delete/:id" component={WineDelete} />

          <Route exact path="/pasillos" component={CellarList} />
          <Route exact path="/pasillos/:id" component={CellarForm} />
          <Route exact path="/pasillos/delete/:id" component={CellarDelete} />


          <Route exact path="/estanterias" component={RackList} />
          <Route exact path="/estanterias/:id" component={RackForm} />
          <Route exact path="/estanterias/delete/:id" component={RackDelete} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
