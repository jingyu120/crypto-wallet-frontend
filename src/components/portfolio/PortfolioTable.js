import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../services/authContext";
import Modal from "./Modal";
import "./PortfolioTable.css";

function PortfolioTable() {
  const [wallet, setWallet] = useState();
  const [modal, setModal] = useState({
    coinSelected: null,
    modalOpen: false,
    transaction: null,
    coinTotal: null,
  });

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user/getCoins", {
        params: {
          email: currentUser.email,
        },
      })
      .then((response) => {
        setWallet(response.data);
      });

    // eslint-disable-next-line
  }, [modal.modalOpen]);
  return (
    <div className="portfolio-table">
      <table>
        <thead>
          <tr>
            <td>Symbol</td>
            <td>Amount</td>
            <td>Cost</td>
            <td>Buy/Sell</td>
            {/* <td>Total</td> */}
          </tr>
        </thead>
        <tbody>
          {wallet &&
            wallet.map((coin) => {
              return (
                <tr key={coin._id}>
                  <td>{coin.name}</td>
                  <td>{coin.amount}</td>
                  <td>{coin.cost.toFixed(2)}</td>
                  <td>
                    {modal.modalOpen && (
                      <Modal setOpenModal={setModal} coinProp={modal} />
                    )}
                    <button
                      className="openModalBtn buy"
                      onClick={() =>
                        setModal((prev) => ({
                          ...prev,
                          modalOpen: true,
                          coinSelected: coin.name,
                          transaction: "Buy",
                          coinTotal: coin.amount,
                        }))
                      }
                    >
                      Buy
                    </button>
                    <button
                      className="openModalBtn sell"
                      onClick={() =>
                        setModal((prev) => ({
                          ...prev,
                          modalOpen: true,
                          coinSelected: coin.name,
                          transaction: "Sell",
                          coinTotal: coin.amount,
                        }))
                      }
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default PortfolioTable;
