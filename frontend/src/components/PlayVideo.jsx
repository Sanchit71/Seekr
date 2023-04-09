import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { reloadVideo } from "../redux/videoSlice";

const Container = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 5px 15px;
  width: 150px;
  height: 60px;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    126.21deg,
    #6a35ee 0%,
    #9930ef 14.24%,
    #5737ee 49.56%,
    #795ceb 93.2%
  );
  color: #ffff;
  font-family: "Abril Fatface", cursive;
  border-radius: 20px;
  font-size: 28px;
  line-height: 24px;
  font-weight: 550;
  cursor: pointer;
  transition: all 350ms ease-in-out;
  &:hover {
    background-color: #f5f5f5;
    border-radius: 10px;
    transform: scale(1.08);
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 100px;
  font-size: 60px;
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
  text-fill-color: transparent;
  letter-spacing: 4px;
  font-family: "Holtwood One SC", serif;
`;

const Wrapper = styled.div`
  width: 70%;
  background: #272d37;
  border-radius: 10px;
  color: ${({ theme }) => theme.text};
  position: relative;
  margin: 50px auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Dis = styled.div`
  margin: 10px;
  filter: drop-shadow(0px 4px 4px rgba(81, 142, 255, 0.25))
    drop-shadow(0px 4px 4px rgba(204, 0, 255, 0.25));
  padding: 10px;
`;

const PlayVideo = () => {
  const dispatch = useDispatch();
  const currentVideo = useSelector((state) => state.video.currentVideo);
  const [isReady, setIsReady] = React.useState(false);
  const [isReady1, setIsReady1] = React.useState(false);
  const [isReady2, setIsReady2] = React.useState(false);
  const playerRef1 = React.useRef();
  const playerRef2 = React.useRef();
  const playerRef3 = React.useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const handlereload = (e) => {
    e.preventDefault();
    dispatch(reloadVideo());
  };

  const onReady = React.useCallback(() => {
    if (!isReady) {
      const timeToStart = currentVideo.data[0];
      playerRef1.current.seekTo(timeToStart, "seconds");
      setIsReady(true);
    }
  }, [isReady]);
  const onReady1 = React.useCallback(() => {
    if (!isReady1) {
      const timeToStart = currentVideo.data[1];
      playerRef2.current.seekTo(timeToStart, "seconds");
      setIsReady1(true);
    }
  }, [isReady]);
  const onReady2 = React.useCallback(() => {
    if (!isReady2) {
      const timeToStart = currentVideo.data[2];
      setIsReady2(true);
      playerRef3.current.seekTo(timeToStart, "seconds");
    }
  }, [isReady]);

  return (
    <Container>
      <Title>TimeStamped Video</Title>
      <Wrapper>
        <Dis>
          <h1>
            At{" "}
            <span style={{ color: "#e04545" }}> {currentVideo.data[0]} </span>
            sec :
          </h1>
          <ReactPlayer
            ref={playerRef1}
            url={currentVideo.link}
            width="100%"
            height="600px"
            controls={true}
            onReady={onReady}
          />
        </Dis>

        <Dis>
          <h1>
            At{" "}
            <span style={{ color: "#e04545" }}> {currentVideo.data[1]} </span>
            sec :
          </h1>
          <ReactPlayer
            ref={playerRef2}
            url={currentVideo.link}
            width="100%"
            height="600px"
            controls={true}
            onReady={onReady1}
          />
        </Dis>
        <Dis>
          <h1>
            At{" "}
            <span style={{ color: "#e04545" }}> {currentVideo.data[2]} </span>
            sec :
          </h1>
          <ReactPlayer
            ref={playerRef3}
            url={currentVideo.link}
            width="100%"
            height="600px"
            controls={true}
            onReady={onReady2}
          />
        </Dis>
      </Wrapper>
      <Button onClick={handlereload}>Again</Button>
    </Container>
  );
};

export default PlayVideo;
