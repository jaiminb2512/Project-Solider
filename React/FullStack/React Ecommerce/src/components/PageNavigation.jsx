import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PageNavigation = ({ title }) => {
  return (
    <Wrapper>
      <NavLink className="font" to="/">Home</NavLink>/
       <span className="font">
        {title}
    </span>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 3.2rem;
  padding-left: 1.2rem;

  a, span {
    font-size: 2.2rem;
  }

  
`;

export default PageNavigation;
