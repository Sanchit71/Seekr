import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Logo from "../assets/TeamL.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { hover } from "../redux/userSlice";

const Wrapper = styled.div`
  width: 100%;
  height: 6px;
`;

const Main = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 100px;
  align-items: center;
  color: white;
  font-size: 20px;
`;

const Items = styled.li`
  cursor: pointer;
`;

const Avatar = styled.div`
  cursor: pointer;
  border: 1px solid #1e50ff;
  padding: 10px;
  border-radius: 10px;
  &:hover {
    background: #152d8369;
  }
`;

const Hover = styled.span`
  &:hover {
    &:hover {
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
    }
  }
`;

const Navbar = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [isHover, setIsHover] = useState(false);
  const Navigate = useNavigate();
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const handleMouseE = () => {
    dispatch(hover(true));
  };
  const handleMouseL = () => {
    dispatch(hover(false));
  };

  const handleSignup = () => {
    props.setsign(true);
  };

  const handleLoginup = () => {
    props.setlogin(true);
  };
  const handleLogout = () => {
    dispatch(logout());
    Navigate("/");
  };

  return (
    <Wrapper>
      <Main>
        <img style={{ flex: 0.2 }} alt="logo hai" src={Logo} height={70} />
        <Items style={{ flex: 1, marginLeft: "8px" }}>
          <Link
            to="/"
            style={{ color: "white", textDecoration: "none" }}
            id="#"
          >
            <Hover>Seekr</Hover>
          </Link>
        </Items>
        <Items style={{ flex: currentUser ? 1 : 4 }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <Hover>Home</Hover>
          </Link>
        </Items>
        {currentUser && (
          <Items style={{ flex: 4 }}>
            <Link
              to="/history"
              style={{ color: "white", textDecoration: "none" }}
            >
              <Hover>History</Hover>
            </Link>
          </Items>
        )}
        {!currentUser ? (
          <>
            <Items style={{ flex: 1 }}>
              <Hover onClick={handleLoginup}>Login</Hover>
            </Items>
            <Items
              style={{
                border: "1px solid #1E50FF",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: isHover && "#091e67",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleSignup}
            >
              Signup
            </Items>
          </>
        ) : (
          <>
            <Items style={{ flex: 1 }}>
              <Hover onClick={handleLogout}>Logout</Hover>
            </Items>
            <Avatar onMouseEnter={handleMouseE} onMouseLeave={handleMouseL}>
              H! &nbsp;
              {currentUser.name}
            </Avatar>
          </>
        )}
      </Main>
    </Wrapper>
  );
};

export default Navbar;
