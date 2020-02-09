import React, { useContext } from "react";
import Details from "./Details/Details";
import styles from "./Session.module.css";
import { SessionContext } from "../../contexts/SessionContext";
import Button from "./Button/Button";

const Session = () => {
  const { activeSession, activeSessionResponse } = useContext(SessionContext);

  return (
    <div className={styles.Session}>
      <br />
      <br />
      <h1>{activeSession ? `CURRENT SESSION` : activeSessionResponse}</h1>
      <Details />
      <br />
      <br />
      <Button />
      <br />
    </div>
  );
};

export default Session;
