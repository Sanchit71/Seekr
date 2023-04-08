import React from "react";
import styled from "styled-components";
import { TransverseLoading } from "react-loadingg";

const Image = styled.img`
  height: 430px;
`;

const Box = styled.div`
  width: fit-content;
  margin: 100px auto;
`;

const Error = () => {
  return (
    <Box>
      <Image src={require("../assets/Error.png")} alt="nothing" />
      <TransverseLoading />
    </Box>
  );
};

export default Error;
