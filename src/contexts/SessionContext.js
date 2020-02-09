import React, { createContext, useState } from "react";
import axios from "axios";

export const SessionContext = createContext();

const SessionContextProvider = props => {

  const [sessionId, setSessionId] = useState(``);
  const [startDate, setStartDate] = useState(``);
  const [endDate, setEndDate] = useState(``);
  const [tickets, setTickets] = useState([]);
  const [activeSession, setActiveSession] = useState(false);
  const [activeSessionResponse, setActiveSessionResponse] = useState(``);
  const [loading, setLoading] = useState(false);

  const checkActiveSession = async () => {

    await axios
        .get(`http://localhost:54637/api/user/session/active`)
        .then(response => activeSessionInfo(response))
        .catch(error => setActiveSessionResponse(error.response.data));
  };

  const startSession = async () => {
    setLoading(true);
    await axios
      .post(`http://localhost:54637/api/admin/session`, null, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(response => {
        setLoading(false);
        activeSessionInfo(response);
      })
      .catch(error => {
        setLoading(false);
        setActiveSessionResponse(error.response.data);
      });
  };

  const endSession = async () => {
    setLoading(true)
    await axios
      .post(
        `http://localhost:54637/api/admin/end?sessionId=${sessionId}`,
        null,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      )
      .then(response => {
        setLoading(false);
        inactiveSession(response);
      })
      .catch(error => {
        setLoading(false);
        setActiveSessionResponse(error.response.data);
      });
  };

  const activeSessionInfo = response => {
    setActiveSession(true);
    setSessionId(response.data.sessionId);
    setStartDate(response.data.startDate);
    setEndDate(response.data.endDate);
    setTickets([...response.data.tickets]);
  };

  const inactiveSession = response => {
    setSessionId(``);
    setStartDate(``);
    setEndDate(``);
    setTickets(``);
    setActiveSession(false);
    setActiveSessionResponse(response.data);
  };

  return (
    <SessionContext.Provider
      value={{
        activeSession,
        setActiveSession,
        startDate,
        endDate,
        tickets,
        startSession,
        endSession,
        activeSessionInfo,
        activeSessionResponse,
        setActiveSessionResponse,
        checkActiveSession,
        loading
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
