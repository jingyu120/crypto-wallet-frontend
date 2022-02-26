import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../services/authContext";
import "./BuyButton.css";
import { useDispatch, useSelector } from "react-redux";
import { setBalance } from "../../redux/cryptoSlice";

function BuyButton({ coinProp, coinAmount }) {
  const { balance, cryptoList } = useSelector((state) => state.crypto);
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);

  const coinId = cryptoList.filter((c) => c.symbol === coinProp.coinSelected)[0]
    .id;
  let coinPrice = null;
  const buyCoin = () => {
    try {
      setProcessing(true);
      axios
        .get(`https://api.coinlore.net/api/ticker/?id=${coinId}`)
        .then((res) => {
          coinPrice = res.data[0].price_usd;
        })
        .then(() => {
          const data = {
            name: coinProp.coinSelected,
            amount: Number(coinAmount),
            cost: Number(coinAmount * coinPrice),
          };
          if (balance >= data.cost) {
            axios
              .post(
                `http://localhost:3001/api/user/${currentUser.email}/addCoin`,
                data
              )
              .then((res) => {
                dispatch(setBalance(res.data));
              });
          } else {
            alert("not enough balance");
          }

          setProcessing(false);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!processing) {
    return (
      <button className="buy-button" onClick={buyCoin}>
        Buy
      </button>
    );
  } else {
    return <>Processing</>;
  }
}

export default BuyButton;
