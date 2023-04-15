import React from "react";
import styled from "styled-components";
import Wave from "react-wavify";
import Card from "react-animated-3d-card";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 70px;
  background: linear-gradient(
    93.07deg,
    #f52af5 4.14%,
    #dd37f5 31.35%,
    #219bf2 73.51%,
    #00adf2 95.21%
  );
  margin-top: 200px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 4px;
  font-family: "Holtwood One SC", serif;
  text-fill-color: transparent;
`;

const Image = styled.div`
  width: 600px;
  height: 600px;
  padding: 20px;
  gap: 20px;
`;

const Content = styled.div`
  color: #adb9c7;
  padding: 20px;
  height: 410px;
  flex: 1.5;
  line-height: 1.3;
  width: 1000px;
  font-family: "Alkatra", cursive;
  font-size: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 30px;
  margin: 100px;
  align-items: center;
  justify-content: center;
`;

const ProblemS = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <>
      <Container>
        <Title>Mission statement</Title>
        <Wrapper>
          <Image>
            <img
              src={require("../assets/Problem.png")}
              alt="nothing"
              height={650}
              data-aos="fade-right"
            />
          </Image>
          <Card
            style={{
              background: "#272d3784",
              overFlow: "hidden",
              height: 600,
            }}
          >
            <Content>
              <span>
                With the increasing popularity of video-based learning, students
                are using videos more frequently as a primary source of
                information. However, searching for specific information within
                a video can be
                <span style={{ color: "#BC4873" }}>
                  {" "}
                  time-consuming and frustrating
                </span>
                , as traditional video search methods are often not very
                efficient.
              </span>
              <br />
              <br />
              <span>
                Also, traditional content search methods often rely on manual
                tagging or transcription, which can be{" "}
                <span style={{ color: "#BC4873" }}>prone to errors.</span>
              </span>
              <br />
              <br />
              <span>
                Thus, there is a need for a{" "}
                <span style={{ color: "#BC4873" }}>
                  more efficient and user-friendly method
                </span>
                &nbsp; of searching inside videos using natural language, which
                can provide accurate and relevant results to the users.
              </span>
              <br />
            </Content>
            <Wave
              fill="#1ca2c088"
              paused={false}
              options={{
                height: 20,
                amplitude: 20,
                speed: 0.15,
                points: 3,
              }}
            />
          </Card>
        </Wrapper>
        <div id="action"></div>
      </Container>
    </>
  );
};

export default ProblemS;
