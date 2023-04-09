import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { Chip } from "@mui/material";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  connectStorageEmulator,
} from "firebase/storage";
import app from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStart, fetchSuccess, fetchFailure } from "../redux/videoSlice";
import { Switch } from "@mui/material";
import { videoWords } from "../redux/videoSlice";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography } from "@mui/material";
import { BoxLoading } from "react-loadingg";

const Container = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  transition: all 350ms;
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
  letter-spacing: 4px;
  font-family: "Holtwood One SC", serif;
  text-fill-color: transparent;
  letter-spacing: 5px;
`;

const Lding = styled.h1`
  color: #ffff;
  font-size: 20px;
  font-weight: 500;
  font-family: "Press Start 2P", cursive;
`;

const Wrapper = styled.div`
  height: fit-content;
  margin-top: 40px;
  background: #272d37;
  border-radius: 10px;
  position: relative;
  padding: 20px;
  margin-right: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1.7;
  position: relative;
`;

const Image = styled.div`
  width: 600px;
  height: 600px;
  flex: 1.5;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Input = styled.input`
  border: 1px solid grey;
  color: white;
  border-radius: 3px;
  padding: 10px;
  background-image: linear-gradient(
    268.64deg,
    rgba(240, 240, 240, 0.25) 0%,
    rgba(106, 112, 112, 0.25) 50.52%,
    rgba(193, 205, 218, 0.25) 100%
  );
`;
const Desc = styled.textarea`
  border: 1px solid grey;
  color: Black;
  height: 30px;
  border-radius: 3px;
  font-size: 20px;
  padding: 10px;
  background-image: linear-gradient(
    268.64deg,
    rgba(127, 231, 134, 0.25) 0%,
    rgba(106, 199, 199, 0.25) 50.52%,
    rgba(88, 167, 254, 0.25) 100%
  );
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

const Or = styled.h1`
  text-align: center;
`;

const Label = styled.label`
  font-size: 30px;
  margin-bottom: 30px;
  font-family: "Holtwood One SC", serif;
`;

const UploadA = () => {
  const [video, setVideo] = useState(undefined);
  const [videoPer, setVideoPer] = useState(0);
  const [file, setFile] = useState("");
  const [imgPer, setImgPer] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [inputs, setInputs] = useState({});
  const [words, setWords] = useState(null);
  const [des, setDes] = useState("");
  const [link, setLink] = useState("");
  const [iurl, setImage] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState();
  const [loading, setLoading] = useState(false);
  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };
  const currentUser = useSelector((state) => state.user.currentUser);
  // const currentVideo = useSelector((state) => state.user.currentUser);
  const uploadFile = (file, urlType) => {
    dispatch(fetchStart());
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "VideoImg"
          ? setImgPer(Math.round(progress))
          : setVideoPer(Math.round(progress));

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("something wnet wrong");
        }
      },
      (error) => {
        dispatch(fetchFailure(error));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            setImage(downloadURL);
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  const handleGetWordVideo = async (e) => {
    e.preventDefault();
    if (!video) {
      alert("Please upload a video");
      return;
    }
    setLoading(true);
    const res = await axios.post(
      "http://127.0.0.1:5000/audio",
      {
        link: iurl,
        type: "static",
      },
      { headers: { "Content-Type": "application/json" } }
    );
    setWords(res.data.hot_words);
    setFile(res.data.file);
    setLoading(false);
    setClicked(true);
  };

  const handleGetWordLink = async (e) => {
    e.preventDefault();
    if (!link) {
      alert("Please upload a link");
      return;
    }
    setLoading(true);
    const res = await axios.post(
      "http://127.0.0.1:5000/audio",
      {
        link: link,
        type: "yt",
      },
      { headers: { "Content-Type": "application/json" } }
    );
    setWords(res.data.hot_words);
    setFile(res.data.file);
    setLoading(false);
    setClicked(true);
  };

  //   word link...................................

  const handleUploadVideo = async (e) => {
    if (!video) {
      alert("Please upload a video");
      return;
    }
    if (!des) {
      alert("Please Write description");
      return;
    }
    setLoading(true);
    e.preventDefault();
    const res = await axios.post(
      "http://127.0.0.1:5000/audio_time",
      {
        query: des,
        file: file,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(des);
    const data = res.data.timestamps;
    setLoading(false);
    ////
    const his = await axios.put(`/users/history/${currentUser._id}`, {
      link: iurl,
      timeStamp: data,
      query: des,
    });
    ////
    dispatch(fetchSuccess({ link: iurl, data }));
  };

  const handleUploadLink = async (e) => {
    if (!link) {
      alert("Please upload a link");
      return;
    }
    if (!des) {
      alert("Please Write description");
      return;
    }
    setLoading(true);
    e.preventDefault();
    const res = await axios.post(
      "http://127.0.0.1:5000/audio_time",
      {
        query: des,
        file: file,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(res);
    const data = res.data.timestamps;
    setLoading(false);
    //
    await axios.put(`/users/history/${currentUser._id}`, {
      link: link,
      timeStamp: data,
      query: des,
    });
    //
    console.log(link, data);
    dispatch(fetchSuccess({ link, data }));
  };

  function LinearProgressWithLabel() {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" value={videoPer} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="white">{`${Math.round(
            videoPer
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Title>Upload Video Here</Title>
      <Container>
        {!loading ? (
          <>
            <Image>
              <img src={require("../assets/Upload.png")} alt="nothing" />
            </Image>
            <Wrapper>
              <Close>
                <Switch
                  checked={checked}
                  onChange={handleChangeSwitch}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Close>
              {checked ? (
                <>
                  <Label>Video File :</Label>
                  {videoPer > 0 ? (
                    <LinearProgressWithLabel />
                  ) : (
                    <>
                      {!clicked && (
                        <Input
                          type="file"
                          onChange={(e) => setVideo(e.target.files[0])}
                        />
                      )}
                    </>
                  )}
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                  >
                    {words &&
                      words.map((word, index) => {
                        return (
                          <span key={index} style={{ color: "white" }}>
                            <Chip label={word[1]} color="warning" />
                          </span>
                        );
                      })}
                  </div>
                  {clicked && (
                    <Desc
                      placeholder="Description"
                      row={8}
                      name="desc"
                      onChange={(e) => setDes(e.target.value)}
                    />
                  )}
                  {!clicked ? (
                    <>
                      <Button onClick={handleGetWordVideo}>Get words</Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={handleUploadVideo}>Upload Video</Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Label>Video Link :</Label>
                  {!clicked && (
                    <Desc
                      placeholder="Link of video"
                      row={8}
                      name="link"
                      onChange={(e) => setLink(e.target.value)}
                    />
                  )}
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                  >
                    {words &&
                      words.map((word, index) => {
                        return (
                          <span key={index} style={{ color: "white" }}>
                            <Chip label={word[1]} color="warning" />
                          </span>
                        );
                      })}
                  </div>
                  {clicked && (
                    <Desc
                      placeholder="Description"
                      row={8}
                      name="desc"
                      onChange={(e) => setDes(e.target.value)}
                    />
                  )}

                  {!clicked ? (
                    <>
                      <Button onClick={handleGetWordLink}>Get Words</Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={handleUploadLink}>Upload Video</Button>
                    </>
                  )}
                </>
              )}
            </Wrapper>
          </>
        ) : (
          <>
            <Image>
              <img src={require("../assets/Waiting.png")} alt="nothing" />
            </Image>
            <Wrapper>
              <BoxLoading />
              <Lding>We Are Working . . .</Lding>
            </Wrapper>
          </>
        )}
      </Container>
    </>
  );
};

export default UploadA;
