import Preloader from "./Preloader";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { useSelector } from "react-redux";
import Error from "./pages/Error";
import Upload from "./components/Upload";
import About from "./auth/About";
import PlayVideo from "./components/PlayVideo";
import Home from "./layouts/Home";
import UploadA from "./components/UploadA";
import History from "./layouts/History";

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
              {currentUser && <Route path="/history" element={<History />} />}
              {currentUser && (
                <Route
                  path="/upload"
                  element={!currentVideo ? <Upload /> : <PlayVideo />}
                />
              )}
              {currentUser && (
                <Route
                  path="/uploada"
                  element={!currentVideo ? <UploadA /> : <PlayVideo />}
                />
              )}
              <Route path="/about/:id" element={<About />} />
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
