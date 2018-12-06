import React from 'react';
import ReactDOM from 'react-dom';

const target = document.querySelector('#root');
console.log(document.documentElement.querySelector('#root'));
ReactDOM.render(<div>Hello</div>, target);
