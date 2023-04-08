import React from "react";
import "./nav.css";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiFillBook } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";
import { GiShardSword } from "react-icons/gi";
import { Link } from "react-scroll";
import { useSelector } from "react-redux";

const Nav = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav>
      <Link to="#" spy={true} smooth={true} offset={50} duration={1000}>
        <AiOutlineHome />
      </Link>
      <Link to="mission" spy={true} smooth={true} offset={50} duration={1000}>
        <AiFillBook />
      </Link>
      {currentUser && (
        <Link to="action" spy={true} smooth={true} offset={50} duration={1000}>
          <GiShardSword />
        </Link>
      )}
      <Link to="watch" spy={true} smooth={true} offset={50} duration={1000}>
        <AiOutlineYoutube />
      </Link>
      <Link to="contact" spy={true} smooth={true} offset={50} duration={1000}>
        <AiOutlineUser />
      </Link>
    </nav>
  );
};

export default Nav;
