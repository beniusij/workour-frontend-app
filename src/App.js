import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import NavMenu from "./components/navigation/NavMenu.js";
import Login from "./pages/Login/Login.js"
import Register from "./pages/Register/Register.js"
import Home from "./pages/Dashboard"

class App extends Component {
  render() {
    return (
      <Router>
        <NavMenu />

        <Route exact path='/' render={Home} />
        <Route path='/signin' render={Login} />
        <Route path='/signup' render={Register} />
      </Router>
    );
  }
}

export default App;
