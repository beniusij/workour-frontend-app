import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import NavMenu from "./components/navigation/NavMenu.js";
import Login from "./pages/Login/Login.js"
import Register from "./pages/Register/Register.js"
import Home from "./pages/Dashboard"
import { AuthProvider } from "./context/Auth/AuthProvider";
import {AuthConsumer} from "./context/Auth/AuthConsumer";

function App()  {
  const anonymousUserRoutes = (
    <>
      <Route path='/signin' render={Login} />
      <Route path='/signup' render={Register} />
    </>
  )

  return (
    <AuthProvider>
      <AuthConsumer>
        {({ user }) => (
          <Router>
            <NavMenu />

            <Route exact path='/' render={Home} />
            {
              !user.isAuth &&
              anonymousUserRoutes
            }
          </Router>
        )}
      </AuthConsumer>
    </AuthProvider>

  );
}

export default App;
