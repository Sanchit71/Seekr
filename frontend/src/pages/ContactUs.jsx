import React from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin-top: 270px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 100px;
  margin: 100px 100px;
  align-items: center;
  justify-content: center;
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
  gap: 10px;
`;

const Card = styled.div`
  background: #272d3784;
  height: 710px;
  padding: 20px;
  border-radius: 10px;
`;
const Content = styled.div`
  color: #adb9c7;
  padding: 20px;
  display: flex;
  gap: 100px;
  flex: 1.5;
  width: 97%;
  font-family: Luminari;
  font-size: 30px;
`;

const Form = styled.form`
  display: flex;
  box-shadow: 10px 6px 20px 0 rgba(86, 109, 98, 0.477);
  flex-direction: column;
  width: 60%;
  margin: 15px;
  gap: 15px;
  background-color: #0b303889;
  padding: 20px;
  border-radius: 10px;
`;

const Button = styled.button`
  padding: 5px 15px;
  width: 150px;
  height: 55px;
  margin: 10px auto;
  background-color: #3cffb7bc;
  border: 1px solid black;
  color: #000000;
  font-family: "Abril Fatface", cursive;
  letter-spacing: 2px;
  border-radius: 20px;
  font-size: 20px;
  line-height: 24px;
  font-weight: 550;
  cursor: pointer;
  transition: all 350ms;
  &:hover {
    background-color: #cfcfcf;
    border-radius: 10px;
    transform: scale(1.08);
    color: black;
  }
`;

const WhiteBorderTextField = styled(TextField)`
  & .css-1v4qvbo-MuiFormLabel-root-MuiInputLabel-root {
    color: #1faac9;
  }
  & .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
    border-color: #228a83;
  }
`;

const Email = styled.div`
  width: 40%;
  margin: 20px;
`;

const ContactUs = () => {
  return (
    <>
      <Container>
        <Title id="contact">Lets concatenate!</Title>
        <Wrapper>
          <Image>
            <img
              src={require("../assets/HandShake.png")}
              alt="nothing"
              height={500}
            />
          </Image>
          <Card>
            <Content>
              <Form>
                <h1>
                  Send us a <span style={{ color: "#b55b7c" }}>Message!</span>
                </h1>
                <WhiteBorderTextField
                  id="outlined-basic"
                  label="Your Name"
                  variprimaryant="outlined"
                  color="secondary"
                  sx={{
                    input: {
                      color: "white",
                      fontSize: "18px",
                      borderColor: "white",
                      backgroundColor: "#11182a",
                    },
                  }}
                />
                <WhiteBorderTextField
                  id="outlined-basic"
                  label="Contact Email"
                  variprimaryant="outlined"
                  color="secondary"
                  sx={{
                    input: {
                      color: "white",
                      fontSize: "18px",
                      borderColor: "white",
                      backgroundColor: "#11182a",
                    },
                  }}
                />
                <WhiteBorderTextField
                  id="outlined-basic"
                  label="Your Message"
                  variant="outlined"
                  color="secondary"
                  width="100%"
                  rows={10}
                  columns={10}
                  sx={{
                    input: {
                      color: "white",
                      fontSize: "18px",
                      borderColor: "white",
                      backgroundColor: "#11182a",
                      height: "100px",
                    },
                    ":focus": {
                      borderColor: "white",
                    },
                  }}
                />
                <Button>Send</Button>
              </Form>
              <Email>
                <h3
                  style={{
                    color: "#47ffa99f",
                  }}
                >
                  Email :
                </h3>
                <h4
                  style={{
                    lineHeight: "1.5",
                    fontFamily: ' "Alkatra", cursive',
                  }}
                >
                  BhagwanBharose@gmail.com
                </h4>
                <h3
                  style={{
                    color: "#46ffa9a5",
                  }}
                >
                  Phone No :
                </h3>
                <h4
                  style={{
                    lineHeight: "1.5",
                    fontFamily: ' "Alkatra", cursive',
                  }}
                >
                  +91 62XXXXXXXX
                </h4>
                <h3
                  style={{
                    color: "#46ffa9b2",
                  }}
                >
                  Location :
                </h3>
                <h4
                  style={{
                    lineHeight: "1.5",
                    fontFamily: ' "Alkatra", cursive',
                  }}
                >
                  IIIT Naya Raipur
                  <br />
                  se Hain
                  <br />
                  Bs Ek Extra I Hai
                </h4>
              </Email>
            </Content>
          </Card>
        </Wrapper>
      </Container>
    </>
  );
};

export default ContactUs;
