import Typewriter from "react-ts-typewriter";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  color: white;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  font-size: 78px;
  color: #88a1be;
  letter-spacing: 8px;
  font-family: "Fruktur", cursive;
`;

const Image = styled.div`
  width: 600px;
  height: 600px;
  margin: auto;
  margin-top: 100px;
  padding: 20px;
  gap: 20px;
`;
const Preloader = () => {
  return (
    <Container>
      <Image>
        <img
          src={require("./assets/Preloader.gif")}
          alt="nothing"
          height={650}
        />
      </Image>
      <Title>
        <Typewriter text="Seeking . . ." />
      </Title>
    </Container>
  );
};

export default Preloader;
