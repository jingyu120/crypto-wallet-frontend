import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../services/authContext";
import { useDispatch, useSelector } from "react-redux";
import { setBalance } from "../../redux/cryptoSlice";

function SellButton({ coinProp, coinAmount }) {
  const { currentUser } = useContext(AuthContext);
  const { cryptoList } = useSelector((state) => state.crypto);
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const cryptoId = cryptoList.filter(
    (c) => c.symbol === coinProp.coinSelected
  )[0].id;

  let coinPrice = null;
  const sellCoin = () => {
    if (coinAmount > coinProp.coinTotal) {
      alert("Not enough coins in wallet.");
    } else {
      try {
        setProcessing(true);
        axios
          .get(`https://api.coinlore.net/api/ticker/?id=${cryptoId}`)
          .then((res) => {
            coinPrice = res.data[0].price_usd;
          })
          .then(() => {
            const data = {
              name: coinProp.coinSelected,
              amount: Number(coinAmount),
              cost: Number(coinAmount * coinPrice),
            };
            axios
              .post(
                `http://localhost:3001/api/user/${currentUser.email}/sellCoin`,
                data
              )
              .then((res) => dispatch(setBalance(res.data)));
            setProcessing(false);
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  if (!processing) {
    return <button onClick={sellCoin}>Sell</button>;
  } else {
    return <>Processing</>;
  }
}

export default SellButton;
