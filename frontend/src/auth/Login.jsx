import React from "react";
import styled from "styled-components";
import Logo from "../assets/TeamL.png";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailer, loginStart, loginSuccess } from "../redux/userSlice";

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
// const Label = styled.label`
//   color: #ffffff;
//   font-size: 18px;
// `;
// const Input = styled.input`
//   width: 250px;
//   background: #0000006b;
//   height: 31px;
//   border-radius: 10px;
//   color: white;
//   font-size: 20px;
//   outline: none;
// `;
// const Div = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 5px;
// `;

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

const Login = (props) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(undefined);

  const dispatch = useDispatch();
  const handleCancel = () => {
    props.setlogin(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", {
        username,
        password,
      });
      dispatch(loginSuccess(res.data));
      props.setlogin(false);
    } catch (err) {
      dispatch(loginFailer(err));
      console.log(err.response.data.message);
      seterror(err);
    }
  };

  const backDrop = (event) => {
    if (event.target === event.currentTarget) {
      props.setlogin(false);
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
              label="UserEmail"
              variant="outlined"
              color="secondary"
              onChange={(e) => setusername(e.target.value)}
              required
              sx={{
                input: {
                  color: "white",
                  fontSize: "15px",
                  borderColor: "white",
                },
              }}
            />
            <WhiteBorderTextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              color="secondary"
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              sx={{
                input: {
                  color: "white",
                  fontSize: "15px",
                  borderColor: "white",
                },
              }}
              required
            />
            <Link>
              <h1
                style={{
                  fontSize: "15px",
                  color: "#9f9fe3",
                  textDecoration: "none",
                }}
              >
                change password ?
              </h1>
            </Link>
            {error && (
              <h3 style={{ color: "red" }}>{error.response.data.message}</h3>
            )}
          </Form>
        </div>
        <div style={{ position: "relative", left: "60%" }}>
          <Button variant="contained" component="label" onClick={handleCancel}>
            Cancel
          </Button>
          &nbsp; &nbsp; &nbsp;
          <Button variant="contained" component="label" onClick={handleLogin}>
            Login
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </div>
      </Wrapper>
    </Container>
  );
};

export default Login;
