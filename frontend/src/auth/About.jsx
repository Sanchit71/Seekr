import React from "react";
import styled from "styled-components";
import Logo from "../assets/TeamL.png";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WhiteBorderTextField = styled(TextField)`
  & .css-1v4qvbo-MuiFormLabel-root-MuiInputLabel-root {
    color: #a3a2a2;
  }
  & .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
    border-color: #16615c;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  background: rgba(30, 79, 255, 0.202);
`;
const Wrapper = styled.div`
  width: 700px;
  margin: auto;
  background: #162447;
  box-shadow: 10px 10px 42px rgba(30, 80, 255, 0.5);
  border-radius: 8px;
  position: fixed;
  padding: 20px;
  top: 200px;
  left: 20px;
  right: 0;
  border-radius: 16px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 30px auto;
  gap: 10px;
`;

const Title = styled.h1`
  text-align: center;
  text-transform: uppercase;
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
`;

const About = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [address, setAddress] = useState();
  const [about, setAbout] = useState();
  const [phone, setPhone] = useState();
  const handleCancel = () => {
    navigate("/");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/users/${id}`,
        {
          address,
          about,
          phone,
        },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Title>About</Title>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ margin: "60px" }}>
            <img
              src={Logo}
              alt="logo hai"
              style={{
                height: "150px",
              }}
            />
          </div>
          <Form>
            <WhiteBorderTextField
              id="outlined-basic"
              label="Local Address"
              variprimaryant="outlined"
              color="secondary"
              onChange={(e) => setAddress(e.target.value)}
              sx={{
                input: {
                  color: "white",
                  fontSize: "18px",
                  borderColor: "white",
                  backgroundColor: "#162447",
                },
              }}
            />
            <WhiteBorderTextField
              id="outlined-basic"
              label="About you"
              variprimaryant="outlined"
              color="secondary"
              onChange={(e) => setAbout(e.target.value)}
              sx={{
                input: {
                  color: "white",
                  fontSize: "18px",
                  borderColor: "white",
                  backgroundColor: "#162447",
                },
              }}
            />
            <WhiteBorderTextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              color="secondary"
              onChange={(e) => setPhone(e.target.value)}
              sx={{
                input: {
                  color: "white",
                  fontSize: "18px",
                  borderColor: "white",
                  backgroundColor: "#162447",
                },
              }}
            />
          </Form>
        </div>
        <div style={{ position: "relative", left: "55%" }}>
          <Button variant="contained" component="label" onClick={handleCancel}>
            Cancel
          </Button>
          &nbsp; &nbsp; &nbsp;
          <Button variant="contained" component="label" onClick={handleSave}>
            Save
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </div>
      </Wrapper>
    </Container>
  );
};
export default About;
