import React, { useState } from "react";
import BuyButton from "../transaction/BuyButton";
import SellButton from "../transaction/SellButton";
import "./Modal.css";

function Modal({ setOpenModal, coinProp }) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal((prev) => ({
                ...prev,
                modalOpen: false,
              }));
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>{coinProp.transaction + " " + coinProp.coinSelected}</h1>
          <h2>Coin Amount: {coinProp.coinTotal}</h2>
        </div>
        <div className="body">
          <input
            className="transaction-input"
            placeholder="Amount"
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
          ></input>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          {coinProp.transaction === "Buy" ? (
            <BuyButton coinProp={coinProp} coinAmount={quantity} />
          ) : null}
          {coinProp.transaction === "Sell" ? (
            <SellButton coinProp={coinProp} coinAmount={quantity} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Modal;
