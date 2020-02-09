import React from "react";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
import RegisterAdmin from "./components/RegisterAdmin/RegisterAdmin";
import Session from "./components/Session/Session";
import Draw from "./components/Draw/Draw";
import Ticket from "./components/Ticket/Ticket";
import Profile from "./components/Profile/Profile";
import Prizes from "./components/Prizes/Prizes";
import styles from "./App.module.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import SessionContextProvider from "./contexts/SessionContext";
import UserContextProvider from "./contexts/UserContext";
import PrizeContextProvider from "./contexts/PrizeContext";
import PrivateRouteAdmins from "./hoc/PrivateRouteAdmins";
import PrivateRouteUsers from "./hoc/PrivateRouteUsers";
import PrivateRoute from "./hoc/PrivateRoute";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <SessionContextProvider>
          <AuthContextProvider>
            <PrizeContextProvider>
              <Nav />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <PrivateRouteUsers path="/ticket">
                  <Ticket />
                </PrivateRouteUsers>
                <PrivateRoute path="/profile">
                  <Profile />
                </PrivateRoute>
                <UserContextProvider>
                  <PrivateRouteAdmins exact path="/prizes">
                    <Prizes />
                  </PrivateRouteAdmins>
                  <PrivateRouteAdmins exact path="/users">
                    <Users />
                  </PrivateRouteAdmins>
                  <PrivateRouteAdmins path="/admin/register">
                    <RegisterAdmin />
                  </PrivateRouteAdmins>
                  <PrivateRouteAdmins path="/session">
                    <Session />
                  </PrivateRouteAdmins>
                  <PrivateRouteAdmins path="/draw">
                    <Draw />
                  </PrivateRouteAdmins>
                </UserContextProvider>
                <Route path="*" component={Home} />
              </Switch>
            </PrizeContextProvider>
          </AuthContextProvider>
        </SessionContextProvider>
      </div>
    </Router>
  );
}

export default App;
