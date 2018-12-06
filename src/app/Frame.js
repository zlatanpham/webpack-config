import React from 'react';
import ReactDOM from 'react-dom';

class Frame extends React.Component {
  componentDidMount() {
    // this.iframeHead = this.node.contentDocument.head;
    // this.iframeRoot = this.node.contentDocument.body;
    // const style = document.createElement('style');
    // style.setAttribute('href', 'iframestyle.css');
    // style.rel = 'stylesheet';
    // this.iframeHead.appendChild(style);
    this.node.onload = () => {
      this.iframeHead = this.node.contentDocument.head;
      this.iframeRoot = this.node.contentDocument.body.querySelector(
        '#context',
      );
      this.forceUpdate();
    };
  }

  render() {
    const { children, head, ...rest } = this.props;
    return (
      <iframe {...rest} ref={node => (this.node = node)}>
        {this.iframeHead && ReactDOM.createPortal(head, this.iframeHead)}
        {this.iframeRoot && ReactDOM.createPortal(children, this.iframeRoot)}
      </iframe>
    );
  }
}

export default Frame;
