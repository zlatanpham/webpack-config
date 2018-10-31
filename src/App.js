import React from "react";
import PropTypes from "prop-types";
import Sidebar from "./components/Sidebar";
import "./style.scss";

const App = props => {
  return (
    <div>
      <Sidebar />
    </div>
  );
};

App.propTypes = {};

export default App;
