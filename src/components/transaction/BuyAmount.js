import React, { useEffect, useState } from "react";
import BuyButton from "./BuyButton";

export default function BuyAmount({ coinCost, coinName }) {
  const [totalCost, setTotalCost] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [coinProp, setCoinProp] = useState({
    coinSelected: coinName,
    modalOpen: false,
    transaction: "Buy",
    coinTotal: null,
  });

  useEffect(() => {
    setTotalCost(quantity * coinCost);
    setCoinProp((prev) => ({
      ...prev,
      coinTotal: quantity,
    }));
  }, [coinCost, quantity]);

  return (
    <>
      <td>
        <div className="amount-container">
          <input
            placeholder="amount"
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
          />
          <BuyButton coinProp={coinProp} coinAmount={quantity} />
        </div>
      </td>
      <td>${totalCost}</td>
    </>
  );
}
