import React from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { reloadHistory } from "../redux/videoSlice";

const Container = styled.div`
  margin: auto;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Button = styled.button`
  padding: 5px 15px;
  width: 150px;
  height: 55px;
  margin: auto;
  background-color: #f5f5f5;
  border: 1px solid grey;
  color: rgba(35, 46, 84, 0.8);
  font-family: "Abril Fatface", cursive;
  border-radius: 20px;
  font-size: 17px;
  line-height: 24px;
  font-weight: 550;
  cursor: pointer;
  transition: all 350ms;
  &:hover {
    background-color: #f5f5f5;
    border-radius: 10px;
    transform: scale(1.08);
  }
`;

const Vtitle = styled.h1`
  color: #ffbd69;
  font-family: "Cinzel Decorative", cursive;
  font-family: "Rubik Pixels", cursive;
  letter-spacing: 4px;
  font-size: 26px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e1e1e;
  padding: 20px;
  margin: 100px;
  border-radius: 20px;
`;

const HistoryVideo = ({ click, clickyes }) => {
  const currentVideo = useSelector((state) => state.video.currentHistory);
  const dispatch = useDispatch();

  const handleClick = () => {
    click(!clickyes);
    dispatch(reloadHistory());
  };
  return (
    <Container>
      <Wrapper>
        <ReactPlayer
          url={currentVideo.link}
          width="1100px"
          height="600px"
          controls={true}
        />
        <Vtitle>
          Your Query &nbsp;&nbsp;: &nbsp; " &nbsp;
          <span style={{ fontFamily: "monospace", color: "white" }}>
            {currentVideo.query}
          </span>{" "}
          "
        </Vtitle>
        <Vtitle>
          <Vtitle>Timestamps &nbsp;:</Vtitle>
          {currentVideo.timeStamp && (
            <>
              <p>
                At{" "}
                <span style={{ color: "#ff6a6a" }}>
                  {currentVideo.timeStamp[0]}
                </span>{" "}
                sec
              </p>
              <p>
                At{" "}
                <span style={{ color: "#ff6a6a" }}>
                  {currentVideo.timeStamp[1]}
                </span>{" "}
                sec
              </p>
              <p>
                At{" "}
                <span style={{ color: "#ff6a6a" }}>
                  {currentVideo.timeStamp[2]}
                </span>{" "}
                sec
              </p>
            </>
          )}
        </Vtitle>
        <Button
          style={{
            textAlign: "center",
          }}
          onClick={handleClick}
        >
          Go Back
        </Button>
      </Wrapper>
    </Container>
  );
};

export default HistoryVideo;
