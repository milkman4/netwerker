import React, { Component } from 'react';

export default class DeleteImageButton extends Component {
  constructor() {
    super();
    this.state = {

    };
  } //end of constructor

  render() {
    return(
      <button onClick={this.props.handleClick}>Delete Image</button>
    );
  }

} //end of DeleteImageButton