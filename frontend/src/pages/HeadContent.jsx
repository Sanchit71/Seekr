import React from "react";
import styled from "styled-components";
import MyComponent from "./Vanta";
import Typewriter from "react-ts-typewriter";
import { useSelector } from "react-redux";

const Container = styled.div`
  margin-top: 80px;
  width: 100%;
  color: white;
`;
const Wrapper = styled.div`
  padding: 10px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  width: 682px;
  font-size: 60px;
  line-height: 105px;
`;

const Content = styled.div`
  width: 800px;
  font-size: 26px;
  line-height: 35px;
  font-weight: 600;
  font-family: "Cinzel Decorative", cursive;
  color: #adb9c7;
`;

const HeadContent = () => {
  const hover = useSelector((state) => state.user.hover);
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);
  return (
    <Container>
      <Wrapper>
        <Title>
          <h1
            style={{
              margin: "10px",
            }}
          >
            Discover a New <span style={{ color: "#9f355c" }}>Era</span> of
            Learning
          </h1>
        </Title>
        {hover ? (
          <Content
            style={{
              border: "2px solid #BC4873",
              padding: "20px",
              lineHeight: "1.5",
              borderRadius: "10px",
            }}
          >
            Name : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <span style={{ color: "#BC4873" }}> {currentUser.name}</span> <br />
            Email : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <span style={{ color: "#BC4873" }}> {currentUser.email}</span>{" "}
            <br />
            About : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <span style={{ color: "#BC4873" }}> {currentUser.about}</span>{" "}
            <br />
            Address : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <span style={{ color: "#BC4873" }}>
              {" "}
              {currentUser.address}
            </span>{" "}
            <br />
          </Content>
        ) : (
          <Content>
            Seekr is a educational video streaming platform in India that allows
            users to ask{" "}
            <span style={{ color: "#BC4873" }}>
              {" "}
              natural language questions about the content of a video
            </span>{" "}
            <Typewriter text="and receive accurate, relevant results." />
            <br />
            <a
              style={{
                color: "blueviolet",
                fontSize: "15px",
                cursor: "pointer",
                textDecoration: "none",
              }}
              href="https://github.com/Deepesh76780"
            >
              Explore ➚
            </a>
          </Content>
        )}
      </Wrapper>
      <MyComponent />
      <div id="mission"></div>
    </Container>
  );
};

export default HeadContent;
