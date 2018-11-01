import React from "react";
import PropTypes from "prop-types";
import Sidebar from "./components/Sidebar";
import Container from "./components/Container";
import "./style.scss";

const App = props => {
  return (
    <div>
      <Sidebar />
      <Container />
    </div>
  );
};

App.propTypes = {};

export default App;
