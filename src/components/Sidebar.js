import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledSidebar = styled.div`
  background-color: grey;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  text: center;
`;

const Sidebar = props => {
  return <StyledSidebar>Hello world!</StyledSidebar>;
};

Sidebar.propTypes = {};

export default Sidebar;
