import React from 'react'
import {AuthConsumer} from "../../context/Auth/AuthConsumer";
import {Redirect, Route} from "react-router-dom";

function ProtectedRoute({children, ...rest}) {
  return (
    <AuthConsumer>
      {({ user }) => (
        <Route
          {...rest}
          render={({ location }) =>
            user.isAuth ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: location }
                }}
              />
            )
          }
        />
      )}
    </AuthConsumer>
  )
}