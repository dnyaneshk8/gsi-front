import React from "react";
// import { checkAuthuser } from "libs/auth";
import { Route, Redirect } from "react-router-dom";
import { UseGlobalContext } from "../../store/AppContext";

export default function ProtectedRoute({ component: Component, ...rest }: any) {
  const { globalState } = UseGlobalContext();
  return (
    <Route
      {...rest}
      render={(props: any) => {
        console.log("auth hreer", rest);
        return globalState &&
          typeof globalState.loggedInUser === "object" &&
          globalState.loggedIn !== false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}
