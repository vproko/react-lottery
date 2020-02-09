import React, { useState, useContext } from "react";
import styles from "./Draw.module.css";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { SessionContext } from "../../contexts/SessionContext";

const Draw = () => {
  const { user } = useContext(AuthContext);
  const { activeSession, setActiveSession } = useContext(SessionContext);

  const [response, setResponse] = useState();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);
  const [num5, setNum5] = useState(0);
  const [num6, setNum6] = useState(0);
  const [num7, setNum7] = useState(0);

  const handleField1 = e => setNum1(parseInt(e.target.value));
  const handleField2 = e => setNum2(parseInt(e.target.value));
  const handleField3 = e => setNum3(parseInt(e.target.value));
  const handleField4 = e => setNum4(parseInt(e.target.value));
  const handleField5 = e => setNum5(parseInt(e.target.value));
  const handleField6 = e => setNum6(parseInt(e.target.value));
  const handleField7 = e => setNum7(parseInt(e.target.value));

  const generateLuckyNumbers = async () => {
    return new Promise(resolve => {
      let count = 0;
      let numbers = [];

      while (count < 7) {
        let luckyNumber = Math.ceil(Math.random() * 37);
        if (numbers.indexOf(luckyNumber) === -1) {
          numbers.push(luckyNumber);
          count++;
        }
      }

      resolve(numbers.sort((a, b) => a - b));
    });
  };

  const displayNumbers = numbers => {
    return new Promise(resolve => {
      const setters = [
        setNum1,
        setNum2,
        setNum3,
        setNum4,
        setNum5,
        setNum6,
        setNum7
      ];
      let index = 0;
      let timer = setInterval(() => {
        if (index < 7) {
          setters[index](numbers[index]);
          index++;
        } else {
          resolve(clearInterval(timer));
        }
      }, 900);
    });
  };

  const displayMessage = message => {
    return new Promise(resolve => {
      resolve(setResponse(message));
    });
  };

  const displayResult = async (numbers, message) => {
    await displayNumbers(numbers);
    await displayMessage(message);
  };

  const drawNumbers = async () => {
    let numbers = await generateLuckyNumbers();

    let data = {
      DrawId: "00000000-0000-0000-0000-000000000000",
      Date: new Date(),
      DrawnNumbers: numbers.join(", ").toString(),
      SessionId: "00000000-0000-0000-0000-000000000000"
    };

    await axios
      .post(`http://localhost:54637/api/admin/draw`, data, {
        headers: { Authorization: "Bearer " + user.token }
      })
      .then(response => {
        setActiveSession(false);
        displayResult(numbers, response.data);
      })
      .catch(error => setResponse(error.response.data));
  };

  return (
    <React.Fragment>
      <br />
      <br />
      <h1>{activeSession ? `DRAW NUMBERS` : `There's no active session.`}</h1>
      <br />
      <div className={styles.Number}>
        <div onChange={handleField1}>{num1}</div>
        <div onChange={handleField2}>{num2}</div>
        <div onChange={handleField3}>{num3}</div>
        <div onChange={handleField4}>{num4}</div>
        <div onChange={handleField5}>{num5}</div>
        <div onChange={handleField6}>{num6}</div>
        <div onChange={handleField7}>{num7}</div>
      </div>
      <br />
      <br />
      <button
        className={styles.Draw}
        type="button"
        onClick={drawNumbers}
        disabled={activeSession ? false : true}
      >
        DRAW
      </button>
      <br />
      <br />
      <h3 className={response ? styles.Result : "d-none"}>{response}</h3>
    </React.Fragment>
  );
};

export default Draw;
