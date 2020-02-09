import React, { useState, useContext } from "react";
import styles from "./Ticket.module.css";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { SessionContext } from "../../contexts/SessionContext";

const Ticket = () => {
  const { user } = useContext(AuthContext);
  const { activeSession } = useContext(SessionContext);

  const [response, setResponse] = useState();
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [num3, setNum3] = useState(1);
  const [num4, setNum4] = useState(1);
  const [num5, setNum5] = useState(1);
  const [num6, setNum6] = useState(1);
  const [num7, setNum7] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleField1 = e => setNum1(valueController(e.target.value));
  const handleField2 = e => setNum2(valueController(e.target.value));
  const handleField3 = e => setNum3(valueController(e.target.value));
  const handleField4 = e => setNum4(valueController(e.target.value));
  const handleField5 = e => setNum5(valueController(e.target.value));
  const handleField6 = e => setNum6(valueController(e.target.value));
  const handleField7 = e => setNum7(valueController(e.target.value));

  const valueController = number => {
    let value = number.length < 2 ? number : number.slice(0, 2);
    if (parseInt(value) < 1) value = 1;
    if (parseInt(value) > 37) value = 37;
    return value;
  };

  const sortNumbers = numbers => {
    return new Promise(resolve => {
      resolve(numbers.sort((a, b) => a - b));
    });
  };

  const send = async () => {
    let numbers = [num1, num2, num3, num4, num5, num6, num7];
    if (numbers.includes("")) {
      return setResponse(`Please fill all of the fields with numbers.`);
    }
    let sorted = await sortNumbers(numbers);
    let check = [...new Set(sorted)];
    if (check.length === numbers.length) {
      let data = {
        TicketId: "00000000-0000-0000-0000-000000000000",
        CreateDate: new Date(),
        Numbers: sorted.join(", ").toString(),
        UserId: user.userId,
        SessionId: "00000000-0000-0000-0000-000000000000"
      };
      setResponse(``);
      setLoading(true);
      axios
        .post(`http://localhost:54637/api/user/ticket`, data, {
          headers: { Authorization: "Bearer " + user.token }
        })
        .then(response => {
          setLoading(false);
          setResponse(response.data);
        })
        .catch(error => {
          setLoading(false);
          setResponse(error.response.data);
        });
    } else {
      return setResponse(`No duplicates are allowed.`);
    }
  };

  return (
    <React.Fragment>
      <br />
      <br />
      <h1>
        {activeSession
          ? `Choose your lucky numbers. Good Luck!`
          : `Sorry, we don't accept tickets at the moment.`}
      </h1>
      <br />
      <div className={styles.Ticket}>
        <input
          type="number"
          value={num1}
          onChange={handleField1}
          disabled={activeSession ? false : true}
        />
        <input
          type="number"
          value={num2}
          onChange={handleField2}
          disabled={activeSession ? false : true}
        />
        <input
          type="number"
          value={num3}
          onChange={handleField3}
          disabled={activeSession ? false : true}
        />
        <input
          type="number"
          value={num4}
          onChange={handleField4}
          disabled={activeSession ? false : true}
        />
        <input
          type="number"
          value={num5}
          onChange={handleField5}
          disabled={activeSession ? false : true}
        />
        <input
          type="number"
          value={num6}
          onChange={handleField6}
          disabled={activeSession ? false : true}
        />
        <input
          type="number"
          value={num7}
          onChange={handleField7}
          disabled={activeSession ? false : true}
        />
        <br />
        <br />
        <br />
        <button
          className={styles.Send}
          onClick={send}
          disabled={activeSession ? false : true}
        >
          Send
        </button>
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
      <br />
      <h2 className={response ? styles.Result : "d-none"}>{response}</h2>
    </React.Fragment>
  );
};

export default Ticket;
