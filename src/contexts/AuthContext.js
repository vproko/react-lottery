import React, { createContext, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SessionContext } from "./SessionContext";

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);
  const [isItUser, setIsItUser] = useState(false);

  const { setActiveSession } = useContext(SessionContext);

  const history = useHistory();

  const redirect = role => {
    setAuth(true);
    if (role === `User`) {
      return history.push("/ticket");
    } else {
      return history.push("/session");
    }
  };

  const usersRole = role => {
    if (role === `Admin`) {
      setAdmin(true);
    }
    if (role === `User`) {
      setIsItUser(true);
    }
  };

  const setUserAndRole = response => {
    setUser(response.data);
    usersRole(response.data.role);
    redirect(response.data.role);
    localStorage.setItem("token", response.data.token);
  };

  const logOut = () => {
    setActiveSession(false);
    setAuth(false);
    setUser({});
    setAdmin(false);
    setIsItUser(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        admin,
        isItUser,
        user,
        logOut,
        setUser,
        setAuth,
        setAdmin,
        setIsItUser,
        setUserAndRole,
        usersRole
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
