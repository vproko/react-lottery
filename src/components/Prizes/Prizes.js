import React, { useContext, useEffect, useState } from "react";
import styles from "./Prizes.module.css";
import PrizeList from "./PrizeList/PrizeList";
import { PrizeContext } from "../../contexts/PrizeContext";

const Prizes = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [prizeId, setPrizeId] = useState(``);
  const [numberOfHits, setNumberOfHits] = useState(1);
  const [prizeName, setPrizeName] = useState(``);
  const {prizes, createPrize, updatePrize, prizesCount, message, clearMessage, loading} = useContext(PrizeContext);

  const showForm = () => {
    clearMessage();
    setToggleForm(true);
    setEditForm(false);
  };

  const clearForm = () => {
    setPrizeId(``);
    setPrizeName(``);
    setNumberOfHits(1);
    setToggleForm(false);
    setEditForm(false);
  };

  const addPrize = event => {
    event.preventDefault();
    createPrize(prizeName, numberOfHits);
    clearForm();
  };

  const editPrize = (prizeId, name, numOfHits) => {
    clearMessage();
    setToggleForm(true);
    setEditForm(true);
    setPrizeId(prizeId);
    setPrizeName(name);
    setNumberOfHits(numOfHits);
  };

  const updatePrizeHandler = event => {
    event.preventDefault();
    let data = {
      PrizeId: prizeId,
      Name: prizeName,
      NumberOfHits: numberOfHits
    };

    updatePrize(data);
    clearForm();
  };

  useEffect(clearForm, [prizesCount]);
  useEffect(clearMessage, []);

  return (
    <div className={styles.Prizes + " container-fluid"}>
      <br />
      <br />
      <h1>PRIZE LIST</h1>
      {prizesCount === 0 ? (
        <h3>There are no prizes</h3>
      ) : (
        <PrizeList prizes={prizes} editPrize={editPrize} />
      )}
      <br />
      <br />
      {toggleForm ? (
        <div className="mx-auto col-10 col-sm-6 col-md-4 col-lg-4">
          <form>
            <div className="form-group">
              <label htmlFor="name">NAME OF THE PRIZE</label>
              <br />
              <input
                className="form-control"
                name="name"
                type="text"
                value={prizeName}
                onChange={event => setPrizeName(event.target.value)}
              />
              <br />
              <label htmlFor="hits">NUMBER OF HITS</label>
              <br />
              <input
                className="form-control"
                name="hits"
                type="number"
                min="1"
                max="7"
                value={numberOfHits}
                onChange={event => setNumberOfHits(event.target.value)}
              />
              <br />
              <br />
              <div className="form-row">
                <div className="mx-auto">
                  {editForm ? (
                    <button
                      type="button"
                      className={styles.Add + " form-control"}
                      onClick={updatePrizeHandler}
                    >
                      EDIT PRIZE
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.Add + " form-control"}
                      onClick={addPrize}
                    >
                      ADD PRIZE
                    </button>
                  )}
                  <br />
                  <button
                    type="button"
                    className={styles.Cancel + " form-control"}
                    onClick={clearForm}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <button className={styles.AddPrize} onClick={showForm}>
          ADD
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
      <h2 className={message ? styles.Result : "d-none"}>{message}</h2>
    </div>
  );
};

export default Prizes;
