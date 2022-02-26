import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PortfolioTable from "./PortfolioTable";

export default function Portfolio({ currentUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      axios.get(
        `https://mern-crypto-wallet.herokuapp.com/api/user/${currentUser.email}/networth`
      );
    }
    // eslint-disable-next-line
  }, [currentUser]);
  return (
    <div>
      <h1> Portfolio Networth: </h1>
      <PortfolioTable />
    </div>
  );
}
