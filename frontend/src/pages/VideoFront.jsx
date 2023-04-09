import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Card from "react-animated-3d-card";
import AOS from "aos";
import "aos/dist/aos.css";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 100px;
  color: white;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 50px;
  background: linear-gradient(
    93.07deg,
    #f52af5 4.14%,
    #dd37f5 31.35%,
    #219bf2 73.51%,
    #00adf2 95.21%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 4px;
  font-family: "Holtwood One SC", serif;
  text-fill-color: transparent;
`;

const Wrapper = styled.div`
  width: fit-content;
  padding: 20px;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  margin: 100px auto;
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 200px;
`;

const BT = styled.h1`
  text-align: center;
  color: #ffff;
  letter-spacing: 4px;
  font-family: "Holtwood One SC", serif;
  font-size: 35px;
  text-transform: upperCase;
`;

const Content = styled.div`
  background: #272d3784;
  height: 100px;
  color: #c1d6ed;
  border-radius: 30px;
  padding: 15px;
  line-height: 1.3;
  font-family: "Alkatra", cursive;
  margin: 15px;
  font-size: 25px;
`;

const Image = styled.div`
  height: 300px;
  padding: 10px;
  gap: 20px;
`;

const VideoFront = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <Container>
      <Title>We provide State of the Art Solutions.</Title>
      <Wrapper>
        <div data-aos="fade-up">
          <Card
            style={{
              backgroundColor: "black",
              width: "600px",
              boxShadow: "10px 6px 20px 0 rgba(118, 173, 255, 0.805)",
              cursor: "pointer",
              transition: "all 350ms ease-in-out",
              overFlow: "hidden",
            }}
            onClick={() => {
              navigate("/uploada");
            }}
          >
            <Image>
              <img
                src={require("../assets/Seeker.png")}
                alt="nothing"
                height={370}
              />
            </Image>
            <BT>A-seekr</BT>
            <Content>
              With the increasing popularity of video-based learning, students
              are using videos more frequently as a primary source of
              information.
            </Content>
            <Link
              sx={{
                textDecoration: "none",
              }}
            >
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{
                  letterSpacing: 2,
                  backgroundImage:
                    "linear-gradient(126.21deg, #6A35EE 0%, #9930EF 14.24%, #5737EE 49.56%, #795CEB 93.2%);",
                  height: 50,
                  fontSize: 20,
                  textDecoration: "none",
                  fontFamily: "'Abril Fatface', cursive",
                  transition: "all 350ms ease-in-out",
                  ":hover": {
                    backgroundImage:
                      "linear-gradient(126.21deg, #6b46ca 0%, #9449d1 14.24%, #634ec9 49.56%, #664ec5 93.2%);",
                  },
                }}
              >
                Explore Now
              </Button>
            </Link>
          </Card>
        </div>
        <div data-aos="fade-up">
          <Card
            style={{
              backgroundColor: "black",
              width: "600px",
              boxShadow: "10px 6px 20px 0 rgba(255, 104, 252, 0.797)",
              cursor: "pointer",
              overFlow: "hidden",
            }}
            onClick={() => {
              navigate("/upload");
            }}
          >
            <Image>
              <img
                src={require("../assets/Seeker1.png")}
                alt="nothing"
                height={370}
              />
            </Image>
            <BT>I-seekr</BT>
            <Content>
              With the increasing popularity of video-based learning, students
              are using videos more frequently as a primary source of
              information.
            </Content>
            <Link
              sx={{
                textDecoration: "none",
              }}
            >
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{
                  backgroundImage:
                    "linear-gradient(126.21deg, #6A35EE 0%, #9930EF 14.24%, #5737EE 49.56%, #795CEB 93.2%);",
                  height: 50,
                  fontSize: 20,
                  fontFamily: "'Abril Fatface', cursive",
                  transition: "all 350ms ease-in-out",
                  ":hover": {
                    backgroundImage:
                      "linear-gradient(126.21deg, #7c48ff 0%, #9449d1 14.24%, #634ec9 49.56%, #664ec5 93.2%);",
                  },
                }}
              >
                Explore Now
              </Button>
            </Link>
          </Card>
        </div>
      </Wrapper>
      <div id="watch"></div>
    </Container>
  );
};

export default VideoFront;
