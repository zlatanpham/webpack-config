import React, { Component } from 'react'
import './style.scss'
import Me from '@/components/Me'

class Hello extends Component {
  render() {
    return (
      <div className="hello">
        <Me />
      </div>
    )
  }
}

export default Hello
