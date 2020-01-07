import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import NavMenu from "./components/navigation/NavMenu.js";
import Login from "./pages/Login/Login.js"
import Register from "./pages/Register/Register.js"
import Home from "./pages/Dashboard"
import { AuthProvider } from "./context/Auth/AuthProvider";
import {AuthConsumer} from "./context/Auth/AuthConsumer";
import AnonymousRoute from "./components/navComponents/AnonymousRoute";
import ProtectedRoute from "./components/navComponents/ProtectedRoute";

function App()  {
  const anonOnlyUserRoutes = (
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

            {/* Routes for public*/}
            <Route exact path='/' render={Home} />

            {/* Routes for authenticates users only */}
            <ProtectedRoute />

            {/* Routes for anonymous users only */}
            <AnonymousRoute path={'/signin'} render={Login} />
            <AnonymousRoute path={'/signup'} render={Register} />
          </Router>
        )}
      </AuthConsumer>
    </AuthProvider>

  );
}

export default App;
