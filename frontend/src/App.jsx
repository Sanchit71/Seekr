import Preloader from "./Preloader";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { useSelector } from "react-redux";
import Error from "./pages/Error";
import Home from "./layouts/Home";

function App() {
  const [signup, setsignUP] = useState(false);
  const [loginup, setloginUP] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

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
              <Route path="/" element={<Home />} exact />
              <Route path="*" element={<Error />} />
            </Routes>
            {loginup && <Login loginup={signup} setlogin={setloginUP} />}
            {signup && <Signup signup={signup} setsign={setsignUP} />}
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
