import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import Home from "./components/home/Home";
import Portfolio from "./components/portfolio/Portfolio";
import Login from "./authentication/Login";
import { auth } from "./authentication/Firebase";
import Registration from "./authentication/Registration";
import { AuthContext } from "./services/authContext";
import Balance from "./components/balance/Balance";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setBalance } from "./redux/cryptoSlice";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { balance } = useSelector((state) => state.crypto);
  const dispatch = useDispatch();

  useEffect(() => {
    currentUser &&
      axios
        .get(`http://localhost:3001/api/user/${currentUser.email}/balance`)
        .then((res) => dispatch(setBalance(res.data)));
  }, [currentUser, dispatch]);

  return (
    <div className="App">
      <Router>
        <nav>
          <></>
          <div className="center-nv">
            <Link to="/">Home</Link>
            {currentUser && <Link to="/portfolio">Portfolio</Link>}
            {currentUser ? (
              <button className="logout-btn" onClick={() => auth.signOut()}>
                Log Out {currentUser.email}
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
          <div className="right-nav">
            {currentUser && (
              <Link to="/balance">
                Current Balance: ${Number(balance).toFixed(2)}{" "}
              </Link>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/portfolio"
            element={<Portfolio currentUser={currentUser} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/balance" element={<Balance />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
