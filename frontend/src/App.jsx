import Preloader from "./Preloader";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

function App() {
  const [signup, setsignUP] = useState(false);
  const [loginup, setloginUP] = useState(false);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 3400);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <BrowserRouter>
            <Navbar setsign={setsignUP} setlogin={setloginUP} />
            <Routes>
              <Route></Route>
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
