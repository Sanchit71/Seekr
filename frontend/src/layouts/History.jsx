import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Card from "react-animated-3d-card";
import HistoryVideo from "./HistoryVideo";
import { historyVideo } from "../redux/videoSlice";
import { reloadHistory } from "../redux/videoSlice";

const Container = styled.div`
  margin: auto;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 100px;
`;

const Data = [{}, {}, {}, {}, {}, {}, {}, {}];

const Title = styled.h1`
  text-align: center;
  font-size: 100px;
  letter-spacing: 4px;
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
  font-family: "Holtwood One SC", serif;
  text-fill-color: transparent;
`;

const Wrapper = styled.div`
  height: fit-content;
  width: 600px;
  border-radius: 10px;
  padding: 20px;
  background: #272d37;
  display: flex;
  flex-direction: column;
`;

const Vtitle = styled.h1`
  color: #ffbd69;
  font-family: "Cinzel Decorative", cursive;
  font-family: "Rubik Pixels", cursive;
  letter-spacing: 4px;
  line-height: 1;
  font-size: 20px;
  font-family: ;
`;

const History = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);
  const [clicked, setClicked] = useState(false);
  const [history, setHistory] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const res = axios
      .get(`/users/history/${currentUser._id}`)
      .then((result) => {
        setLoading(false);
        setHistory(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleVideo = (data) => {
    dispatch(reloadHistory());
    dispatch(historyVideo(data));
    setClicked(true);
  };

  return (
    <>
      <Title>History</Title>
      {clicked ? (
        <HistoryVideo click={setClicked} clickyes={clicked} />
      ) : (
        <Container>
          {loading ? (
            <>
              {Data.map(() => (
                <Wrapper>
                  <Skeleton
                    sx={{ bgcolor: "grey.900", borderRadius: "10px" }}
                    variant="rectangular"
                    width="100%"
                    height="400px"
                  />
                </Wrapper>
              ))}
            </>
          ) : (
            <>
              {history.map((item, index) => (
                <Card
                  onClick={() => {
                    handleVideo(item);
                  }}
                >
                  <Wrapper key={index}>
                    <ReactPlayer
                      url={item.link}
                      width="600px"
                      height="380px"
                      controls={true}
                    />
                    <Vtitle>
                      <Vtitle>
                        Your Query &nbsp;&nbsp;: &nbsp; " &nbsp;
                        <span
                          style={{ fontFamily: "monospace", color: "white" }}
                        >
                          {item.query}
                        </span>{" "}
                        "
                      </Vtitle>
                    </Vtitle>
                  </Wrapper>
                </Card>
              ))}
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default History;
