import React from "react";
import styled from "styled-components";
import Logo from "../assets/TeamL.png";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const WhiteBorderTextField = styled(TextField)`
  & .css-1v4qvbo-MuiFormLabel-root-MuiInputLabel-root {
    color: #a3a2a2;
  }
  & .sc-dSSHEZ .kMTXoW {
    background: #3b8359;
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
  left: 50px;
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

const Signup = (props) => {
  const [name, setName] = useState();
  const [confirm, setConfirm] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const handleCancel = () => {
    props.setsign(false);
  };

  const backDrop = (event) => {
    if (event.target === event.currentTarget) {
      props.setsign(false);
    }
  };

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password === confirm) {
      try {
        const res = await axios.post(
          "/auth/signup",
          {
            name,
            email,
            password,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(res);
        navigate(`/about/${res.data._id}`);
      } catch (err) {
        console.log(err);
      }
      props.setsign(false);
    } else {
      alert("Password and Confirm Password should be same");
    }
  };

  return (
    <Container onClick={backDrop}>
      <Wrapper>
        <Title>Login</Title>
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
              label="User Name"
              variant="outlined"
              color="secondary"
              onChange={(e) => setName(e.target.value)}
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
              label="User Email"
              variant="outlined"
              color="secondary"
              required
              onChange={(e) => setEmail(e.target.value)}
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
              label="Password"
              variant="outlined"
              color="secondary"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
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
              label="Confirm Password"
              variant="outlined"
              color="secondary"
              type="password"
              onChange={(e) => setConfirm(e.target.value)}
              required
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
        <div style={{ position: "relative", left: "60%" }}>
          <Button variant="contained" component="label" onClick={handleCancel}>
            Cancel
          </Button>
          &nbsp; &nbsp; &nbsp;
          <Button variant="contained" component="label" onClick={handleSignup}>
            Signup
          </Button>
        </div>
      </Wrapper>
    </Container>
  );
};

export default Signup;
