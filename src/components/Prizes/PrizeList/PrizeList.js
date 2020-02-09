import React from "react";
import styles from "./PrizeList.module.css";
import Prize from "../Prize/Prize";

const PrizeList = ({ prizes, editPrize }) => {

  return (
    <div className={styles.PrizeList + " container-fluid"}>
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>NUMBER OF HITS</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {prizes ? (
            prizes.map(prize => {
              return (
                <Prize
                  key={prize.prizeId}
                  prizeId={prize.prizeId}
                  name={prize.name}
                  numberOfHits={prize.numberOfHits}
                  editPrize={editPrize}
                />
              );
            })
          ) : (
            <tr className={styles.UserList} colSpan="4">
              <td>There are no prizes.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PrizeList;
