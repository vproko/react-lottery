import React, { useContext } from "react";
import styles from "./Details.module.css";
import { SessionContext } from "../../../contexts/SessionContext";

const Details = () => {
  const { activeSession, startDate, endDate, tickets } = useContext(SessionContext);

  return (
    <div className={styles.Details}>
      <br />
      <table>
        <thead>
          <tr>
            <th>START DATE</th>
            <th>END DATE</th>
            <th>TICKETS</th>
          </tr>
        </thead>
        <tbody>
          {activeSession ? (
            <tr>
              <td>{startDate.replace(/-/g, "/").slice(0, 10)}</td>
              <td>{endDate.replace(/-/g, "/").slice(0, 10)}</td>
              <td>{tickets.length}</td>
            </tr>
          ) : (
            <tr>
              <td className={styles.center} colSpan="3">
                There's no active session.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Details;
