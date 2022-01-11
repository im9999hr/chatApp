import {Component} from "react";
import React from "react";

class Input extends Component {
  state = {
    text: ""
  }

  onChange = e => {
    this.setState({text: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSendMessage(this.state.text);
    this.setState({text: ""});
  }

  render() {
    return (
        <form className="formForMessage" onSubmit={this.onSubmit}>
          <input className="inputForMessage"
            onChange={this.onChange}
            value={this.state.text}
            type="text"
            placeholder="Unesi svoju poruku i pritisni ENTER"
            autoFocus={true}
          />
          <input className ="inputForSubmit" type="submit" value="POŠALJI"/>
        </form>
    );
  }
}

export default Input;
