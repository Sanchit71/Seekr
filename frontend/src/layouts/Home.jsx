import HeadContent from "../pages/HeadContent";
import ProblemS from "../pages/ProblemS";
import { useSelector } from "react-redux";
import VideoFront from "../pages/VideoFront";
import Watch from "../pages/WatchLive";
import Nav from "../components/Nav";
import ContactUs from "../pages/ContactUs";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {console.log(currentUser)}
      <HeadContent />
      <Nav />
      <ProblemS />
      {currentUser && <VideoFront />}
      <Watch />
      <ContactUs />
    </>
  );
};

export default Home;
