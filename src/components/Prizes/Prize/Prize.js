import React, { useContext } from "react";
import styles from "./Prize.module.css";
import { PrizeContext } from "../../../contexts/PrizeContext";

const Prize = ({ prizeId, name, numberOfHits, editPrize }) => {
  const { deletePrizeById } = useContext(PrizeContext);

  return (
    <tr className={styles.Prize}>
      <td>{name}</td>
      <td>{numberOfHits}</td>
      <td
        className={styles.edit}
        onClick={() => editPrize(prizeId, name, numberOfHits)}
      >
        EDIT
      </td>
      <td className={styles.delete} onClick={() => deletePrizeById(prizeId)}>
        DELETE
      </td>
    </tr>
  );
};

export default Prize;
