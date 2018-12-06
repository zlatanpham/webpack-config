import React from 'react';
import { createPortal } from 'react-dom';
import Frame from './Frame';
/** @jsx jsx */
import { jsx } from '@emotion/core';

class App extends React.Component {
  state = {
    value: 'hello',
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  render() {
    return (
      <>
        <input
          type="input"
          value={this.state.value}
          onChange={this.handleChange}
          css={{
            backgroundColor: 'red',
          }}
        />
        <Frame src="iframe.html">
          <h1
            css={{
              backgroundColor: 'green',
            }}
          >
            {this.state.value}
          </h1>
        </Frame>
      </>
    );
  }
}

export default App;
