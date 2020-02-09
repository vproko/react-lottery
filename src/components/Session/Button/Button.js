import React, { useContext } from "react";
import styles from "./Button.module.css";
import { SessionContext } from "../../../contexts/SessionContext";

const Button = () => {
  const { activeSession, startSession, endSession, loading } = useContext(SessionContext);
  
  return (
    <div className={styles.Button}>
      {activeSession ? (
        <button className={styles.Button} onClick={endSession}>
          END SESSION
        </button>
      ) : (
        <button className={styles.Button} onClick={startSession}>
          START SESSION
        </button>
      )}
      <br />
      <br />
      {loading ? (
        <div className={styles.Roller}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : null}
    </div>
  );
};

export default Button;
