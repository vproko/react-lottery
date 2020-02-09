import React, { useState } from "react";
import styles from "./Home.module.css";
import axios from "axios";

const Home = () => {
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [num3, setNum3] = useState(1);
  const [num4, setNum4] = useState(1);
  const [num5, setNum5] = useState(1);
  const [num6, setNum6] = useState(1);
  const [num7, setNum7] = useState(1);
  const [winner, setWinner] = useState({});
  const [gotWinner, setGotWinner] = useState(false);
  const [response, setResponse] = useState(``);
  const [loading, setLoading] = useState(false);

  const handleField1 = e => setNum1(valueController(e.target.value));
  const handleField2 = e => setNum2(valueController(e.target.value));
  const handleField3 = e => setNum3(valueController(e.target.value));
  const handleField4 = e => setNum4(valueController(e.target.value));
  const handleField5 = e => setNum5(valueController(e.target.value));
  const handleField6 = e => setNum6(valueController(e.target.value));
  const handleField7 = e => setNum7(valueController(e.target.value));

  const valueController = number => {
    let value = parseInt(number.length < 2 ? number : number.slice(0, 2));
    if (parseInt(value) < 1) value = 1;
    if (parseInt(value) > 37) value = 37;
    return value;
  };

  const sortNumbers = numbers => {
    return new Promise(resolve => {
      resolve(numbers.sort((a, b) => a - b));
    });
  };

  const check = async () => {
    setResponse(``);
    setWinner({});
    setGotWinner(false);
    let numbers = [num1, num2, num3, num4, num5, num6, num7];
    if (numbers.includes("")) {
      return setResponse(`Please fill all of the fields with numbers.`);
    }
    let sorted = await sortNumbers(numbers);
    let check = [...new Set(sorted)];
    if (check.length === numbers.length) {
      let data = sorted.join(", ").toString();
      setLoading(true);
      await axios
        .post(`http://localhost:54637/api/user/check?numbers=${data}`)
        .then(response => {
          setLoading(false);
          setWinner({ ...response.data });
          setGotWinner(true);
        })
        .catch(error => {
          setLoading(false);
          setGotWinner(false);
          setResponse(error.response.data);
        });
    } else {
      setResponse(`Remove the duplicates.`);
    }
  };

  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <h1>WELCOME TO LOTTERY</h1>
      <h2>YOU HAVE A TICKET? CHECK YOUR LUCKY NUMBERS</h2>
      <br />
      <div className={styles.Home}>
        <input type="number" value={num1} onChange={handleField1} />
        <input type="number" value={num2} onChange={handleField2} />
        <input type="number" value={num3} onChange={handleField3} />
        <input type="number" value={num4} onChange={handleField4} />
        <input type="number" value={num5} onChange={handleField5} />
        <input type="number" value={num6} onChange={handleField6} />
        <input type="number" value={num7} onChange={handleField7} />
        <br />
        <br />
        <br />
        <button className={styles.Check} type="button" onClick={check}>
          CHECK
        </button>
      </div>
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
      {gotWinner ? (
        <div className={winner ? styles.Result : "d-none"}>
          <br />
          <h2>Congratulations!</h2>
          <h3>The winning numbers: {winner.winningNumbers}</h3>
          <h3>The prize: {winner.prize}</h3>
        </div>
      ) : (
        <div className={response ? styles.Result : "d-none"}>
          <br />
          <h2>{response}</h2>
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
