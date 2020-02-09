import React, { createContext, useState } from "react";
import axios from "axios";

export const PrizeContext = createContext();

const PrizeContextProvider = props => {

  const [prizes, setPrizes] = useState([]);
  const [prizesCount, setPrizesCount] = useState(0);
  const [message, setMessage] = useState(``);
  const [loading, setLoading] = useState(false);

  const getAllPrizes = () => {
    axios
      .get(`http://localhost:54637/api/admin/prizes`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(response => {
        setPrizes([
          ...response.data.sort((a, b) =>
            a.numberOfHits < b.numberOfHits ? 1 : -1
          )
        ]);
        setPrizesCount(response.data.length);
      })
      .catch(error => {
        setMessage(error.response.data);
      });
  };

  const createPrize = (name, numOfHits) => {
    let data = {
      PrizeId: "00000000-0000-0000-0000-000000000000",
      Name: name,
      NumberOfHits: numOfHits
    };
    setMessage(``);
    setLoading(true);
    axios
      .post(`http://localhost:54637/api/admin/prize/create`, data, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(response => {
        setLoading(false);
        getAllPrizes();
        setMessage(response.data);
      })
      .catch(error => {
        setLoading(false);
        setMessage(error.response.data);
      });
  };

  const updatePrize = data => {
    setMessage(``);
    setLoading(true);
    axios
      .post(`http://localhost:54637/api/admin/prize/update`, data, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(response => {
        setLoading(false);
        getAllPrizes();
        setMessage(response.data);
      })
      .catch(error => {
        setLoading(false);
        setMessage(error.response.data);
      });
  };

  const deletePrizeById = prizeId => {
    setMessage(``);
    setLoading(true);
    axios
      .post(
        `http://localhost:54637/api/admin/prize/delete/?prizeId=${prizeId}`,
        null,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      )
      .then(response => {
        setLoading(false);
        getAllPrizes();
        setMessage(response.data);
      })
      .catch(error => {
        setLoading(false);
        setMessage(error.response.data);
      });
  };

  const clearMessage = () => setMessage(``);

  return (
    <PrizeContext.Provider
      value={{
        getAllPrizes,
        createPrize,
        updatePrize,
        prizes,
        prizesCount,
        deletePrizeById,
        clearMessage,
        message,
        loading
      }}
    >
      {props.children}
    </PrizeContext.Provider>
  );
};

export default PrizeContextProvider;
