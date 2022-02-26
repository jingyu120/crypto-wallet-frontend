import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../services/authContext";
import "./Balance.css";
import { useDispatch, useSelector } from "react-redux";
import { setBalance } from "../../redux/cryptoSlice";

function Balance() {
  const [amount, setAmount] = useState(null);
  const [transaction, setTransaction] = useState("+");
  const { balance } = useSelector((state) => state.crypto);
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);

  const postTransaction = (trsx) => {
    if (trsx === "+") {
      axios
        .post(
          `http://localhost:3001/api/user/${currentUser.email}/depositCash/${amount}`
        )
        .then((res) => {
          if (res.status === 200) {
            dispatch(setBalance(res.data));
            alert("Deposit Successful");
          } else {
            alert("Deposit Unsuccessful");
          }
        });
    } else if (trsx === "-") {
      axios
        .post(
          `http://localhost:3001/api/user/${currentUser.email}/withdrawCash/${amount}`
        )
        .then((res) => {
          if (res.status === 200) {
            dispatch(setBalance(res.data));
            alert("Withdraw Successful");
          } else {
            alert("Withdraw Unsuccessful");
          }
        });
    } else {
      alert("invalid transaction method.");
    }
  };
  const submitTransaction = () => {
    if (transaction === "+") {
      postTransaction("+");
    } else if (transaction === "-") {
      if (Number(amount) > balance) {
        alert("Not enough for a withdraw.");
      } else {
        postTransaction("-");
      }
    } else {
      alert("transaction is not + or -");
    }
  };
  return (
    <div className="balance_input">
      <label>Amount</label>
      <input
        placeholder="Amount in USD"
        type="number"
        onChange={(event) => setAmount(event.target.value)}
      ></input>
      <select
        value={transaction}
        onChange={(event) => setTransaction(event.target.value)}
      >
        <option value="+">Deposit</option>
        <option value="-">Withdraw</option>
      </select>
      <button onClick={submitTransaction}>Submit</button>
    </div>
  );
}

export default Balance;
