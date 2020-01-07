import React from 'react'
import {AuthConsumer} from "../../context/Auth/AuthConsumer";
import {Redirect, Route} from "react-router-dom";

function AnonymousRoute(props) {
  return (
    <AuthConsumer>
      {({ user }) =>
        user.isAuth ? (
          <Redirect
            to={"/"}
          />
        ) : (
          <Route
            path={props.path}
            render={props.render}
          />
        )
      }
    </AuthConsumer>
  )
}

export default AnonymousRoute