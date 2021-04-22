import { Spin } from "antd";
import React, { useEffect, useState } from "react";
// import { checkAuthuser } from "libs/auth";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ProtectedRoute from "./components/Layouts/ProtectedRoute";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { execApi } from "./services/api";
import { Actions } from "./store/Actions";
import { UseGlobalContext } from "./store/AppContext";
import { IResponse } from "./store/interfaces";
import { checkAuthuser, getAuthuser } from "./utils/helper";

export default function MainRoute({ component: Component }: any) {
  const { globalState, globalDispatch } = UseGlobalContext();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      const token = getAuthuser();
      console.log({ token });
      if (token) {
        setLoading(true);
        window._token = token;
        execApi("/currentUser").then((response: IResponse) => {
          setLoading(false);
          if (response.error) {
            console.log("Invalid User" + response.message);

            return;
          }
          globalDispatch(Actions.setUser(response.data));
          globalDispatch(Actions.setLoggedIn(!!response.data));
        });
      }
    } catch (error) {
      setLoading(false);
    }
  }, []);
  if (loading) return <Spin />;
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute
          auth={{ user: globalState.loggedInUser }}
          exact
          path="/"
          component={Home}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/game/:gameId"
          component={Game}
        ></ProtectedRoute>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
      </Switch>
    </BrowserRouter>
  );
}
