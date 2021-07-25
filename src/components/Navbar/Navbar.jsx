import React from "react";
import styled from "styled-components";
import Burger from "./Burger";

const Nav = styled.nav`
  width: 100%;
  height: 80px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(63, 80, 181);
  color: white;
  border-radius: 10px;

  .logo {
    padding: 25px;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <div className="logo">POKEMON API PROJECT BY AMAN RAJ</div>
      <Burger />
    </Nav>
  );
};

export default Navbar;
