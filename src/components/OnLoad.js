import React, { Component } from 'react';
import { CgSearchLoading } from 'react-icons/cg';

export default class OnLoad extends Component {
  render() {
    return (
      <div>
        <CgSearchLoading className="loading" />
      </div>
    );
  }
}
