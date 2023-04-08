import React from "react";
import "./nav.css";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiFillBook } from "react-icons/ai";
import { AiOutlineContacts } from "react-icons/ai";
// import { FcServices } from "react-icons/fc";
import { Link } from "react-scroll";
// import { useState } from "react";

const Nav = () => {
  return (
    <nav>
      <Link to="#" spy={true} smooth={true} offset={50} duration={1000}>
        <AiOutlineHome />
      </Link>
      <Link to="mission" spy={true} smooth={true} offset={50} duration={1000}>
        <AiFillBook />
      </Link>
      <Link to="watch" spy={true} smooth={true} offset={50} duration={1000}>
        <AiOutlineContacts />
      </Link>
      <Link to="contact" spy={true} smooth={true} offset={50} duration={1000}>
        <AiOutlineUser />
      </Link>
    </nav>
  );
};

export default Nav;
